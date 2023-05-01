const express = require('express')
const { adminRegister, adminLogin } = require('../controllers/Admin')
const { addCompany, GetCompany,  addField, getField } = require('../controllers/Company')
const { addPeople } = require('../Controllers/People')
const { isAuthenticatedAdmin } = require('../middlewares/Auth')
const router = express.Router()


router.route("/register").post(adminRegister)
router.route("/login").post(adminLogin)
router.route("/addCompany").post(addCompany)
router.route("/getCompany").post( GetCompany)
router.route("/addField").post( addField)
router.route("/getDept").post( getField)

module.exports = router