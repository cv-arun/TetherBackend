const chatHelper=require('../helper/chatHelper')

module.exports = {
    getchat: (req, res, next) => {
        chatHelper.GetChatDetails(req.userId,req.body.friendId).then(data=>{
            res.json(data)
        }).catch(err=>res.json(err))
   }
}