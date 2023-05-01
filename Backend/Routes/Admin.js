const express = require('express')
const { adminRegister, adminLogin } = require('../controllers/Admin')
const { addCompany, GetCompany,  addField, getField } = require('../controllers/Company')
const { addPeople } = require('../Controllers/People')
const { isAuthenticatedAdmin } = require('../middlewares/Auth')
const router = express.Router()
const multer = require('multer')
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

router.route("/register").post(adminRegister)
router.route("/login").post(adminLogin)
router.route("/addCompany").post(addCompany)
router.route("/getCompany").post( GetCompany)
router.route("/addField").post( addField)
router.route("/getField/:id").post( getField)
router.route("/addPeople").post( upload.single('file'), addPeople)
// router.post('/addPeople',  upload.single('file'), async (req, res) => {
//     try {
//         // const {company,field,firstName,middleName,lastName,email,dob,age,mobileno,altmobileno,address1,address2,Image} = req.body
//         const Image =(req.file) ? req.file.filename : null
//         // const data = req.body.data
//         // const object = JSON.parse(data)
//         // const object = req.body
//         // const {company} = res.body
//         // const { company, field, firstName, middleName, lastName, email, dob, age, mobileno, altmobileno, address1, address2 } = req.body
//         // const peo = new People({ company, field, firstName, middleName, lastName, email, dob, age, mobileno, altmobileno, address1, address2, Image })
//         // await peo.save();
//         // console.log("hello")
//         res.status(200).json({
//             success: true,
//             message: "Successfully Added Profile",
//             // peo:peo
//              Image: Image,
//             // object:company
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// })
module.exports = router