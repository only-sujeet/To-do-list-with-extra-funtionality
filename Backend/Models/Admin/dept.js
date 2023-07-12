const { default: mongoose } = require("mongoose");


const companySchema = mongoose.Schema({
    company: {
        type: String,
        required: [true]
    },

    department: {
        type: String,
        required: [true]
    },
    subDepts: [
        {
            subDept: {
                type: String,
                required: true,
            },
            deptId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Department",
            },
            unit: {
                type: String,
                required: true,
            },
            rate: {
                type: String,
                required: true,
            },
            taskDependencyDept: {
                type: String,
                required: true,
            },
            taskDependencySubDept: {
                type: String,
                required: true,
            },
        }
    ]
})
module.exports = mongoose.model("Department", companySchema)