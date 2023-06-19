const express = require('express')
const multer = require("multer")
const { isAuthenticatedEmp } = require('../middlewares/Auth')
const { getAssignedTask, AcceptTask, submitDoc } = require('../controllers/Employee')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'file') {
            cb(null, 'Document')
        } else {
            cb(new Error('Invalid fieldname'), null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
const upload = multer({ storage: storage })


router.route("/getAssignedTask").get(isAuthenticatedEmp, getAssignedTask)
router.route("/acceptTask/:id").get(isAuthenticatedEmp, AcceptTask)
router.route("/submitDoc/:id").post(upload.single('file'), isAuthenticatedEmp, submitDoc)


module.exports = router 