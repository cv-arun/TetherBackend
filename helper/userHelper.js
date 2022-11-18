const userModel = require('../model/userModel')

const userHelper = {
    getPeople: (myId) => {

        return new Promise(async (resolve, reject) => {
            try {
                var user = await userModel.findById(myId)
            } catch { err => reject(err) }

            userModel.find({ _id: { $nin: [...user.following, myId] } }, { password: 0 }).then(data => {
                resolve(data)
            }).catch(err => reject(err))
        })
    },

    doFollow: (myId, friendId) => {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndUpdate(myId, { $addToSet: { following: friendId } }).then(data => {
                userModel.findByIdAndUpdate(friendId, { $addToSet: { followers: myId } }).then(data => {
                    resolve(data)
                }).catch(err => reject(err))
            }).catch(err => reject(err))
        })
    },

    doUnFollow: (myId, friendId) => {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndUpdate(myId, { $pull: { following: friendId } }).then(data => {
                userModel.findByIdAndUpdate(friendId, { $pull: { followers: myId } }).then(data => {
                    resolve(data)
                }).catch(err => reject(err))
            }).catch(err => reject(err))
        })
    },
    removeFollow: (myId, friendId) => {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndUpdate(myId, { $pull: { followers: friendId } }).then(data => {
                userModel.findByIdAndUpdate(friendId, { $pull: { following: myId } }).then(data => {
                    resolve(data)
                }).catch(err => reject(err))
            }).catch(err => reject(err))
        })
    },

    getFollow: (myId) => {
        return new Promise((resolve, reject) => {
            userModel.findById(myId, { followers: 1, following: 1 }).populate('following').populate('followers').then(data => {
                resolve(data)
            }).catch(err => reject(err))
        })
    },
    updateProfile: (userId, image) => {
        image = image[0].url
        return new Promise(async (resolve, reject) => {
            try {
                let data = await userModel.findByIdAndUpdate(userId, { picture: image });
                resolve(data)
            } catch (err) {
                reject(err)
            }
        })
    },
    changeProfile: (userId, url) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await userModel.findByIdAndUpdate(userId, { picture: url });
                resolve(data)
            } catch (err) {
                reject(err)
            }
        })
    },
    EditProfile: (userId, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await userModel
                    .findByIdAndUpdate(userId,
                        {
                            first_name: data.firstName,
                            last_name: data.lastName,
                            DOB: data.DOB,
                            'details.bio': data.bio
                        });
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    },
    refreshUSer: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = await userModel.findById(userId)
                let user = {
                    userId: userData._id,
                    name: userData.first_name,
                    lastName: userData.last_name,
                    picture: userData.picture,
                    bio: userData.details?.bio,
                    DOB: userData.DOB
                }
                resolve(user)
            } catch (err) {
                reject(err)
            }
        })
    },
    getNotification: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await userModel.findById(userId, { notifications: 1 }).populate('notifications.friend','first_name picture')
                resolve(user)
            } catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = userHelper