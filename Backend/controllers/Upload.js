const File = require("../Models/Admin/File");
const { google } = require('googleapis');

const xlsx = require('xlsx');
const fs = require("fs");
const Task = require("../Models/Admin/Task");

const authenticateGoogle = () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: `${__dirname}/service_account.json`,
        scopes: "https://www.googleapis.com/auth/drive",
    });
    return auth;
};

// const uploadToGoogleDrive = async (file, auth) => {

//     ()
//     return response;
// };
// const uploadToGoogleDrive = async (file, auth) => {
//     const fileMetadata = {
//         name: file.originalname,
//         parents: ["1Fpplz4lMg7BbcG7dZXh8whLCpOfqyavI"], // Change it according to your desired parent folder id
//     };
//     const media = {
//         mimeType: file.mimetype,
//         body: fs.createReadStream(file.path),
//     };
//     const driveService = google.drive({ version: "v3", auth });
//     const response = await driveService.files.create({
//         requestBody: fileMetadata,
//         media: media,
//         fields: "id,webViewLink",
//     });

//     const files = new File({
//         name: file.originalname,
//         driveLink:response.data.webViewLink
//     })

//     const savefile =  await files.save()
//     return response;
// };

const deleteFile = (filePath) => {
    fs.unlink(filePath, () => {
        console.log("file deleted");
    });
};

exports.uploadfile = async (req, res, next) => {
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

        const files = new File({
            name: file.originalname,
            driveLink: response.data.webViewLink
        })

        const savefile = await files.save();

        deleteFile(req.file.path);
        res.status(200).json({ success: true, message: "Succefully Uploaded" });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
    // const response = await uploadToGoogleDrive(req.file, auth);
    // res.status(200).json({ response });

}
     
// for excel bulk upload 
exports.bulkUpload = async (req, res) => {
    const file = req.file
    const workbook = xlsx.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    

    await Task.insertMany(data, (error, docs) => {
            if (docs) {
                res.status(200).json({ message: 'Data saved successfully' });
            }
            if (error) {
                console.error('Error saving data:', err);
                res.status(500).json({ error: 'Error saving data' });
            }
        })

}

exports.bulkUpdate = async (req, res, next) => {
    try {
        const task = req.body;
        const promises = task.map(async (item) => {
            const res = await Task.findByIdAndUpdate(item._id, { $set: { ...item } });
            return res
        })

        Promise.all(promises).then(() => res.status(200).json({ success: true, message: "Successfully Updated" })).catch((error) => res.status(400).json({ success: false, message: error }))

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}