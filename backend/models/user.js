const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        default: "https://res.cloudinary.com/harsh205/image/upload/v1607541179/noimage_l9qxru.png"
    },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }]

})

mongoose.model("User", userSchema)