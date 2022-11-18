require('dotenv').config()
const postHelper = require('../helper/postHelper');
const userHelper = require('../helper/userHelper')

const cloudinary = require("cloudinary");
const fs = require("fs");
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
exports.getMyPost = (req, res, next) => {

  postHelper.getAllPost(req.userId, true).then(data => {
    res.json(data)
  }).catch(err => res.json(err))

}
exports.hitLike = (req, res, next) => {

  postHelper.hitLike(req.userId, req.body.postId).then(data => {
    res.json(data)
  }).catch(err => res.json(err))

}
exports.addCommnent = (req, res, next) => {

  postHelper.addCommnent(req.userId, req.body.postId, req.body.text).then(data => {
    res.json(data)
  }).catch(err => res.json(err))

}
exports.removeCommenent = (req, res, next) => {

  postHelper.removeCommenent(req.body.postId, req.body.commentId).then(data => {
    res.json(data)
  }).catch(err => res.json(err))

}











exports.uploadImages = async (req, res) => {
  try {
    let { profile, caption, privacy } = req.body
    let path = `${req.userId}/images`
    let files = req.files ? Object.values(req.files).flat() : null;
    let images = [];
    if (files) {
      for (const file of files) {
        const url = await uploadToCouldinary(file, path);
        images.push(url);
        removeTmp(file.tempFilePath)
      }

    }

    profile == true ? userHelper.updateProfile(req.userId, images).then(data => {
      res.json({ msg: 'profile updated' })
    }) :
      postHelper.updataPostDetails(profile, caption, images, req.userId, privacy).
        then(data => {
         
          postHelper.setPostNotification(req.userId,data._id)
            .then(data => console.log(data,'after noti'))
          res.json({ msg: 'db updated' })
        });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadToCouldinary = (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath, {
      folder: path
    }, (err, res) => {
      if (err) {
        removeTmp(file.tempFilePath)
        res.status(400).json({ messge: "image upload failed" })
      }
      resolve({
        url: res.secure_url
      })
    }
    )
  })
}


const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};


