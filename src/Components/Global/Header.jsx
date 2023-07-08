
import { Box, Typography } from '@mui/material'
import React from 'react'


const Header = ({ title, subtitle }) => {
    return (
        <Box  mb="30px" fontFamily="Yrsa"  >
            <Typography variant="h2" color="lightskyblue" fontWeight="bold" sx={{ mb: "10px" }}>{title}</Typography>
            <Typography variant="h5" color="secondary" >{subtitle}</Typography>
        </Box>
    )
}

export default Header