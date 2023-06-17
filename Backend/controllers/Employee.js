const People = require("../Models/Admin/People");

exports.EmpLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        let emp = await People.findOne({ email }).select("+password");

        if (!emp) {
            return res.status(400).json({ success: false, message: "!! Invalid Email" })
        }

        const isMatch = await People.find({ password})
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "!! Invalid Password" })

        }
        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        const token = await emp.generateToken()
        res.status(200).cookie("EmpToken", token, option).json({ success: true, message: "Login Success", token })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

exports.empProfile = async (req, res) => {
    try {
         const emp = await People.findById(req.emp._id)
        res.send(emp)

    } catch (error) { 
        res.status(500).json({ success: false, message: error });
    }
};
