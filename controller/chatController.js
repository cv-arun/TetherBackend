const chatHelper=require('../helper/chatHelper')

module.exports = {
    getchat: (req, res, next) => {
        chatHelper.GetChatDetails(req.userId,req.body.friendId).then(data=>{
            res.json(data)
        }).catch(err=>res.json(err))
   },
    addChat: (req, res, next) => {
        chatHelper.addChat(req.body.chat).then(data=>{
            res.json(data)
        }).catch(err=>res.json(err))
   },
    registerOnline: (req, res, next) => {
        chatHelper.registerOnline(req.body.userId,req.body.socketId).then(data=>{
            res.json(data)
        }).catch(err=>res.json(err))
   },
    registerOffline: (req, res, next) => {
        chatHelper.registerOffline(req.body.userId).then(data=>{
            res.json(data)
        }).catch(err=>res.json(err))
   },
   registerOfflineBysocketId: (req, res, next) => {
        chatHelper.registerOffline(req.body.socketId).then(data=>{
            res.json(data)
        }).catch(err=>res.json(err))
   }
}