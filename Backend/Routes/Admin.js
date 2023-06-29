const express = require('express')
const { adminRegister, adminLogin, myProfile, adminLogout } = require('../controllers/Admin')
const { addCompany, GetCompany, deleteCompany, delSubField, addDept, getDept, addSubDept, getSubDept, DeleteDept, editSubDept, deleteSubDept, getSubDeptDetail, getSubDeptinfo } = require('../controllers/Company')
const { addPeople, getPeople, deletePeople, blockPeople, getBlockPeople, unBlockPeople } = require('../controllers/People')
const { isAuthenticatedAdmin } = require('../middlewares/Auth')
const router = express.Router()
const multer = require('multer')
const { addTask, getTask, getEmpByDept, assignTask, approveTask } = require('../controllers/Task')
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


// Routes of Admin Register And Login 

router.route("/register").post(adminRegister)
router.route("/login").post(adminLogin)
router.route("/logout").get(adminLogout)



// Routes Of Manage Department And Sub-Departmentd

router.route("/addField").post(isAuthenticatedAdmin, addDept)
router.route("/getDept").get(isAuthenticatedAdmin, getDept)
router.route("/deleteDept").delete(isAuthenticatedAdmin, DeleteDept)

router.route("/addSubDept").post(isAuthenticatedAdmin, addSubDept)
router.route("/getSubDept").post(isAuthenticatedAdmin, getSubDept)
router.route("/getSubDeptDetail").post(isAuthenticatedAdmin, getSubDeptDetail)
router.route("/getSubDeptinfo").post(isAuthenticatedAdmin, getSubDeptinfo)
router.route("/subDept/:id").post(isAuthenticatedAdmin, deleteSubDept)
router.route("/subDept/").put(isAuthenticatedAdmin, editSubDept)


// Routes of Manage People/Employee 

router.route("/addPeople").post(upload.single('file'), isAuthenticatedAdmin, addPeople)
router.route("/getPeople").get(isAuthenticatedAdmin, getPeople)
router.route("/deletePeople/:_id").delete(deletePeople)
router.route("/blockPeople/:id").post(blockPeople)
router.route("/unBlockPeople/:id").post(unBlockPeople)
router.route("/getBlockPeople").get(getBlockPeople)


router.route("/addTask").post(isAuthenticatedAdmin, addTask)
router.route("/getTask").get(isAuthenticatedAdmin, getTask)
router.route("/approveTask/:id").get(isAuthenticatedAdmin, approveTask)



router.route("/elogin").post(EmpLogin)
router.route("/getEmpByDept").post(isAuthenticatedAdmin, getEmpByDept)
router.route("/assignTask").post(isAuthenticatedAdmin, assignTask)




router.route("/myProfile").get(isAuthenticatedAdmin, myProfile)

module.exports = router 