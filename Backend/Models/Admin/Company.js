const { default: mongoose } = require("mongoose");


const companySchema = mongoose.Schema({
    company: {
        type: String
    },
    field: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        }
    ],
    addat: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Company", companySchema)