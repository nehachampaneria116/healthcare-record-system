/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const medicalDataCollection = common.db.medicalData

/**
 * LIST OF MEDICAL DATA 
 * @param {Object} req 
 * @returns Object
 */
module.exports.getSingle = async (req) => {
    try {

        var medicalData = await common.query.findOne(medicalDataCollection, {
            where: {
                patientId: req.params.id,
                id: req.params.recordId
            },
            attributes: { exclude: ['uploadedBy', 'deletedAt', 'patientId'] }
        });

        if (!medicalData) {
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_017");
            var responseObj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.recordId, successOrError.location);
            return common.responseModel.failResponse("Errors", {}, [responseObj])
        }

        delete medicalData.dataValues.createdBy
        medicalData.dataValues.file = process.env.imageUrl + medicalData.dataValues.file

        /**
        * SUCCESS RESPONSE
        */
        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successResponse(successOrError.getOne, medicalData, []);

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