const express = require("express")
const bodyparser = require("body-parser");
const ConnectDB = require("./Config/database");
const app = express();
require('dotenv').config({ path : 'Config/config.env'})

// database
ConnectDB();

app.use( bodyparser.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


module.exports = app