const People = require("../Models/Admin/People");
const { sendEmail } = require("../middlewares/sendEmail");
const ApiFeature = require("../utils/apiFeature");

// For add People
exports.addPeople = async (req, res) => {
    try {
        const object = JSON.parse(req.body.data)
        const { email, password, department, subDept, firstName, middleName, lastName, age, dob, adharno, panno, mobileno, altmobileno, address1, address2 } = object
        const Image = (req.file) ? req.file.filename : null
        //   for finding email
        const findEmail = await People.findOne({ email })
        if (findEmail) {
            return res.status(400).json({ success: false, message: "Email already exists....." })
        }
        const peo = new People({ email, password, company: req.admin.company, department, subDept, firstName, middleName, lastName, age, dob, adharno, panno, mobileno, altmobileno, address1, address2, Image })
        await peo.save();

        const message = `Dear ${peo.firstName} ${peo.middleName} ${peo.lastName}\n\n Your Username: ${peo.email}\n Your Password ${peo.password} \n\n\n Thank You`

        res.status(200).json({
            success: true,
            message: "Profile Created...",
        });

        await sendEmail({
            email: peo.email,
            subject: req.admin.company,
            message
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// for get people
exports.getPeople = async (req, res) => {
    try {

        const apiFeature = new ApiFeature(People.find(), req.query, req.admin.company).search()
        const request = await apiFeature.query
        if (!request) {
            return res
                .status(404)
                .json({ success: false, message: "People Not found" });
        } else {
            res.status(200).json(request);
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




//  for delete people
exports.deletePeople = async (req, res) => {
    try {
        const request = await People.findById(req.params._id);
        if (!request) {
            return res.status(400).json({ message: "People Not Found...." });
        }
        const reject = await People.deleteOne({ _id: req.params._id });
        res.status(200).json({
            success: true,
            message: "Successfully Deleted Profile....",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// for block people
exports.blockPeople = async (req, res) => {
    try {
        const people = await People.findById(req.params.id);
        if (!people) {
            res.status(401).json({
                success: false,
                message: "People Not Found",
            });
        }
        people.status = "block";
        await people.save();
        res.status(200).json({
            success: true,
            message: "Successfully Blocked...",
            people: people,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// for get block people
exports.getBlockPeople = async (req, res) => {
    try {
        const request = await People.find({ status: "block" });
        if (!request) {
            return res
                .status(404)
                .json({ success: false, message: "People Not found" });
        } else {
            res.status(200).json(request);
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// for unblock people
exports.unBlockPeople = async (req, res) => {
    try {
        const people = await People.findById(req.params.id);
        if (!people) {
            res.status(401).json({
                success: false,
                message: "People Not Found",
            });
        }
        people.status = undefined;
        await people.save();
        res.status(200).json({
            success: true,
            message: "Successfully Unblocked...",
            people: people,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
