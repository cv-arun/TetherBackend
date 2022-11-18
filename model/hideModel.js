const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const hideSchema = mongoose.Schema(
    {
        post: [{
            type: ObjectId,
            ref: 'Post'
        }],
        user: [{
            type: ObjectId,
            ref: 'User'
        }],
        
       

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Hide", hideSchema);
