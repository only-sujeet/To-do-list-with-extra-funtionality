const mongoose = require("mongoose")
const bcrypt  = require('bcrypt')
const adminSchema = mongoose.Schema({
    name:{
        type: String,
        required : [true, "Name is required"],
      
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


adminSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 10)
    }
    next();

    
})

const Admin =  mongoose.model("Admin", adminSchema)
module.exports = Admin