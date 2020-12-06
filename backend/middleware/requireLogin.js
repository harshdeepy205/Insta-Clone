const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require('../keys')
const mongoose = require("mongoose")
const User = mongoose.model('User')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    // console.log("err form authorization", Authorization)
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" })
    }
    console.log("err form authorization", authorization)
    // res.send(authorization)
    const token = authorization.replace("Bearer ", "")
    console.log('error from token', token)
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" })
        }
        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })
    })
}