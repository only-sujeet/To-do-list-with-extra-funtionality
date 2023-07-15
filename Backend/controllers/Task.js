const People = require("../Models/Admin/People")
const Task = require("../Models/Admin/Task")


// this  is controller creates a new task 
exports.addTask = async (req, res) => {
    try {


        const { name, department, instruction, taskDependency, startDate, endDate, unit, rate, subDepartment } = req.body.values
        // const { unit, rate } = req.body.subDeptDetails
        const { number, selection } = req.body.daysdata

        const timeDuration = number + " " + selection

        const task = new Task({ name, rate, unit, department, instruction, taskDependency, startDate, endDate, timeDuration, status: "Created", checkList: req.body.val, company: req.admin.company, subDepartment })
        await task.save();
        res.status(200).json({
            success: true, message: "Successfully Created Task",
            task
        })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.getOneTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


exports.getTask = async (req, res) => {
    try {


        const task = await Task.find({ company: req.admin.company, $or: [{ status: "Created" }, { status: "Approved" }, { status: "assign" }] })
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
exports.getAllTask = async (req, res) => {
    try {


        const task = await Task.find({ company: req.emp.company, status: "Approved", department: req.emp.department })
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

        const findSecondWord = (sentence) => {
            const words = sentence.match(/\b\w+\b/g);

            if (words && words.length >= 2) {
                return words[1];
            }
        };
        const findFirstWord = (sentence) => {
            const words = sentence.match(/\b\w+\b/g);
            if (words && words.length >= 2) {
                return words[0];
            }
        };
        if (task.timeDuration) {
            const durationNumber = findFirstWord(task.timeDuration)
            const durationType = findSecondWord(task.timeDuration)

            task.startDate = Date.now()
            console.log(durationType, durationNumber)

            if (durationType === "Minute") {
                task.endDate = Date.now() + durationNumber * 60 * 1000
            }
            if (durationType === "Hour") {
                task.endDate = Date.now() + durationNumber * 60 * 60 * 1000
            }
            if (durationType === "Day") {
                task.endDate = Date.now() + durationNumber * 24 * 60 * 60 * 1000
            }
            if (durationType === "Month") {

                const endDate = new Date(Date.now());
                endDate.setMonth(endDate.getMonth() + Number(durationNumber));
                task.endDate = endDate
            }
            if (durationType === "Year") {
                const currentDate = new Date();
                task.endDate = endDate = new Date(currentDate.getFullYear() + Number(durationNumber), currentDate.getMonth(), currentDate.getDate());

            }
        }
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

exports.approveTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res
                .status(404)
                .json({ success: false, message: "Task not found..." })
        }
        task.status = "Approved"
        task.save();
        res.status(200).json({ success: true, message: "Task Approved..." })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res
                .status(404)
                .json({ success: false, message: "Task not found..." })
        }
        task.deleteOne()
        res.status(200).json({ success: true, message: "Task Deleted..." })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}