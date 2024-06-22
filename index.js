/**
 * NPM PACKAGES
 */
const express = require('express')
var app = express();
var avenue = require('./routes/index')
var http = require("http").Server(app);
const path = require('path');
const logger = require('./logger')

/**
 * FILE READER PATH
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
/**
 * ROUTING PATH
 */
var users = avenue.users
var patients = avenue.patients

require('dotenv').config();
const PORT = process.env.port || 8000

/**
 * BODY PARSER
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', users);
app.use('/patients', patients)

/**
 * APPLICATION LISTEN
 */
http.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
})
