const userHelper = require('../helper/userHelper')


module.exports = {
    getPeople: (req, res, next) => {
        userHelper.getPeople(req.userId).then(data => {
            res.json(data)
        }).catch(err => res.json(err))
    },
    requestFollow: (req, res, next) => {

        userHelper.doFollow(req.userId, req.body.friendId).then(data => {
            res.json(data)

        }).catch(err => res.json(err))

    },
    requestUnFollow: (req, res, next) => {

        userHelper.doUnFollow(req.userId, req.body.friendId).then(data => {
            res.json(data)
        }).catch(err => res.json(err))

    },
    removeFollow: (req, res, next) => {

        userHelper.removeFollow(req.userId, req.body.friendId).then(data => {
            res.json(data)
        }).catch(err => res.json(err))

    },
    getFollow: (req, res, next) => {

        let userId = req.body.userId ? req.body.userId : req.userId
        userHelper.getFollow(userId).then(data => {
            res.json(data)
        }).catch(err => res.json(err))
    },
    changeProfile: (req, res) => {
       
        userHelper.changeProfile(req.userId, req.body.url).then(data => {
            res.json(data)
        }).catch(err => res.json(err))
    },
    refreshUser: (req, res) => {
        userHelper.refreshUSer(req.userId).then(data =>{
            res.json(data)
        }).catch(err=>res.json(err))
    },
    editProfile:(req,res,next)=>{
        userHelper.EditProfile(req.userId,req.body).then(data=>{
            res.json(data)
        })
    }
    ,
    getNotification:(req,res,next)=>{
        userHelper.getNotification(req.userId).then(data=>{
            res.json(data)
        })
    }
}