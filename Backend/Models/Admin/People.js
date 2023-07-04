const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const peopleSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    subDept: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    altmobileno: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    adharno: {
        type: String,
        required: true
    },
    panno: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]

})

peopleSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

peopleSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

peopleSchema.methods.generateToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
}



const People = mongoose.model("People", peopleSchema)
module.exports = People