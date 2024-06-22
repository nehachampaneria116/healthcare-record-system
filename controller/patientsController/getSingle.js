/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const patientsCollection = common.db.patients;

/**
 * LIST OF SKILLS 
 * @param {Object} req 
 * @returns Object
 */
module.exports.getSingle = async (req) => {
    try {

        var patient = await common.query.findOne(patientsCollection, {
            where: {
                id: req.params.id
            }
        });

        if (!patient) {
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_014");
            var responseObj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.parentId, successOrError.location);
            return common.responseModel.failResponse("Errors", {}, [responseObj])
        }

        delete patient.dataValues.createdBy

        /**
         * SUCCESS RESPONSE
         */
        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successResponse(successOrError.getOne, patient, []);

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