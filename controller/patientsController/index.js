const addPatient = require('./add');
const listPatient = require('./list');
const updatePatient = require('./update');
const deletePatient = require('./delete');
const getSingle = require('./getSingle')

module.exports = {
    addPatient,
    listPatient,
    updatePatient,
    deletePatient,
    getSingle
}