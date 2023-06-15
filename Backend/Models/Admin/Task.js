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
    field: {
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
        required: [true, "Please enter staring date"]
    },
    endDate: {
        type: String,
        required: [true, "Please enter ending date"]
    },
    checkList: [],
    status: {
        type: String,
        required: true
    }

})
const Task = mongoose.model("Task", taskSchema)
module.exports = Task