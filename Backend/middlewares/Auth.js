const Admin = require("../Models/Admin/Login");
const jwt = require('jsonwebtoken');

exports.isAuthenticatedAdmin = async (req, res, next) => {
    try {
        const { adminToken } = req.cookies;
        if (!adminToken) {
            return res
                .status(401)
                .res({ success: false, message: " Please login first.." })
        }

        const decode = jwt.verify(adminToken, process.env.SECRET_KEY)
        req.admin = await Admin.findById(decode._id)
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


