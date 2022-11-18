const chatModel = require('../model/chatModel');
const userModel=require('../model/userModel');

module.exports = {
    GetChatDetails: (friendId, myId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let chat = await chatModel.findOne({ users: { $all: [friendId, myId] } }).populate('users', '_id first_name picture isOnline lastActive');
                chatdetail = chat ? chat : await (await chatModel.create({ users: [friendId, myId] })).populate('users', '_id first_name picture isOnline lastActive');
                resolve(chatdetail)
            } catch (err) {
                reject(err)
            }
        });

    },
    addChat: (chat) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await chatModel.findByIdAndUpdate(chat.roomId,
                    {
                        $push: {
                            messages: {
                                $each: [chat],
                                $position: 0
                            }
                        }
                    })
                resolve(data)
            } catch (err) {
                reject(err)
            }
        })
    },
    registerOnline: (userId,SocketId) => {
        return new Promise(async (resolve, reject) => {
            try {

                let data = await userModel.findByIdAndUpdate(userId,{isOnline:true,SocketId})
                resolve(data)
            } catch (err) {
                reject(err)
            }
        })
    },
    registerOffline: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await userModel.findByIdAndUpdate(userId,{isOnline:false,lastActive:new Date()})
                resolve(data)
            } catch (err) {
                reject(err)
            }
        })
    }
}