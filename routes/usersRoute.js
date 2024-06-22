const express = require('express')
const router = express()
const { body, validationResult } = require("express-validator");
const verifyTokenUser = require("../helpers/jwt").verifyTokenUser;

/**
 * IMPORT CONTROLLER 
 */
const {
    registerUser,
    loginUser,
    getUser,
} = require('../controller/usersController/index');
const { roleEnum } = require('../helpers/enums');

/**
 * REGISTER USER
 */
router.post('/register', [
    [
        body("name").notEmpty(),
        body("email").isEmail(),
        body("password").notEmpty().isStrongPassword(),
        body("role").notEmpty().isIn(Object.values(roleEnum)),
    ],
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            var ctrlResponse = await registerUser.registration(req);
            res.status(ctrlResponse.code).send(ctrlResponse);
        } catch (err) {
            res.send(err)
        }
    })


/**
 * LOGIN USER
 */
router.post('/login',
    [
        [
            body("email").isEmail(),
            body("password").notEmpty()
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            var ctrlResponse = await loginUser.login(req);
            res.send(ctrlResponse)

        } catch (err) {
            res.send(err)
        }
    })

/**
 * GET USER
 */
router.get('/profile',
    verifyTokenUser,
    async (req, res) => {
        try {
            var ctrlResponse = await getUser.get(req);
            res.send(ctrlResponse)

        } catch (err) {
            res.send(err)
        }
    })

module.exports = router