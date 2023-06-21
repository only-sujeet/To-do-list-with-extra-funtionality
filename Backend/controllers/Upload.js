const File = require("../Models/Admin/File");
const { google } = require('googleapis');
const fs = require("fs")
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
// exports.uploadfile = async (req, res, next) => {
//     try {
//         if (!req.file) {
//             res.status(400).send("No file uploaded.");
//             return;
//         }
//         const auth = authenticateGoogle();
//         const response = await uploadToGoogleDrive(req.file, auth);
//         deleteFile(req.file.path);
//         res.status(200).json({ response });
//     } catch (err) {
//         console.log(err);
//     }
// }