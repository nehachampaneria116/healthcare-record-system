/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const patientsCollection = common.db.patients;

/**
 * LIST OF PATIENTS 
 * @param {Object} req 
 * @returns Object
 */
module.exports.list = async (req) => {
    try {
        var query = req.query
        var patients = await common.query.find(patientsCollection, {
        });

        if (patients.length == 0) {
            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successGetResponse(successOrError.noDataFound, [], [], {});
        }

        query.order != '' && typeof query.order != 'undefined' ? (query.order == 0 ? order = 'ASC' : order = 'DESC') : order = 'DESC'
        query.page != '' && typeof query.page != 'undefined' ? page = parseInt(query.page) : page = 1
        query.limit != '' && typeof query.limit != 'undefined' ? limit = parseInt(query.limit) : limit = 10

        var offset = (page - 1) * limit;
        var previousPage = page - 1;

        let totalPage = Math.ceil(patients.length / limit);

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
            attributes: { exclude: ['createdBy'] }
        }
        var patientsWithPagination = await common.query.find(patientsCollection, PaginationQuery);

        var pagination = {
            "previousPage": prevPage,
            "currentPage": page,
            "nextPage": nextPage,
            "totalCount": patients.length,
            "perPage": limit > patientsWithPagination.length ? patientsWithPagination.length : limit,
            "totalPage": totalPage
        }

        /**
         * SUCCESS RESPONSE
         */
        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successGetResponse(successOrError.getall, patientsWithPagination, [], pagination);

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