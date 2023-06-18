const express = require('express')
const { adminRegister, adminLogin, myProfile } = require('../controllers/Admin')
const { addCompany, GetCompany, deleteCompany, delSubField, addDept, getDept, addSubDept, getSubDept } = require('../controllers/Company')
const { addPeople, getPeople, deletePeople, blockPeople, getBlockPeople, unBlockPeople } = require('../controllers/People')
const { isAuthenticatedAdmin } = require('../middlewares/Auth')
const router = express.Router()
const multer = require('multer')
const { addTask, getTask, getEmpByDept, assignTask } = require('../controllers/Task')
const { EmpLogin } = require('../controllers/Employee')


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
router.route("/addField").post(isAuthenticatedAdmin, addDept)
router.route("/getDept").get(isAuthenticatedAdmin, getDept)
router.route("/addSubDept").post(isAuthenticatedAdmin, addSubDept)
router.route("/getSubDept").post(isAuthenticatedAdmin, getSubDept)
router.route("/delSubField").post(delSubField)
router.route("/addPeople").post(upload.single('file'), isAuthenticatedAdmin, addPeople)
router.route("/getPeople").get(isAuthenticatedAdmin, getPeople)
router.route("/deletePeople/:_id").delete(deletePeople)
router.route("/blockPeople/:id").post(blockPeople)
router.route("/unBlockPeople/:id").post(unBlockPeople)
router.route("/getBlockPeople").get(getBlockPeople)
router.route("/addTask").post(isAuthenticatedAdmin, addTask)
router.route("/getTask").get(isAuthenticatedAdmin,getTask)
router.route("/elogin").post(EmpLogin)
router.route("/getEmpByDept").post(isAuthenticatedAdmin, getEmpByDept)
router.route("/assignTask").post(isAuthenticatedAdmin, assignTask)




router.route("/myProfile").get(isAuthenticatedAdmin, myProfile)

module.exports = router 