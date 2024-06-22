/**
 *  NPM PACKAGES 
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const logger = require('../../logger');

/**
 *  HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const usersCollection = common.db.users;

/**
 * REGISTER USER FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.registration = async (req) => {
    try {
        var errorFlag = 0;
        var errorArray = []

        var emailExist = await common.query.findOne(usersCollection, { where: { email: req.body.email } });
        if (emailExist) {
            /**
            * email ALREADY EXIST
            */
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_011");
            var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.email, successOrError.location);
            errorArray.push(responseObject)
        }

        if (errorArray.length == 0 && errorFlag == 0) {

            req.body.password = bcrypt.hashSync(req.body.password, salt)

            var usersDetails = await common.query.create(usersCollection, req.body);

            if (usersDetails) {

                /**
                 * GENERATE JWT TOKEN
                 */
                const token = jwt.sign({
                    userId: usersDetails.id,
                    role: usersDetails.role
                }, process.env.secretKey)

                /**
                 * SUCCESS RESPONSE
                 */

                delete usersDetails.dataValues.password
                usersDetails.dataValues.token = token

                var successOrError = common.responseServices.successOrErrors("successMessage");
                return common.responseModel.successCreateResponse(successOrError.register, usersDetails, []);


            } else {

                /**
                 * SOMETHING WENT WRONG WHILE REGISTER DEVICE
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_03");
                var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.location);
                errorArray.push(responseObject)

            }
        } else {

            if (errorArray.length > 0 && errorFlag == 1) {

                return common.responseModel.failResponse("Errors", {}, errorArray)

            }

        }

    } catch (error) {
        logger.error({
            message: error.message,
            stack: error.stack
        });
        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var responseObject = common.responseModel.resObj(successOrError.code, error.message, successOrError.parameters.noParams, successOrError.location);
        var array = []
        array.push(responseObject)
        return common.responseModel.failResponse(successOrError.failMsg, {}, array)

    }
}