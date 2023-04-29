const { default: mongoose } = require("mongoose");

const companySchema = mongoose.Schema({
    company: {
        type:String
    },

    department: [
    ],
    addat: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Company" ,companySchema)