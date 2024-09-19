const express = require('express');
const router = express.Router();

const userController=require('../controller/user');


router.post('/register',userController.Register);
router.post('/login',userController.logIn);

module.exports=router;
