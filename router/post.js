const express=require('express')
const router=express.Router();
const verify = require('../middleware/jwt')
const postController=require('../controller/postController')


router.post('/create-post',verify,postController.uploadImages)
router.get('/getPost',verify,postController.getPost)
router.get('/getMyPost',verify,postController.getMyPost)
router.post('/hitLike',verify,postController.hitLike)
router.post('/sendCommnet',verify,postController.addCommnent)
router.post('/removeCommenent',verify,postController.removeCommenent)






module.exports=router