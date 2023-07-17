const mongoose = require('mongoose');

const reminderSchema = mongoose.Schema({

    company: String,
    remindAt: Date,
    remindMessage: String,
    taskName: String,
    isRemind: {
        type: Boolean,
        default: false
    }
})





module.exports = mongoose.model("Reminder", reminderSchema)