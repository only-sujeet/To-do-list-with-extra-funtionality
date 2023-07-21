import React from 'react'
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Toolbar, Typography, } from '@mui/material';
import Header from '../Global/Header';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AddDepartment from './AddDepartment';
import Subdepartment from './Subdepartment';
import { getAdminProfile } from '../../Redux/Action/Admin';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminRoute from '../../Protected Route/AdminRoute';
import AdminTopbar from '../Global/AdminTopbar';


const drawerWidth = 240;




const Manage = () => {

    const dispatch = useDispatch()
   
    const [status, setStatus] = useState(2)
    const handler = (status) => {
        setStatus(status)
    }

    // for company
    useEffect(() => {
        dispatch(getAdminProfile())
    }, [dispatch]);

    return (
        <>
            <AdminTopbar />
            <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
               
                    <Box display='flex' justifyContent='space-between' alignItems="center" mt="20px"  >
                        <Header title="Manage" subtitle="Welcome to Manage page" />
                    </Box>
                <Box alignItems='center' justifyContent='center' display='flex' flexDirection='column'  >

                    <Box sx={{ alignItems:"center", justifyContent:"center"}}>
                        <FormControl sx={{ alignItems:"center", justifyContent:"center"}}>
                            <RadioGroup row aria-label="categories" defaultValue="department" name='categories group'>

                                <FormControlLabel value='department' label={<Typography variant="h4" color="initial">Department</Typography>} control={<Radio onClick={(e) => { handler(2) }} />}></FormControlLabel>
                                <FormControlLabel value='sub-department' label={<Typography variant="h4" color="initial">Sub-Department</Typography>} control={<Radio onClick={(e) => { handler(3) }} />}></FormControlLabel>
                            </RadioGroup>
                        </FormControl>

                    </Box>
                    <Box m="40px auto" width={{ lg: "100%", sm: "100%", md: "60%", xs: "80%" }}>

                        {
                            status === 2 && <AddDepartment />
                        }
                        {
                            status === 3 && <Subdepartment />
                        }
                    </Box>
                </Box>


            </Box>
        </>
    )
}

export default AdminRoute(Manage)