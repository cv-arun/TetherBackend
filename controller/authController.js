const authhelper=require('../helper/authhelper');
const jwt_decode=require('jwt-decode');
const generateToken=require('../middleware/signJwt')

module.exports = {
    signup: (req, res, next) => {
      
        authhelper.doSignup(req.body).then((response) => {
            !response.msg?res.json( response ):res.json({msg:'User already exist'})
            
        }).catch(err=>res.json(err))
    },
    login:(req,res,next)=>{
        authhelper.dologin(req.body).then((user) => {

            if (user.token) {
                res.json(user)
            } else {
                res.json({ msg: 'invalid credential' })
            }
    
        }).catch(err => res.json(err))
    },
    loginWithGoogle:(req,res,next)=>{
    
        const decoded = jwt_decode(req.body.credentialResponse.credential);
        let userDetails={
            fname:decoded.given_name,
            lname:decoded.family_name,
            email:decoded.email,
            picture:decoded.picture
        }
        authhelper.doSignup(userDetails).then((user)=>{
           
           let token= generateToken(user,'2h')
           res.json({token,user})
            
        }).catch(err=>res.json(err))
    },
    updateUser:(req,res,next)=>{
        authhelper.doUpdateUser(req.body).then(response=>{
            res.json({msg:'user data updated'})
        }).catch(err=>res.json(err))
    },
    is_logged_in:(req,res,next)=>{
     res.json({loggedIn:'loggedIn'})
    },
    updtePassword:(req,res)=>{
       
        authhelper.updatePassword(req.userId,req.body).then(data=>{
            res.json(data)
        }).catch(err=>res.json(err))
    }
}