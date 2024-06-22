/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const patientsCollection = common.db.patients;
var Op = common.db.Sequelize.Op

/**
 * UPDATE SKILLS 
 * @param {Object} req 
 * @returns Object
 */
module.exports.update = async (req) => {
    try {

        var errorArray = [];
        var errorFlag = 0
        if (req.params.id != "" && typeof req.params.id != 'undefined') {

            /**
             * IF ID IS IS VALID THEN CALL THIS CONDITION 
             */

            var idQuery = {
                id: req.params.id
            }

            var patient = await common.query.findOne(patientsCollection, { where: idQuery })
            if (!patient) {
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_014");
                var responseObj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.parentId, successOrError.location);
                return common.responseModel.failResponse("Errors", {}, [responseObj])
            }

            var obj = {}


            if (req.body.firstName != '' && req.body.firstName != undefined) {
                obj.firstName = req.body.firstName
            }
            if (req.body.lastName != '' && req.body.lastName != undefined) {
                obj.lastName = req.body.lastName
            }
            if (req.body.dob != '' && req.body.dob != undefined) {
                obj.dob = req.body.dob
            }


            await common.query.update(patientsCollection, { id: req.params.id }, obj)
            var patient = await common.query.findOne(patientsCollection, { where: idQuery })

            delete patient.dataValues.createdBy

            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successResponse(successOrError.update, patient, []);
        }

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