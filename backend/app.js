const express = require("express")
const cors = require('cors')
const app = express()
app.use(cors())
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const PORT = 5000
const { MONGOURI } = require("./keys")



mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("Connected To MongoDb")
})
mongoose.connection.on("error", (err) => {
    console.log("mongoDb is Not Connected", err)
})

require('./models/user')
require('./models/post')
app.use(bodyParser.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

// app.get('/', (req, res) => {
//     res.send("Hello from Home")
// })

// password : lWRoMiBLKEbC4rM7

app.listen(PORT, () => {
    console.log("Server Connected On", PORT)
})