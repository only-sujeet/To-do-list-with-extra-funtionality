const mongoose = require("mongoose")

const loginSchema = mongoose.Schema({
    name:{
        type: String,
        required : [true, "Name is required"]
    },
    email :{
        type: String,
        required :[true, "Email is required"]
    },
    password :{
        type : String,
        required : [true, "Password is required"]
    }
})

const Alogin =  mongoose.model("AdminLogin", loginSchema)
module.exports = Alogin