var common = require('./common')

/**
 * DATABASE
 */
const usersCollection = common.db.users;


/**
 * TO GET DATA OF SINGLE USER BY ID
 * @param {Number} userId 
 * @param {String} token 
 * @returns 
 */
async function singleUserObjectRes(data, token) {


    var responseData = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        token: token,
    }

    return responseData;
}



module.exports = {
    singleUserObjectRes,
}