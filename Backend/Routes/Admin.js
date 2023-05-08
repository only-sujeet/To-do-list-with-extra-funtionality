const express = require('express')
const { adminRegister, adminLogin } = require('../controllers/Admin')
const { addCompany, GetCompany,  addField, getField, deleteCompany, addSubField } = require('../controllers/Company')
const { addPeople, getPeople, deletePeople, blockPeople, getBlockPeople, unBlockPeople } = require('../Controllers/People')
const { isAuthenticatedAdmin } = require('../middlewares/Auth')
const router = express.Router()
const multer = require('multer')
const { addTask, getTask } = require('../Controllers/Task')

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
router.route("/deleteCompany/:_id").delete( deleteCompany)
router.route("/addField").post( addField)
router.route("/getDept").post( getField)
router.route("/addSubField").post( addSubField)
router.route("/addPeople").post( upload.single('file'), addPeople)
router.route("/getPeople").get( getPeople)
router.route("/deletePeople/:_id").delete( deletePeople)
router.route("/blockPeople/:id").post( blockPeople)
router.route("/unBlockPeople/:id").post( unBlockPeople)
router.route("/getBlockPeople").get( getBlockPeople)
router.route("/addTask").post(addTask)
router.route("/getTask").get(getTask)

module.exports = router