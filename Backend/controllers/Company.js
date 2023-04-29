const Company = require("../Models/Admin/Company")

exports.addCompany = async (req, res) => {
    try {
      const company  = req.body
    company = await Company.find({name:name})

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
}