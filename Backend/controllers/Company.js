const Company = require("../Models/Admin/Company");
const Department = require("../Models/Admin/dept");

exports.addCompany = async (req, res) => {
    try {
        const { company } = req.body;

        let comp = await Company.findOne({ company });
        if (comp) {
            return res
                .status(400)
                .json({ success: false, message: "Company already exists....." });
        }
        comp = await Company.create({ company });
        res.status(200).json({ success: true, message: "Successfully Added...." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.GetCompany = async (req, res) => {
    try {
        const comp = await Company.find({});
        if (comp < 0) {
            return res
                .status(404)
                .json({ success: false, message: "Company not found.." });
        }

        res.send(comp);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const request = await Company.findById(req.params._id);
        if (!request) {
            return res
                .status(400)
                .json({ success: false, message: "Company Not Found...." });
        }
        const reject = await Company.deleteOne({ _id: req.params._id });
        res.status(200).json({
            success: true,
            message: "Successfully Deleted Company....",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.addDept = async (req, res) => {
    try {
        const { department } = req.body
        const admin = req.admin
        let dept = await Department.findOne({ department })

        if(dept){
            return res
            .status(400)
            .json({success:false , message:"Department already Exists..." })
        }
        dept = await Department.create({ department, company: admin.company })

        await admin.department.push(dept._id)
        await admin.save();

        res.status(200).json({ success: true, message: "Successfully Added...." });
        console.log(admin)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getField = async (req, res) => {
    try {
        const { company } = req.body;
        console.log(company);
        let comp = await Company.findOne({ company }).populate("field");
        if (!comp) {
            return res
                .status(400)
                .json({ success: false, message: "Company Not Found.. " });
        }
        res.send(comp.field);
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};

exports.addSubField = async (req, res) => {
    try {
        const { company, field, subField } = req.body;
        const dept = await Department.findOne({ company, field });
        if (!dept) {
            return res
                .status(400)
                .json({ success: false, message: "Department not found... " });
        }
        if (dept.subField.includes(subField)) {
            return res
                .status(400)
                .json({ success: false, message: "subField Already Exists.." });
        }
        dept.subField.push(subField);
        await dept.save();
        res.status(200).json({ success: true, message: "Successfully Added...." });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};
exports.getSubField = async (req, res) => {
    try {
        const { company, field } = req.body;
        const dept = await Department.findOne({ company, field });
        if (!dept) {
            return res
                .status(400)
                .json({ success: false, message: "Department not found... " });
        }

        res.status(200).json(dept.subField);
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};
exports.delSubField = async (req, res) => {
    try {
        const { company, field, subField } = req.body;
        const dept = await Department.findOne({ company, field });
        if (!dept) {
            return res
                .status(400)
                .json({ success: false, message: "Department not found... " });
        }

        if (dept.subField.includes(subField)) {
            const index = dept.subField.indexOf(subField);
            dept.subField.splice(index, 1);
            await dept.save();
            return res
                .status(400)
                .json({ dept, success: false, message: "subField Deleted.. " });
        } else
            res
                .status(200)
                .json({ success: false, message: "subField not found...." });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};

exports.getFieldP = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ Success: false, message: error });
    }
};




