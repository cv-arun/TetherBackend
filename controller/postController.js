require('dotenv').config()
const postHelper = require('../helper/postHelper');
const userHelper = require('../helper/userHelper')

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


exports.getPost = (req, res, next) => {


  postHelper.getAllPost(req.userId).then(data => {
    res.json(data)
  }).catch(err => res.json(err))

}

exports.getPostChunks = (req, res, next) => {
  const page = req.params.page || 1
  const limit = req.params.limit || 5
  postHelper.getPostChunks(req.userId, false, page, limit).then(data => {
    res.json(data)
  }).catch(err => res.json(err))

}
exports.getMyPost = (req, res, next) => {

  postHelper.getAllPost(req.userId, true).then(data => {
    res.json(data)
  }).catch(err => res.json(err))

}
exports.hitLike = async (req, res, next) => {

  try {
    let data = await postHelper.hitLike(req.userId, req.body.postId)
    res.json(data)
  } catch (err) {
    throw err
  }

  // postHelper.hitLike(req.userId, req.body.postId).then(data => {
  //   res.json(data)
  // }).catch(err => res.json(err))

}
exports.addCommnent = async (req, res, next) => {
  try {
    const data = await postHelper.addCommnent(req.userId, req.body.postId, req.body.text)
    res.json(data)

  } catch (err) {
    throw (err)
  }


}
exports.removeCommenent = async (req, res, next) => {
  try {
    const data = await postHelper.removeCommenent(req.body.postId, req.body.commentId);
    res.json(data)
  } catch (err) {
    throw err
  }

}


exports.uploadImages = async (req, res) => {

  try {
    let { url, profile, caption, privacy } = req.body

    console.log(req.body, 'body.....................')
    // let path = `${req.userId}/images`
    // let files = req.files ? Object.values(req.files).flat() : null;

    // let images = [];
    // if (files) {
    //   for (const file of files) {
    //     console.log('1')
    //     const url = await uploadToCouldinary(file, path);
    //     images.push(url);
    //     removeTmp(file.tempFilePath)
    //   }

    // }


    profile == true ? userHelper.updateProfile(req.userId, url).then(data => {
      res.json({ msg: 'profile updated' })
    }) :
      postHelper.updataPostDetails(profile, caption, url, req.userId, privacy).
        then(data => {

          postHelper.setPostNotification(req.userId, data._id)
            .then(data => console.log(data, 'after noti'))
          res.json({ msg: 'db updated' })
        });


  } catch (error) {
    console.log(err)
    return res.status(500).json({ message: error.message });
  }
};



