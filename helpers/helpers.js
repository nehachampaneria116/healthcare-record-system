const jwtDecode = require("jwt-decode")
const moment = require('moment');
const multer = require('multer');
const path = require('path');

/**
 * GET USER
 * @param {*} bearerToken 
 */
async function getUser(bearerToken) {
    var token = bearerToken.replace(/Bearer /g, '');
    var decoded = jwtDecode(token);
    return decoded.userId;
}

/**
 * check valid date
 * @param {*} date 
 */
async function checkValidDate(date) {
    var validate = moment(date).format('YYYY-MM-DD')
    if (validate == 'Invalid date' || (moment(date).isBefore(moment().format('YYYY-MM-DD')))) {
        return false;
    }
    return true
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('file');

async function uploadFile(req, res, callback) {
    upload(req, res, function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, req.file);
    });
}

module.exports = {
    uploadFile,
    getUser,
    checkValidDate,
}