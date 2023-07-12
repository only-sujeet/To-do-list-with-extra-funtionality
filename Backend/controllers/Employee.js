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

        const isMatch = await emp.comparePassword(password)
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
        //const task = await Task.findById("648f162e0b096bfbb858b008")
        // const doc = (req.file) ? req.file.filename : null
        // const emp = await People.findById(req.emp._id)
        // if (emp.tasks.includes(task._id)) {
        //     const index = emp.tasks.indexOf(task._id)
        //     emp.tasks.splice(index, 1);
        //     emp.save();
        // }
        // task.status = "submitted"
        // task.document = doc;
        // await task.save();
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

            const task = await Task.findById(req.params.id)
            task.fileName = file.originalname
            task.driveLink = response.data.webViewLink
            task.status = "submited"
            const savefile = await task.save();



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
