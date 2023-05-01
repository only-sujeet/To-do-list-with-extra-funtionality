const express = require('express')
const { adminRegister, adminLogin } = require('../controllers/Admin')
const { addCompany, GetCompany,  addField, getField } = require('../controllers/Company')
const { addPeople, getPeople } = require('../Controllers/People')
const { isAuthenticatedAdmin } = require('../middlewares/Auth')
const router = express.Router()
const multer = require('multer')

// for multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'file') {
            cb(null, 'Image')
        } else {
            cb(new Error('Invalid fieldname'), null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })

// Routes
router.route("/register").post(adminRegister)
router.route("/login").post(adminLogin)
router.route("/addCompany").post(addCompany)
router.route("/getCompany").post( GetCompany)
router.route("/addField").post( addField)
router.route("/getField/:id").post( getField)
router.route("/addPeople").post( upload.single('file'), addPeople)
router.route("/getPeople").get( getPeople)

module.exports = router