const  mongoose = require('mongoose')


const taskSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description : {
        type:String,
        required: true,
    },
    field : {
        type:String,
        required: true,
    },
    agency : {
        type:String,
        required: true,
    },
    startDate : {
        type:Date,
    },
    endDate : {
        type:Date,
    },
    taskDependency : {
        type:String,
        required: true,
    },
    QTY : {
        type:Number,
        required: true,
    },
    amount : {
        type:Number,
        required: true,
    },
    status:{
        type:String,
        required:true
    }
})
const Task = mongoose.model("Task", taskSchema)
module.exports = Task