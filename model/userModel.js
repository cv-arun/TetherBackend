const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      trim: true,
      text: true,
    },
    username: {
      type: String,
      trim: true,
      text: true,
      unique: true,
    },

    email: {
      type: String,
      // required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    DOB: {
      type: String,
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: [{
      type: ObjectId,
      ref: 'User'
    }],
    followers: [{
      type: ObjectId,
      ref: 'User'
    }],
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    notifications: [{
      text: String,
      read: {
        type: Boolean,
        default: false
      },
      time: Date,
      friend:{
        type:ObjectId,
        ref:'User'
      },
      ref:{
        type:ObjectId,
        ref:'Post'
      },
    }],
    isOnline: Boolean,
    SocketId: String,
    lastActive: Date,

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);