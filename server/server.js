const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require('cookie-parser')



app.use(express.json(), express.urlencoded({extended: true}), cors({credentials: true, origin:'http://localhost:3000'}))
app.use(cookieParser())

require("dotenv").config()

const port = process.env.PORT
require("./config/mongoose.config")
require("./routes/job.route")(app)
require("./routes/user.route")(app)

app.listen(port, () => console.log(`Listening on port: ${port}`))