const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode")
const db = require("../schema/db");
const users = db.users;
const { Op } = require("sequelize");

/**
 * VERIFY USER AUTHENTICATION TOKEN FUNCTION
 */

const verifyTokenAdmin = async (req, res, next) => {
    req.body.role = ['admin']
    await verifyToken(req, res, next)
}

const verifyTokenAdminDoctor = async (req, res, next) => {
    req.body.role = ['admin', 'doctor']
    await verifyToken(req, res, next)
}

const verifyTokenDoctor = async (req, res, next) => {
    req.body.role = ['doctor']
    await verifyToken(req, res, next)
}

const verifyTokenUser = async (req, res, next) => {
    req.body.role = []
    await verifyToken(req, res, next)

};

const verifyToken = async (req, res, next) => {
    const bearerToken =
        req.headers["authorization"];
    if (!bearerToken) {
        return res.status(401).send("Unauthorized");
    }
    try {
        if (bearerToken.startsWith("Bearer")) {
            var token = bearerToken.replace(/Bearer /g, '');
            jwt.verify(token, process.env.secretKey, async function (err, decoded) {
                if (err) {
                    return res.status(401).send("Unauthorized");
                } else {
                    var decoded = jwtDecode(token);

                    var userExist = await users.findOne({
                        where:
                        {
                            id: decoded.userId,
                            role: {
                                [Op.or]: req.body.role
                            },
                        }
                    });
                    if (userExist == null) {
                        return res.status(401).send("Unauthorized");
                    } else {
                        return next();
                    }
                }
            });
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
}

module.exports = {
    verifyTokenAdmin,
    verifyTokenUser,
    verifyTokenDoctor,
    verifyTokenAdminDoctor
};