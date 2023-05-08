const { default: mongoose } = require("mongoose");


const companySchema = mongoose.Schema({
    company: {
        type: String
    },

    field:{
        type: String
    },
    subField:[

    ]
})

module.exports = mongoose.model("Department", companySchema)