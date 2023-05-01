const  mongoose = require('mongoose')


const peopleSchema = mongoose.Schema({
    company:{
        type: String,
        required: true,
    },
    field : {
        type:String,
        required: true,
    },
    firstName : {
        type:String,
        required: true,
    },
    middleName : {
        type:String,
        required: true,
    },
    lastName : {
        type:String,
        required: true,
    },
    email : {
        type:String,
        required: true,
    },
    dob : {
        type:Date,
        required: true,
    },
    age : {
        type:Number,
        required: true,
    },
    mobileno : {
        type:Number,
        required: true,
    },
    altmobileno : {
        type:Number,
        required: true,
    },
    address1 : {
        type:String,
        required: true,
    },
    address2 : {
        type:String,
        required: true,
    },
    Image : {
        type:String,
    },
})
const People = mongoose.model("People", peopleSchema)
module.exports = People