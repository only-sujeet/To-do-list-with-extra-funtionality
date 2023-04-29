const { default: mongoose } = require("mongoose");

const companySchema = mongoose.Schema({
    name: String,
    Department: [{
        DeptName: String,
        addaat: {
            type: Date,
            default: Date.now
        }
    }],
    addat: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Company" ,companySchema)