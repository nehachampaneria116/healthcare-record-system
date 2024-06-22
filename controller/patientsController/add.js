/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const patientsCollection = common.db.patients;

/**
 * ADD PATIENT
 * @param {Object} req 
 * @returns Object
 */
module.exports.add = async (req) => {
    try {

        const userId = await common.helpers.getUser(req.headers.authorization)

        req.body.createdBy = userId
        var createdData = await common.query.create(patientsCollection, req.body);

        /**
         * SUCCESS
         */
        delete createdData.dataValues.createdBy;
        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successCreateResponse(successOrError.patientAdded, createdData, []);


    } catch (error) {
        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var responseObj = common.responseModel.resObj(successOrError.code, error.message, successOrError.parameters.noParams, successOrError.location);
        var array = []
        array.push(responseObj)
        return common.responseModel.failResponse(successOrError.failMsg, {}, array)

    }
}