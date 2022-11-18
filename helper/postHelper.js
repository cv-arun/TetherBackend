const postModel = require('../model/postModel');
const userModel = require('../model/userModel')
const socketServer = require('../socketServer')

module.exports = {

    updataPostDetails: (profile, caption, images, userId, privacy) => {
        return new Promise((resolve, reject) => {
            postModel.create({
                profilePic: profile,
                text: caption,
                images: images,
                user: userId,
                privacy: privacy
            }).then(data => resolve(data))
                .catch(err => reject(err))
        })
    },
    getAllPost: (userId, mypost) => {
        return new Promise(async (resolve, reject) => {
            if (mypost) {
                postModel.find({ user: userId }).sort('-createdAt').populate('user').populate('comments.commentBy').then(data => {
                    resolve(data)
                }).catch(err => reject(err))
            } else {
                try {
                    let user = await userModel.findById(userId);

                    let data = await postModel.find({ $or: [{ user: { $in: [...user.following, userId] } }, { privacy: 'public' }] })
                        .sort('-createdAt').populate('user').populate('comments.commentBy')
                    resolve(data)

                } catch (err) {
                    reject(err)
                }
            }
        })
    },
    hitLike: (userId, postId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let likes = await postModel.findOne({ _id: postId, Likes: userId })

                if (likes) {
                    let data = await postModel.findByIdAndUpdate(postId, { $pull: { Likes: userId } })

                    resolve({ msg: 'Unliked' })
                } else {
                    let data = await postModel.findByIdAndUpdate(postId, { $push: { Likes: userId } })
                    resolve({ msg: 'Liked' })
                }
            } catch (err) {
                reject(err)
            }

        })
    },
    addCommnent: (userId, postId, text) => {
        return new Promise(async (resolve, reject) => {
            try {
                let userCommnent = {
                    comment: text,
                    commentBy: userId,
                    commentAt: new Date()
                }
                let data = await postModel.findByIdAndUpdate(postId, { $push: { comments: { $each: [userCommnent], $position: 0 } } })
                resolve({ msg: 'comment added' })
            } catch (err) {
                reject(err)
            }

        })
    },
    removeCommenent: (postId, commentId) => {
        return new Promise(async (resolve, reject) => {
            try {

                let data = await postModel.findByIdAndUpdate(postId, { $pull: { comments: { _id: commentId } } })
                resolve({ msg: 'comment removed' })
            } catch (err) {
                reject(err)
            }

        })
    },
    setPostNotification: (usrId, postId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await userModel.findById(usrId, { following: 1 })
                let notification = {
                    text: ' added a new post',
                    friend: data._id,
                    time: new Date(),
                    ref: postId
                }
                data?.following.map(async (id) => {
                    let user = await userModel.findByIdAndUpdate(id, { $push: { notifications: { $each: [notification], $position: 0 } } })

                })
                resolve({ msg: 'post notification completed' })
            } catch (err) {
                console.log(err)
            }
        })
    }


}