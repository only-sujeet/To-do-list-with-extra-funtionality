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


exports.addField = async (req, res) => {
    try {

        const { company, field } = req.body

        let comp = await Company.findOne({ company })
        const fie = await Company.findOne({ field })
        if (!comp) {
            return res
                .status(400)
                .json({ sucsess: false, message: "Company not found... " })
        } if (fie) {
            return res
                .status(400)
                .json({ sucsess: false, message: "Field name is already exists... " })
        }
        comp.field.push(field)
        await comp.save();
        res.send(comp)
    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
}


exports.getDepartment = async (req, res) => { 
    try {

         const { company } = req.body
         console.log(company)
        let comp = await Company.findOne({company})
        if (!comp) {
            return res
                .status(400)
                .json({ sucsess: false, message: "Company Not Found.. " })
        }
        res.send(comp.field)

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error })
    }
}


