const mongoose = require("mongoose")
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminSchema = mongoose.Schema({
    company:{
        type: String,
        required :[true, "Company is required"]
    },

    email :{
        type: String,
        required :[true, "Email is required"]
    },
   
    password :{
        type : String,
        required : [true, "Password is required"]
    },
    department:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Department"
        }
    ]
    

})


adminSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 10)
    }
    next();
})

adminSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generateToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
}

const Admin =  mongoose.model("Admin", adminSchema)
module.exports = Admin