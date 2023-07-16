const People = require("../Models/Admin/People");
const { sendEmail } = require("../middlewares/sendEmail");
const ApiFeature = require("../utils/apiFeature");

// For add People
exports.addPeople = async (req, res) => {
    try {

        // Define the length of the password
        const length = 8; // You can adjust the length as needed
        // Function to generate a random password
        function generatePassword(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let password = '';

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                password += characters.charAt(randomIndex);
            }
            return password;
        }
        // Generate a random password

        const password = generatePassword(length);
        const object = JSON.parse(req.body.data)
        const { department, subDept, firstName, middleName, lastName, email, dob, doj, age, mobileno, altmobileno, address1, address2, adharno, panno, acNo, ifscCode, upiId } = object

        const Image = (req.file) ? req.file.filename : null
        //   for finding email
        const findEmail = await People.findOne({ email })
        if (findEmail) {
            return res.status(400).json({ success: false, message: "Email already exists....." })
        }
        const peo = new People({ email, password, company: req.admin.company, department, subDept, firstName, middleName, lastName, age, dob, adharno, doj, panno, mobileno, altmobileno, address1, address2, Image, acNo, ifscCode, upiId })
        await peo.save();

        const message = `Dear ${peo.firstName} ${peo.middleName} ${peo.lastName}\n\n Welcome to INK Management System \n\n Your Username: ${peo.email}\n Your Password: ${password} \n\n\n Thank You`

        res.status(200).json({
            peo,
            success: true,
            message: "Profile Created...",
        });

        await sendEmail({
            email: peo.email,
            subject: "Profile created...",
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
