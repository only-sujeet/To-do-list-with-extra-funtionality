const People = require("../Models/Admin/People")
const Reminder = require("../Models/Admin/Reminder")
const Task = require("../Models/Admin/Task")
const { sendEmail } = require("../middlewares/sendEmail");

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
        let remind1 = ""
        let remind2 = ""

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
        // Function to calculate the difference between two dates in hours and minutes
        const reminder = async (startDate, endDate) => {
            const diff = Math.abs(startDate - endDate); // Calculate the difference in milliseconds

            // Calculate the hours and minutes
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);



            if (!hours) {
                // to get 70% of the total minutes 
                const percentage1 = (70 * minutes) / 100;
                // to get 90% of the total minutes 
                const percentage2 = (90 * minutes) / 100;

                // to set first reminder
                const first = {
                    company: req.admin.company,
                    remindAt: task.startDate,
                    remindMessage: "first reminder ",
                    taskName: task.name,
                }
                const second = {
                    company: req.admin.company,
                    remindAt: Date.now() + percentage1 * 60 * 1000,
                    remindMessage: "second reminder..",
                    taskName: task.name,
                }
                remind1 = await Reminder.create(first)
                remind2 = await Reminder.create(second)

                return { remind1: remind1._id, remind2: remind2._id }

            }


            const hourInt = Math.floor(hours); // Extract the integer part of the hour
            const minuteFloat = hours - hourInt; // Extract the decimal part of the hour

            const minuteFraction = minutes / 60; // Convert minutes to a fraction of an hour
            const result = hourInt + minuteFloat + minuteFraction; // Add the hour, decimal part, and minute fraction


            if (hours) {
                // to get 70% of the total minutes 
                const percentage1 = (70 * result) / 100;
                // to get 90% of the total minutes 
                const percentage2 = (90 * result) / 100;

                // to set first reminder
                const first = {
                    company: req.admin.company,
                    remindAt: task.startDate,
                    remindMessage: "first reminder ",
                    taskName: task.name,
                }

                const second = {
                    company: req.admin.company,
                    remindAt: Date.now() + percentage1 * 60 * 60 * 1000,
                    remindMessage: "second reminder..",
                    taskName: task.name,
                }
                remind1 = await Reminder.create(first)
                remind2 = await Reminder.create(second)

                return { remind1: remind1._id, remind2: remind2._id }
            }
        }


        const reminderId = await reminder(task.startDate, task.endDate);

        task.reminders.push(reminderId.remind1)
        task.reminders.push(reminderId.remind2)
        task.status = "assign"
        emp.tasks.push(task._id)
        await task.save();
        await emp.save();

        res.status(200).json({
            success: true, message: "Task Assigned..."
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

setInterval(() => {
    const setReminder = async () => {
        const reminderList = await Reminder.find({})
        reminderList.forEach(reminder => {
            if (reminder.isRemind === false) {
                const value = new Date(reminder.remindAt) - Date.now()
                if (value < 0) {
                    const f = async () => {
                        const value = await Reminder.findById(reminder._id)
                        value.isRemind = true
                        await value.save()
                        console.log(value)
                        await sendEmail({
                            email: "sanjeevgaund2002@gmail.com",
                            subject: "Profile created...",
                            message: reminder.remindMessage
                        });

                    }
                    f();
                }
            }
        });

        // console.log(reminderList)
    }
    setReminder()
}, 1000)




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