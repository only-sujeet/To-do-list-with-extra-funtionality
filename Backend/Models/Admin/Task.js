const mongoose = require('mongoose')


const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Task name"]
    },
    rate: {
        type: String,
        required: [true, "Please enter rate"]
    },
    unit: {
        type: String,
        required: [true, "Please enter unit"]
    },
    department: {
        type: String,
        required: [true, "Please enter department"]
    },
    subDepartment: {
        type: String,
        required: [true, "Please enter department"]
    },
    taskDependency: {
        type: String,
        required: [true, "Please enter dependency"]
    },
    instruction: {
        type: String,
        required: [true, "Please enter your instruction"]
    },
    startDate: {
        type: Date,

    },
    endDate: {
        type: Date,

    },
    checkList: [],
    status: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    document: {
        type: String,
    },
    timeDuration: {
        type: String,
        default: "----"
    },
    reason: {
        type: String,
    },
    fileName: String,

    driveLink: String,

    reminders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reminder"
    }]

})
const Task = mongoose.model("Task", taskSchema)
module.exports = Task