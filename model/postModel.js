const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        profilePic: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
        },
        privacy: {
            type: String,
        },
        images: {
            type: Array,
        },
        user: {
            type: ObjectId,
            ref: "User",
        },
        
        Likes: {
            type: Array,
            default: [],
           
        },
        comments: [
            {
                comment: {
                    type: String,
                },
                image: {
                    type: String,
                },
                commentBy: {
                    type: ObjectId,
                    ref: "User",
                },
                commentAt: {
                    type: Date,
                    default: new Date(),
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);