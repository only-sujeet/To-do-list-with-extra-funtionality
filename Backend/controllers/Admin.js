const Company = require("../Models/Admin/Company");
const Admin = require("../Models/Admin/Login");

exports.adminRegister = async (req, res) => {
    try {
        const { company, email, password } = req.body
        const admin = await Admin.findOne({ email });
        const newCompany = await Admin.findOne({ company });

        if (admin) {
            return res.status(400).json({ success: false, message: "admin already exists....." })
        }

        if (newCompany) {
            return res.status(400).json({ success: false, message: "Company name already exists....." })
        }

        const newAdmin = await Admin.create({ email, password, company })
        newAdmin.save();

        res.status(201).json({ success: true, message: "Successfully Registered", admin })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        let admin = await Admin.findOne({ email }).select("+password");

        if (!admin) {
            return res.status(400).json({ success: false, message: "!! Invalid Email" })
        }

        const isMatch = await admin.matchPassword(password)

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "!! Invalid Password" })

        }
        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        const token = await admin.generateToken()
        res.status(200).cookie("Token", token, option).json({ success: true, message: "Login Success", token })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.myProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id).populate("department")
        res.send(admin)
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};
exports.adminLogout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("Token", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({ success: true, message: "Logout" })
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }

}