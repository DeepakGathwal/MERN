const express = require('express');
const { login, register, verifyUser, getUser, refreshToken, logOut } = require('../controller/login');

const router = express.Router();

router.route('/').post(register)
router.route('/login').post(login).get(verifyUser)
router.route('/user').get(verifyUser,getUser)
router.route('/refresh').get(refreshToken,verifyUser,getUser).post(verifyUser,logOut)


// Refresh Token



module.exports = router