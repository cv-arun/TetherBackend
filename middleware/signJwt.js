const jwt=require('jsonwebtoken');

let signJwt=function(payload,expiry){
return jwt.sign(
    payload,
    process.env.TOKEN_KEY,
    {
        expiresIn:expiry,
    }
)
}

module.exports=signJwt