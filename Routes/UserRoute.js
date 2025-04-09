
const express = require('express');

const { createUser, loginUser, getAllUsers } = require('../Controllers/UserController');
const middleware = require('../Middleware/middleware');


const router = express.Router();


//REGISTER USER ROUTE
router.route('/create/user',middleware).post(createUser);

//LOGIN USER ROUTE
router.route('/login/user',middleware ).post(loginUser);

//GET ALL USERS
router.route('/get/allusers').get(getAllUsers);  


module.exports =  router;