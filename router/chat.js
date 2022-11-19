const express=require('express');
const { getchat,addChat,registerOffline,registerOnline } = require('../controller/chatController');
const router=express.Router();
const verify = require('../middleware/jwt')

router.post('/getChat',verify,getchat)
router.post('/addChat',addChat)
router.post('/registerOnline',registerOffline)
router.post('/registerOffline',registerOnline)







module.exports=router