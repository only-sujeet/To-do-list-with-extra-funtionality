const People = require("../Models/Admin/People")
const Task = require("../Models/Admin/Task")

exports.addTask = async (req, res) => {
    try {
        console.log(req.body)

        const { name, rate, unit, department, instruction, taskDependency, startDate, endDate } = req.body.values


        const task = new Task({ name, rate, unit, department, instruction, taskDependency, startDate, endDate, status: "Created", checkList: req.body.val,company: req.admin.company, })
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
        
       
        const task =     await Task.find({company:req.admin.company, status:"Created"})
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


// get Employee by department

exports.getEmpByDept = async (req, res) => {
    try {
        const { department } = req.body
        const emp = await People.find({ company: req.admin.company, department })
        res.send(emp)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


exports.assignTask = async (req, res) => {
    try {
        const { empId, taskId } = req.body
        const emp = await People.findById(empId)
        const task = await Task.findById(taskId) 

        task.status = "assign"
        await task.save();

        emp.tasks.push(task._id)
        emp.save();

        res.status(200).json({
            success: true, message: "Task Assigned..."
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
