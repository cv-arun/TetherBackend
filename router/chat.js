const express=require('express');
const { getchat } = require('../controller/chatController');
const router=express.Router();
const verify = require('../middleware/jwt')

router.post('/getChat',verify,getchat)







module.exports=router