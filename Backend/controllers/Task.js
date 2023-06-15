const Task = require("../Models/Admin/Task")

exports.addTask = async (req, res) => {
    try {
        console.log(req.body)

        const { name, rate, unit, field, instruction, taskDependency, startDate, endDate } = req.body.values


        const task = new Task({ name, rate, unit, field, instruction, taskDependency, startDate, endDate, status: "Created", checkList: req.body.val })
        await task.save();
        res.status(200).json({
            success: true, message: "Successfully Created Task",
            task
        })
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await Task.find({})
        if (!task) {
            res.status(400).json({
                message: "Task Not Found",
                success: false
            })
        }
        else {
            res.status(200).json(task)
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
