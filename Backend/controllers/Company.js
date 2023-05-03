const Company = require("../Models/Admin/Company")

exports.addCompany = async (req, res) => {

    try {
        const { company } = req.body
        let comp = await Company.findOne({ company })
        if (comp) {
            return res
                .status(400)
                .json({ success: false, message: "Company already exists....." })
        }
        comp = await Company.create({ company })
        res.status(200).json({success: true, message: "Successfully Added...."} )

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
exports.GetCompany = async (req, res) => {
    try {

        const comp = await Company.find({})
        if (comp < 0) {
            return res
                .status(404)
                .json({ success: false, message: "Company not found.." })
        }

        res.send(comp)

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.deleteCompany = async (req,res) =>{
    try {
        const request = await Company.findById(req.params._id)
        if (!request) {
            return res.status(400).json({success:false, message: "Company Not Found...." })
        }
        const reject = await Company.deleteOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            message: "Successfully Deleted Company...."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
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
                .json({ success: false, message: "Company not found... " })
        } if (fie) {
            return res
                .status(400)
                .json({ success: false, message: "Field name is already exists... " })
        }
        comp.field.push(field)
        await comp.save();
        res.status(200).json({success: true, message: "Successfully Added...."} )
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


exports.getField = async (req, res) => { 
    try {

         const { company } = req.body
         console.log(company)
        let comp = await Company.findOne({company})
        if (!comp) {
            return res
                .status(400)
                .json({ success: false, message: "Company Not Found.. " })
        }
        res.send(comp.field)

    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

exports.getFieldP = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ Success : false, message:error })
    }
}
