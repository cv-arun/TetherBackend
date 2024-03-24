const postModel = require('../model/postModel');
const userModel = require('../model/userModel')


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
                postModel.find({ user: userId }).sort('-createdAt').populate('user', 'first_name last_name picture').populate('comments.commentBy', 'first_name last_name picture').then(data => {
                    resolve(data)
                }).catch(err => reject(err))
            } else {
                try {
                    let user = await userModel.findById(userId);

                    let data = await postModel.find({ $or: [{ user: { $in: [...user.following, userId] } }, { privacy: 'public' }] })
                        .sort('-createdAt').populate('user', 'first_name last_name picture').populate('comments.commentBy', 'first_name last_name picture')
                    resolve(data)

                } catch (err) {
                    reject(err)
                }
            }
        })
    },
    getPostChunks: (userId, mypost, page, limit = 5) => {
        const skip = page * limit - limit
        return new Promise(async (resolve, reject) => {
            if (mypost) {
                postModel.find({ user: userId }).sort('-createdAt').populate('user', 'first_name last_name picture').populate('comments.commentBy', 'first_name last_name picture').then(data => {
                    resolve(data)
                }).catch(err => reject(err))
            } else {
                try {

                    let user = await userModel.findById(userId);

                    let data = await postModel.find({ $or: [{ user: { $in: [...user.following, userId] } }, { privacy: 'public' }] })
                        .sort('-createdAt').populate('user', 'first_name last_name picture').populate('comments.commentBy', 'first_name last_name picture').skip(skip).limit(limit)
                    resolve(data)

                } catch (err) {
                    reject(err)
                }
            }
        })
    },

    hitLike: async (userId, postId) => {

        try {
            let likes = await postModel.findOne({ _id: postId, Likes: userId })
            let msg = ''

            if (likes) {
                let data = await postModel.findByIdAndUpdate(postId, { $pull: { Likes: userId } })
                msg = 'Unliked'

            } else {
                let data = await postModel.findByIdAndUpdate(postId, { $push: { Likes: userId } })
                msg = 'Liked'
            }
            const post = await postModel.findOne({ _id: postId }).populate('user', 'first_name last_name picture').populate('comments.commentBy', 'first_name last_name picture')

            return { post, msg }

        } catch (err) {
            throw err
        }

    },
    addCommnent: async (userId, postId, text) => {
        try {
            let userCommnent = {
                comment: text,
                commentBy: userId,
                commentAt: new Date()
            }
            await postModel.findByIdAndUpdate(postId, { $push: { comments: { $each: [userCommnent], $position: 0 } } })
            const post = await postModel.findOne({ _id: postId }).populate('user', 'first_name last_name picture').populate('comments.commentBy', 'first_name last_name picture')

            return { msg: 'comment added', post }
        } catch (err) {
            throw (err)
        }
    },
    removeCommenent: async (postId, commentId) => {

        try {

            let data = await postModel.findByIdAndUpdate(postId, { $pull: { comments: { _id: commentId } } })
            const post = await postModel.findOne({ _id: postId }).populate('user', 'first_name last_name picture').populate('comments.commentBy', 'first_name last_name picture')

            return { msg: 'comment removed',post }
        } catch (err) {
            reject(err)
        }


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