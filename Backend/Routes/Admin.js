const express = require('express')
const Admin = require('../Models/Admin/Login')
const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const admin = await Admin.find({ email: req.body.email })
        if(admin){
            return res.status(400).json({
                success:false,
                message:"Admin already exists"
            })
        }
        admin = await Admin.create(req.body)


        res.status(500).json({
            success: true,
            admin
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

})




module.exports = router