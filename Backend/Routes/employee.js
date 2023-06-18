const express = require('express')
const { isAuthenticatedEmp } = require('../middlewares/Auth')
const { getAssignedTask } = require('../controllers/Employee')
const router = express.Router()



router.route("/getAssignedTask").get(isAuthenticatedEmp, getAssignedTask)

module.exports = router 