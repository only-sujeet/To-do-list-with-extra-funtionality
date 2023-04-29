 const express = require("express")
 const app = express();
 require('dotenv').config({ path : 'Config/config.env'})
 const bodyparser = require("body-parser");
const connectDB = require("./Config/database");


// database
connectDB()

//use middlewares
app.use( bodyparser.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// use routes
app.use('/api/admin/', require('./Routes/Admin'))


 module.exports = app