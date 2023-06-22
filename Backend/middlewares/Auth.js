const Admin = require("../Models/Admin/Login");
const jwt = require('jsonwebtoken');
const People = require("../Models/Admin/People");

exports.isAuthenticatedAdmin = async (req, res, next) => {
    try {

        const { Token } = req.cookies;
        if (!Token) {
            return res
                .status(401)
                .json({ success: false, message: " Please login first.." })
        }

        const decode = jwt.verify(Token, process.env.SECRET_KEY)
        req.admin = await Admin.findById(decode._id)
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
exports.isAuthenticatedEmp = async (req, res, next) => {
    try {

        const { EmpToken } = req.cookies;
        if (!EmpToken) {
            return res
                .status(401)
                .json({ success: false, message: " Please login first.." })
        }

        const decode = jwt.verify(EmpToken, process.env.SECRET_KEY)
        req.emp = await People.findById(decode._id)
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


