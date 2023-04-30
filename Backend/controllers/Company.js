const Company = require("../Models/Admin/Company")

exports.addCompany = async (req, res) => {

    try {
        const { company } = req.body
        let comp = await Company.findOne({ company })
        if (comp) {
            return res
                .status(400)
                .json({ sucsess: false, message: "admin already exists....." })
        }
        comp = await Company.create({ company })
        res.send(comp)

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
}
exports.GetCompany = async (req, res) => {
    try {

        const comp = await Company.find({})
        if (comp < 0) {
            return res
                .status(404)
                .json({ sucsess: false, message: "company not found.." })
        }

        res.send(comp)

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
}


exports.addDepartment = async (req, res) => {
    try {

        const { company, department } = req.body
        let comp = await Company.findOne({ company })
        const dept = await Company.findOne({ department })
        if (dept) {
            return res
                .status(400)
                .json({ sucsess: false, message: "Department name already exists... " })
        }
        comp.department.push(department)
        await comp.save();
        res.send(comp)
    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
}


exports.getDepartment = async (req, res) => {
    try {

        // const { company, department } = req.body
        let comp = await Company.findById(req.params.id)
        if (!comp) {
            return res
                .status(400)
                .json({ sucsess: false, message: "Company Not Found.. " })
        }
        res.send(comp.department)

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error })
    }
}

