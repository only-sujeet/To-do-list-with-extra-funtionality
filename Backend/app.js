const express = require("express")
const app = express();
require('dotenv').config({ path: 'config.env' })
const bodyparser = require("body-parser");
const connectDB = require("./Config/database");
const cookieParser = require('cookie-parser')
const cors = require('cors')

// database
connectDB()

//use middlewares
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

// use routes
app.use('/api/admin/', require('./Routes/Admin'))
app.use('/api/emp/', require("./Routes/employee"))

// for display image
app.use('/Image', express.static("Image"))

module.exports = app