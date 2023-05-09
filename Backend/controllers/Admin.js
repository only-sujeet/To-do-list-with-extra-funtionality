const Admin = require("../Models/Admin/Login");

exports.adminRegister = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res
                .status(400)
                .json({ sucsess: false, message: "admin already exists....." })
        }

        admin = await Admin.create({ name, email, phone, password })
        admin.save();

        res.status(201).json({
            sucsess: true,
            admin
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        let admin = await Admin.findOne({ email }).select("+password");

        if (!admin) {
            return res
                .status(400)
                .json({ success: false, message: "!! Invalid Email" })
        }

        const isMatch = await admin.matchPassword(password)

        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: "!! Invalid Password" })

        }
        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        const token = await admin.generateToken()
        res.status(200).cookie("adminToken", token, option).json({ success: true, message: "Login Success", token })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }


}

