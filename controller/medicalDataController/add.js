/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const medicalDataController = common.db.medicalData;

/**
 * ADD PATIENT
 * @param {Object} req 
 * @returns Object
 */
module.exports.add = async (req, res) => {
    try {
        const userId = await common.helpers.getUser(req.headers.authorization)

        await common.helpers.uploadFile(req, res, async function (err, file) {
            if (err) {
                var successOrError = common.responseServices.successOrErrors("err_016");
                var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.file, successOrError.location);
                return common.responseModel.failResponse("Errors", {}, [responseObject])
            }
            else {
                const createdData = await common.query.create(medicalDataController, {
                    patientId: req.params.id,
                    uploadedBy: userId,
                    file: file.filename
                });

                var successOrError = common.responseServices.successOrErrors("successMessage");
                return common.responseModel.successCreateResponse(successOrError.reportCreated, createdData, []);

            }
        })
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