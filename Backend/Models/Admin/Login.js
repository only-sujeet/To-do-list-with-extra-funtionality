const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto")

const adminSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company is required"]
    },

    email: {
        type: String,
        required: [true, "Email is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },
    department: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        }
    ],


    resetPasswordToken: String,
    resetPasswordExpires: Date,



})


adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

adminSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generateToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
}

adminSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpires = Date.now() + 5 * 60 * 1000;
    return resetToken
}


const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin