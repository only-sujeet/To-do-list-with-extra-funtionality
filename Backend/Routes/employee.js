const express = require('express')
const { isAuthenticatedEmp } = require('../middlewares/Auth')
const { getAssignedTask, AcceptTask } = require('../controllers/Employee')
const router = express.Router()



router.route("/getAssignedTask").get(isAuthenticatedEmp, getAssignedTask)
router.route("/acceptTask/:id").get(isAuthenticatedEmp, AcceptTask)

module.exports = router 