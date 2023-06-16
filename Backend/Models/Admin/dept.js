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
    subDept:[

    ] 
})

module.exports = mongoose.model("Department", companySchema)