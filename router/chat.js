const express=require('express');
const { getchat,addChat,registerOffline,registerOnline,registerOfflineBysocketId } = require('../controller/chatController');
const router=express.Router();
const verify = require('../middleware/jwt')

router.post('/getChat',verify,getchat)
router.post('/addChat',addChat)
router.post('/registerOnline',registerOffline)
router.post('/registerOffline',registerOnline)
router.post('/registerOfflineBysocketId',registerOfflineBysocketId)







module.exports=router