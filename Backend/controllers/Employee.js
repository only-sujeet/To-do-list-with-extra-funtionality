const People = require("../Models/Admin/People");
const Task = require("../Models/Admin/Task");
const { google } = require('googleapis');
const fs = require("fs")
const authenticateGoogle = () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: `${__dirname}/service_account.json`,
        scopes: "https://www.googleapis.com/auth/drive",
    });
    return auth;
};

const deleteFile = (filePath) => {
    fs.unlink(filePath, () => {
        console.log("file deleted");
    });
};


exports.EmpLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        let emp = await People.findOne({ email }).select("+password");

        if (!emp) {
            return res.status(400).json({ success: false, message: "!! Invalid Email" })
        }

        const isMatch = await emp.matchPassword(password)
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
        res.status(200).json(emp.tasks)
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};


exports.AcceptTask = async (req, res) => {
    try {

        const emp = await People.findById(req.emp._id)
        const task = await Task.findById(req.params.id)

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
            success: true, message: "Task Accepted..."
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
exports.submitDoc = async (req, res) => {
    try {

        const file = req.file
        if (!file) {
            res.status(400).send("No file uploaded.");
            return;
        }
        const auth = authenticateGoogle();
        const fileMetadata = {
            name: file.originalname,
            parents: ["1Fpplz4lMg7BbcG7dZXh8whLCpOfqyavI"], // Change it according to your desired parent folder id
        };
        const media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path),
        };
        const driveService = google.drive({ version: "v3", auth });

        try {
            const response = await driveService.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: "id,webViewLink",
            });

            const task = await Task.findById(req.params._id)
            task.fileName = file.originalname
            task.driveLink = response.data.webViewLink
            task.status = "Submitted"
            await task.save();



            deleteFile(req.file.path);
            res.status(200).json({
                success: true,
                message: "Task Submited",

            })

        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'Failed to upload file' });
        }




    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


//  Employee reject task for some reasons 

exports.rejectTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        console.log(req.body.rejectReason)
        res.status(200).json({
            success: true, message: "Task rejected.."
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
