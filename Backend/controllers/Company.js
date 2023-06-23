const Company = require("../Models/Admin/Company");
const Admin = require("../Models/Admin/Login");
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
        let dept = await Department.findOne({ department, company: req.admin.company })

        if (dept) {
            return res.status(400).json({ success: false, message: "Department already Exists..." })
        }
        dept = await Department.create({ department, company: admin.company })

        await admin.department.push(dept._id)
        await admin.save();

        res.status(200).json({ success: true, message: "Successfully Added...." });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getDept = async (req, res) => {
    try {
        const dept = await Admin.findById(req.admin._id).populate("department")
        res.send(dept.department)
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};

exports.DeleteDept = async (req, res) => {
    try {
        const dept = await Department.findById("648bd82bfbd18a0066865ad4")

        const admin = await Admin.findById(req.admin._id)
        if (admin.department.includes(dept._id)) {
            const index = admin.department.indexOf(dept._id);

            admin.department.splice(index, 1);
            await admin.save();
            await dept.remove();

            return res
                .status(400)
                .json({ success: false, message: "Department Deleted.. " });
        } else
            res
                .status(200)
                .json({ success: false, message: "subField not found...." });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addSubDept = async (req, res) => {

    try {

        const { department, subDept, unit, rate } = req.body
        const dept = await Department.findOne({ company: req.admin.company, department })
        const data = {
            subDept,
            unit,
            rate
        }
        let subDeptExits = false
        dept.subDepts.forEach((item) => {
            if (item.subDept.toString() === subDept.toString()) {
                subDeptExits = true
            }
        });
        if (subDeptExits) {
            return res
                .status(400)
                .json({ success: false, message: "Sub-Department already exists.. " });
        }
        dept.subDepts.push(data)
        await dept.save();

        res.status(201)
            .json({ success: false, message: "Sub-Department Added..." })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getSubDept = async (req, res) => {
    try {
        const { department } = req.body
        const dept = await Department.findOne({ company: req.admin.company, department })
        res.send(dept.subDepts)
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};

exports.getSubDeptDetail = async (req, res) => {
    try {
        const { department, subDept } = req.body
        if (!department || !subDept) {
            return res
                .status(400)
                .json({ success: false, message: " Something went wrong " });
        }

        const dept = await Department.findOne({ company: req.admin.company, department })
        let indexNO = ""
        dept.subDepts.forEach((item, index) => {
            if (item.subDept.toString() === req.body.subDept.toString()) {
                indexNO = index
            }
        })
        res.send(dept.subDepts[indexNO])
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.editSubDept = async (req, res) => {
    try {
        const { department, subDept, unit, rate } = req.body
        const dept = await Department.findOne({ company: req.admin.company, department })
        const data = {
            subDept,
            unit,
            rate
        }
        let subDeptexists = false
        let indexNO = ""
        dept.subDepts.forEach((item, index) => {
            if (item._id.toString() === req.params.id.toString()) {
                subDeptexists = true
                indexNO = index
            }
        })
        if (subDeptexists) {
            dept.subDepts[indexNO].subDept = subDept
            dept.subDepts[indexNO].unit = unit
            dept.subDepts[indexNO].rate = rate

            dept.save();
            res.status(201)
                .json({ success: false, message: "Sub-Department Updated..." })

        } else {
            res.status(201)
                .json({ success: false, message: "Sub-Department Not Found" })
        }


    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteSubDept = async (req, res) => {
    try {
        const { department } = req.body
        const dept = await Department.findOne({ company: req.admin.company, department })

        let subDeptexists = false
        let indexNO = ""
        dept.subDepts.forEach((item, index) => {
            if (item._id.toString() === req.params.id.toString()) {
                subDeptexists = true
                indexNO = index
            }
        })
        if (subDeptexists) {
            dept.subDepts.splice(indexNO, 1)
            dept.save();

            res.status(201)
                .json({ dept, success: false, message: "Sub-Department Deleted..." })

        } else {
            res.status(201)
                .json({ success: false, message: "Sub-Department Not Found" })
        }


    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// exports.delSubField = async (req, res) => {
//     try {
//         const { company, field, subField } = req.body;
//         const dept = await Department.findOne({ company, field });
//         if (!dept) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Department not found... " });
//         }

//         if (dept.subField.includes(subField)) {
//             const index = dept.subField.indexOf(subField);
//             dept.subField.splice(index, 1);
//             await dept.save();
//             return res
//                 .status(400)
//                 .json({ dept, success: false, message: "subField Deleted.. " });
//         } else
//             res
//                 .status(200)
//                 .json({ success: false, message: "subField not found...." });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error });
//     }
// };

exports.getFieldP = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ Success: false, message: error });
    }
};




