
const People = require('../Models/Admin/People');

// For add People
exports.addPeople = async (req, res) => {
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
            message: "Successfully Added Profile.....",
            // peo:peo
            Image: Image,
            object: company
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// for get people
exports.getPeople = async (req, res) => {
    try {
        const request = await People.find({ status: undefined })
        if (!request) {
            return res.status(404).json({ success: false, message: "People Not found" })
        }
        else {
            res.status(200).json(request)
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//  for delete people
exports.deletePeople = async (req, res) => {

    try {
        const request = await People.findById(req.params._id)
        if (!request) {
            return res.status(400).json({ message: "People Not Found...." })
        }
        const reject = await People.deleteOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            message: "Successfully Deleted Profile...."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// for block people
exports.blockPeople = async (req, res) => {
    try {
        const people = await People.findById(req.params.id)
        if (!people) {
            res.status(401).json({
                success: false,
                message: "People Not Found"
            })
        }
        people.status = "block"
        await people.save();
        res.status(200).
            json({
                success: true,
                message: "Successfully Blocked...",
                people:people
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// for get block people
exports.getBlockPeople = async (req, res) => {
    try {
        const request = await People.find({ status: "block" })
        if (!request) {
            return res.status(404).json({ success: false, message: "People Not found" })
        }
        else {
            res.status(200).json(request)
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// for unblock people
exports.unBlockPeople = async (req,res) => { 
    try {
        const people = await People.findById(req.params.id)
        if (!people) {
            res.status(401).json({
                success: false,
                message: "People Not Found"
            })
        }
        people.status = undefined
        await people.save();
        res.status(200).
            json({
                success: true,
                message: "Successfully Unblocked...",
                people:people
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
 }