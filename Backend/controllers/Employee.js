const People = require("../Models/Admin/People");
const Task = require("../Models/Admin/Task");

exports.EmpLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        let emp = await People.findOne({ email }).select("+password");

        if (!emp) {
            return res.status(400).json({ success: false, message: "!! Invalid Email" })
        }

        const isMatch = await People.find({ password })
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "!! Invalid Password" })

        }
        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        const token = await emp.generateToken()
        res.status(200).cookie("EmpToken", token, option).json({ success: true, message: "Login Success", token })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

exports.empProfile = async (req, res) => {
    try {
        const emp = await People.findById(req.emp._id)
        res.send(emp)

    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};



exports.getAssignedTask = async (req, res) => {
    try {
        const emp = await People.findById(req.emp._id).populate("tasks")
        res.status(200).json({
            success: true,
            tasks: emp.tasks
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};


exports.AcceptTask = async (req, res) => {
    try {

        const emp = await People.findById(req.emp._id)
        const task = await Task.findById(req.params.id)

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
exports.submitDoc = async (req, res) => {
    try {
        const id = req.params.id
        const files = req.file
        console.log(id)
        console.log(files)
        //const task = await Task.findById("648f162e0b096bfbb858b008")
        // const doc = (req.file) ? req.file.filename : null
        // const emp = await People.findById(req.emp._id)
        // if (emp.tasks.includes(task._id)) {
        //     const index = emp.tasks.indexOf(task._id)
        //     emp.tasks.splice(index, 1);
        //     emp.save();
        // }
        // task.status = "submited"
        // task.document = doc;
        // await task.save();

        res.status(200).json({
            success: true,
            message: "Task Submited",

        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


