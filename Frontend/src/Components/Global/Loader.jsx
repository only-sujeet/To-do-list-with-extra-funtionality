import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'

const Loader = () => {
    return (
        <Box sx={{ width:"100vh", display: 'flex' ,justifyContent:"center" }}>
            <CircularProgress />
        </Box>
    )
}

export default Loader
