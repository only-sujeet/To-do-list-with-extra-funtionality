const Task = require("../Models/Admin/Task")

exports.addTask = async (req, res) => {
    try {
        const { name, description, field, agency, taskDependency, QTY, amount } = req.body
        const task = new Task({ name, description, field, agency, taskDependency, QTY, amount, status:"Created"})
        await task.save();
        res.status(200).json({
            success: true, message: "Successfully Created Task"
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.getTask = async (req,res) => { 
    try {
        const task = await Task.find({})
        if (!task) {
            res.status(400).json({
                 message:"Task Not Found",
                 success:false
            })
        }
        else {
            res.status(200).json(task)
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
