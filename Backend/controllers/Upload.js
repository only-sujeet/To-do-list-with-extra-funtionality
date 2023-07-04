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

// for excel bulk upload 
exports.bulkUpload = async (req, res) => {
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    // const { name,
    //     rate,
    //     unit,
    //     department,
    //     taskDependency,
    //     instruction,
    //     startDate,
    //     endDate,
    //     timeDuration,
    //     checkList, } = data
    //     data.forEach( async (entry) => {
    //     const newData = new Task({
    //       name: entry[0],
    //       rate: entry[1],
    //       unit: entry[2],
    //       department: entry[3],
    //       taskDependency: entry[4],
    //       instruction: entry[5],
    //       startDate: entry[6],
    //       endDate: entry[7],
    //       timeDuration: entry[8],
    //       checkList: entry[9],
    //       status: entry[10],
    //       company:  entry[11],
    //     });


    //      newData.save((err) => {
    //         if (err) {
    //             console.error('Error saving data:', err);
    //         }
    //         else{

    //             res.status(200).json({ message: 'Data uploaded and saved successfully' });
    //         }


    //     });
    // });
    // const newData = new Task({
    //   name,
    //   rate,
    //   unit,
    //   department,
    //   taskDependency,
    //   instruction,
    //   startDate,
    //   endDate,
    //   timeDuration,
    //   checkList,
    //   company: req.admin.company,
    //   status:"Created"});

    //   await newData.save((err) => {
    //     if (err) {
    //       console.error('Error saving data:', err);
    //       res.status(500).json({ error: 'Error saving data' });
    //     } else {
    //       res.status(200).json({ message: 'Data saved successfully' });
    //     }
    //   });
    // const company = req.admin.company
    // const status = "Created"
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