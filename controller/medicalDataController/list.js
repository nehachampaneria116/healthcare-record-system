/**
 * HELPERS
 */
var common = require('../common')
const fs = require('fs');
const path = require('path');

/**
 * DATABASE
 */
const patientsCollection = common.db.patients;
const medicalDataCollection = common.db.medicalData

/**
 * LIST OF PATIENTS 
 * @param {Object} req 
 * @returns Object
 */
module.exports.list = async (req) => {
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

        const where = {
            patientId: req.params.id
        }

        var query = req.query
        var records = await common.query.find(medicalDataCollection, {
            where: where
        });

        if (records.length == 0) {
            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successGetResponse(successOrError.noDataFound, [], [], {});
        }

        query.order != '' && typeof query.order != 'undefined' ? (query.order == 0 ? order = 'ASC' : order = 'DESC') : order = 'DESC'
        query.page != '' && typeof query.page != 'undefined' ? page = parseInt(query.page) : page = 1
        query.limit != '' && typeof query.limit != 'undefined' ? limit = parseInt(query.limit) : limit = 10

        var offset = (page - 1) * limit;
        var previousPage = page - 1;

        let totalPage = Math.ceil(records.length / limit);

        var nextPage;
        if (page < totalPage) {
            nextPage = 1;
        } else {
            nextPage = 0;
        }

        var prevPage;
        if (previousPage == 0) {
            prevPage = 0;
        } else {
            prevPage = 1;
        }
        var PaginationQuery = {
            limit: limit,
            order: [
                ['id', order]
            ],
            offset: offset,
            attributes: { exclude: ['uploadedBy', 'deletedAt', 'patientId'] }
        }
        var patientsWithPagination = await common.query.find(medicalDataCollection, PaginationQuery);

        var pagination = {
            "previousPage": prevPage,
            "currentPage": page,
            "nextPage": nextPage,
            "totalCount": records.length,
            "perPage": limit > patientsWithPagination.length ? patientsWithPagination.length : limit,
            "totalPage": totalPage
        }

        let updatedItems = patientsWithPagination.map(item => {
            return {
                ...item.dataValues,
                file: process.env.imageUrl + item.file

            };
        });

        /**
         * SUCCESS RESPONSE
         */

        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successGetResponse(successOrError.getall, updatedItems, [], pagination);


    } catch (error) {

        console.log(error);

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