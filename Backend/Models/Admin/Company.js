const { default: mongoose } = require("mongoose");


const companySchema = mongoose.Schema({
    company: {
        type: String,
        required:[true,"Please enter company"]
    },
    department: [

    ],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
})

module.exports = mongoose.model("Company", companySchema)