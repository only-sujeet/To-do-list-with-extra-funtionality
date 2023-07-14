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


const deleteFile = (filePath) => {
    fs.unlink(filePath, () => {
        console.log("file deleted");
    });
};

exports.uploadfile = async (req, res,) => {
    try {
        const file = req.file
        if (!file) {
            res.status(500).json({ success: false, message: "Please selcet File first", });
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
            // console.error('Error uploading file:', error);
            res.status(500).json({ success: false, message: "Failed to upload file", });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to upload file", });
    }


}

// for excel bulk upload 
exports.bulkUpload = async (req, res) => {
    try {
        if(!req.file){
           return res.status(400).json({ success: false, message: "Failed to upload file", });
        }
        importFile('uploads/' + req.file.filename);
        function importFile(filePath) {
            //  Read Excel File to Json Data
            var arrayToInsert = [];
            csvtojson().fromFile(filePath).then(source => {
                // Fetching the all data from each row
                for (var i = 0; i < source.length; i++) {
                    // console.log(source[i]["Name"])
                    var singleRow = {
                        name: source[i]["Name"],
                        rate: source[i]["Rate"],
                        unit: source[i]["Unit"],
                        department: source[i]["Department"],
                        subDepartment: source[i]["Sub-Department"],
                        taskDependency: source[i]["TaskDependency"],
                        instruction: source[i]["Instruction"],
                        startDate: source[i]["StartDate"],
                        endDate: source[i]["EndDate"],
                        timeDuration: source[i]["TimeDuration"],
                        // checkList: for( var j=0; j < source[i]["CheckList"]; j++){ console.log("source")  },
                        checkList: source[i]["CheckList"],
                        status: "Created",
                        company: req.admin.company,
                    };
                    arrayToInsert.push(singleRow);
                }
                //inserting into the table student
                Task.insertMany(arrayToInsert).then(function () {
                    // console.log("Successfully saved defult items to DB");
                    deleteFile(req.file.path);
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


