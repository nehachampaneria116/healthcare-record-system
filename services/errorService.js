function successOrErrors(key) {

    /**
     *ERROR PARAMETER
     */
    var parameters = {
        "noParams": "",
        "page": "page",
        "username": "username",
        "password": "password",
        "title": "title",
        "description": "description",
        "dueDate": "dueDate",
        "patients": "patients",
        "isCompleted": "isCompleted",
        "reminderTime": "reminderTime",
        "login": "login",
        "email": "email",
        "parentId": "parentId",
        "file": "file",
        'recodeId': "recordId"
    }

    /**
     * SUCCESS MESSAGE
     */
    var successMessages = {
        "success": "Success",
        "login": "Login successful",
        "register": "Registration successful",
        "getall": "Get all successful",
        "getOne": "Get successful",
        "logout": "Logout successful",
        "patientAdded": "Patient has been added successfully",
        "patientUpdated": "Patient has been updated",
        "patientDeleted": "Patient has been deleted",
        "noDataFound": "No data found",
        "reportCreated": "Report Created"
    }

    /**
     * ERROR OBJECT
     */
    var obj = {
        "successMessage": successMessages,
        "ex_00": {
            code: "ex_00",
            failMsg: "Exception",
            message: "exception",
            parameters: parameters,
            location: "params"
        },
        "err_02": {
            code: "err_02",
            failMsg: "InvalidDetails",
            message: "Please enter required details",
            parameters: parameters,
            location: "body"
        },
        "err_03": {
            code: "err_03",
            failMsg: "NotRegister",
            message: "Something went wrong while registering device",
            parameters: parameters,
            location: "body"
        },
        "err_07": {
            code: "err_07",
            failMsg: "InvalidDetails",
            message: "Kindly enter valid date format, should be in YYYY-MM-DD format",
            parameters: parameters,
            location: "body"
        },
        "err_08": {
            code: "err_08",
            failMsg: "InvalidDetails",
            message: "Invalid patients id",
            parameters: parameters,
            location: "body"
        },
        "err_09": {
            code: "err_09",
            failMsg: "InvalidDetails",
            message: "Invalid data",
            parameters: parameters,
            location: "body"
        },
        "err_010": {
            code: "err_010",
            failMsg: "InvalidDetails",
            message: "Kindly enter valid date-time format, should be valid UTC format",
            parameters: parameters,
            location: "body"
        },
        "err_011": {
            code: "err_011",
            failMsg: "InvalidDetails",
            message: "Email already exits",
            parameters: parameters,
            location: "body"
        },
        "err_012": {
            code: "err_012",
            failMsg: "InvalidDetails",
            message: "Invalid login credentials",
            parameters: parameters,
            location: "body"
        },
        "err_013": {
            code: "err_013",
            failMsg: "InvalidDetails",
            message: "Invalid email.",
            parameters: parameters,
            location: "body"
        },
        "err_014": {
            code: "err_014",
            failMsg: "InvalidDetails",
            message: "Invalid patientId.",
            parameters: parameters,
            location: "body"
        },
        "err_016": {
            code: "err_016",
            failMsg: "InvalidDetails",
            message: "Error uploading file.",
            parameters: parameters,
            location: "body"
        },
        "err_017": {
            code: "err_017",
            failMsg: "InvalidDetails",
            message: "Record not found",
            parameters: parameters,
            location: "body"
        },


    }
    return obj[key]
}

module.exports = {
    successOrErrors,
}