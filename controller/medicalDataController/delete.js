/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const medicalDataCollection = common.db.medicalData;

/**
 * DELETE record
 * @param {Object} req 
 * @returns Object
 */
module.exports.delete = async (req) => {
    try {
        const query = {
            patientId: req.params.id,
            id: req.params.recordId
        }

        var recordExist = await common.query.findOne(medicalDataCollection, { where: query, attributes: { exclude: ['uploadedBy', 'deletedAt', 'patientId'] } })

        if (recordExist == null) {
            /**
             * INVALID ID
             */
            var successOrError = common.responseServices.successOrErrors("err_017");
            var responseObj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.recordId, successOrError.location);
            return common.responseModel.failResponse("Errors", {}, [responseObj])

        }
        await common.query.remove(medicalDataCollection, query);

        /**
        * SUCCESS RESPONSE
        */

        delete recordExist.dataValues.createdBy

        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successResponse(successOrError.patientDeleted, recordExist, []);

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