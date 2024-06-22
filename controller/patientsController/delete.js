/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const patientsCollection = common.db.patients;

/**
 * DELETE patients
 * @param {Object} req 
 * @returns Object
 */
module.exports.delete = async (req) => {
    try {

        const query = { id: req.params.id }

        var patientExist = await common.query.findOne(patientsCollection, { where: query })

        if (patientExist == null) {
            /**
             * INVALID ID
             */
            var successOrError = common.responseServices.successOrErrors("err_08");
            var responseObj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.patients, successOrError.location);
            return common.responseModel.failResponse("Errors", {}, [responseObj])

        }

        await common.query.remove(patientsCollection, query);

        /**
        * SUCCESS RESPONSE
        */

        delete patientExist.dataValues.createdBy

        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successResponse(successOrError.patientDeleted, patientExist, []);


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