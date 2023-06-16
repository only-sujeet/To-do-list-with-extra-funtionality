const { default: mongoose } = require("mongoose");


const companySchema = mongoose.Schema({
    company: {
        type: String,
        required:[true]
    },

    department:{
        type: String,
        required:[true]
    },
    subDepartmetn:[

    ] 
})

module.exports = mongoose.model("Department", companySchema)