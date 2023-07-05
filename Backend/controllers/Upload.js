const File = require("../Models/Admin/File");
const { google } = require('googleapis');

const csvtojson = require('csvtojson');
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
    try {
        importFile('uploads/' + req.file.filename);
        function importFile(filePath) {
            //  Read Excel File to Json Data
            var arrayToInsert = [];
            csvtojson().fromFile(filePath).then(source => {
                // Fetching the all data from each row
                for (var i = 0; i < source.length; i++) {
                    console.log(source[i]["name"])
                    var singleRow = {
                        name: source[i]["name"],
                        rate: source[i]["rate"],
                        unit: source[i]["unit"],
                        department: source[i]["department"],
                        taskDependency: source[i]["taskDependency"],
                        instruction: source[i]["instruction"],
                        startDate: source[i]["startDate"],
                        endDate: source[i]["endDate"],
                        checkList: source[i]["checkList"],
                        status: "Created",
                        company: req.admin.company,
                        timeDuration: source[i]["timeDuration"],
                    };
                    arrayToInsert.push(singleRow);
                }
                //inserting into the table student
                Task.insertMany(arrayToInsert).then(function () {
                    // console.log("Successfully saved defult items to DB");
                    res.status(200).json({ success: true, message: "Successfully bulk Upload" })
                }).catch(function (err) {
                    // console.log(err);
                    res.status(400).json({ success: false, message: err })
                });
            });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }

}
// exports.bulkUpload = async (req, res) => {
//     const file = req.file
//     const workbook = xlsx.readFile(file.path);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });


//     await Task.insertMany(data).then(function () {
//        res.status(200).json("Successfully saved defult items to DB");
//       })
//       .catch(function (err) {
//         console.log(err);
//         res.status(500).json({message:err})
//       });

// }

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