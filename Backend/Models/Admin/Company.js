const { default: mongoose } = require("mongoose");

const companySchema = mongoose.Schema({
    company: {
        type:String
    },

    field: [
    ],
    addat: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Company" ,companySchema)