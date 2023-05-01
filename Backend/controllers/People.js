
const People = require('../Models/Admin/People');


exports.addPeople =  async (req, res) => {
    try {
        // const {company,field,firstName,middleName,lastName,email,dob,age,mobileno,altmobileno,address1,address2,Image} = req.body
        const Image = (req.file) ? req.file.filename : null
         const data = req.body.data
         const object = JSON.parse(data)
       
        const { company, field, firstName, middleName, lastName, email, dob, age, mobileno, altmobileno, address1, address2 } = object
         const peo = new People({ company, field, firstName, middleName, lastName, email, dob, age, mobileno, altmobileno, address1, address2, Image })
         await peo.save();
        // console.log("hello")
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
// exports.addPeople =  async (req, res) => {
//     try {
//         // const {company,field,firstName,middleName,lastName,email,dob,age,mobileno,altmobileno,address1,address2,Image} = req.body
//         // const Image = req.file['file'][0].filename
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
//             // Image: Image,
//             // object:company
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }