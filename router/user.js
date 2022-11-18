const express = require('express')
const router = express.Router();

const verify = require('../middleware/jwt')
const auth=require('../controller/authController');
const userController=require('../controller/userController')

router.post('/signup',auth.signup);
router.post('/login',auth.login);
router.post('/loginGoogle',auth.loginWithGoogle);
router.post('/updateUser',auth.updateUser)
router.get('/is_logged_in',verify,auth.is_logged_in)
router.post('/updatePassword',verify,auth.updtePassword)


router.get('/getPeople',verify,userController.getPeople)
router.post('/requestFollow',verify,userController.requestFollow)
router.post('/requestUnFollow',verify,userController.requestUnFollow)
router.post('/removeFollow',verify,userController.removeFollow)
router.post('/getFollow',verify,userController.getFollow)
router.post('/updateProfile',verify,userController.changeProfile)
router.post('/updateProfileData',verify,userController.editProfile)
router.get('/refreshUSer',verify,userController.refreshUser)
router.get('/getNotification',verify,userController.getNotification)




module.exports = router