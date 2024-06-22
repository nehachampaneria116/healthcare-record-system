/**
 * NPM PACKAGE
 */
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const usersCollection = common.db.users;

/**
 * GET USER FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.get = async (req) => {
    try {

        const userId = await common.helpers.getUser(req.headers.authorization)

        var usersDetails = await common.query.findOne(usersCollection, { where: { id: userId } });

        delete usersDetails.dataValues.password;

        /**
         * SUCCESS
         */
        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successResponse(successOrError.success, usersDetails, []);
    } catch (error) {
        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var responseObject = common.responseModel.resObj(successOrError.code, error.message, successOrError.parameters.noParams, successOrError.location);
        var array = []
        array.push(responseObject)
        return common.responseModel.failResponse(successOrError.failMsg, {}, array);

    }
}