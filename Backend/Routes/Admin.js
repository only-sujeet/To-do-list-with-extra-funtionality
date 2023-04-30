const express = require('express')
const { adminRegister, adminLogin } = require('../controllers/Admin')
const { addCompany, GetCompany, addDepartment, getDepartment } = require('../controllers/Company')
const { isAuthenticatedAdmin } = require('../middlewares/Auth')
const router = express.Router()


router.route("/register").post(adminRegister)
router.route("/login").post(adminLogin)
router.route("/addCompany").post(addCompany)
router.route("/getCompany").post( GetCompany)
router.route("/addDept").post( addDepartment)
router.route("/getDept/:id").post( getDepartment)

module.exports = router