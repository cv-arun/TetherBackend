const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const chatSchema = mongoose.Schema(
    {
        users: [{
            type: ObjectId,
            ref: 'User'
        }, {
            type: ObjectId,
            ref: 'User'
        }],
        messages: [{
            roomId:String,
            author: String,
            text: String,
            time: String,
           
        }]

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Chat", chatSchema);
