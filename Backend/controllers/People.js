
const multer = require('multer');
const People = require('../Models/Admin/People');

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
exports.addPeople = upload.single('file'), async (req, res) => {
    try {
        // const {company,field,firstName,middleName,lastName,email,dob,age,mobileno,altmobileno,address1,address2,Image} = req.body
        const Image = req.file['file'][0].filename
        // const data = req.body.data
        // const object = JSON.parse(data)
        // const object = req.body
        const { company, field, firstName, middleName, lastName, email, dob, age, mobileno, altmobileno, address1, address2 } = req.body
        // const peo = new People({ company, field, firstName, middleName, lastName, email, dob, age, mobileno, altmobileno, address1, address2, Image })
        // await peo.save();
        res.status(200).json({
            success: true,
            message: "Successfully Added Profile",
            // peo:peo
            Image: Image,
            object:company
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}