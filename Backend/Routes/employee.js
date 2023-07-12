const express = require('express')
const Multer = require("multer")
const { isAuthenticatedEmp } = require('../middlewares/Auth')
const { getAssignedTask, AcceptTask, submitDoc, rejectTask } = require('../controllers/Employee')
const { uploadfile } = require('../controllers/Upload')
const { getAllTask } = require('../controllers/Task')
const router = express.Router()

const upload = Multer({
    storage: Multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, `Image`);
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

router.route("/getAssignedTask").get(isAuthenticatedEmp, getAssignedTask)
router.route("/acceptTask/:id").get(isAuthenticatedEmp, AcceptTask)
router.route("/submitDoc/:id").post( isAuthenticatedEmp,upload.single('file'), submitDoc)
router.route("/upload").post(upload.single('file'), uploadfile)

router.route("/getAllTask").get(isAuthenticatedEmp, getAllTask)
router.route("/rejectTask/:id").post(isAuthenticatedEmp, rejectTask)
module.exports = router 