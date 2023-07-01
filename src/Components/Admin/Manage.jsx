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
import Topbar from '../Global/Topbar';


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
            <Topbar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Box m="15px">
                    <Box display='flex' justifyContent='space-between' alignItems="center"  >
                        <Header title="Manage" subtitle="Welcome to Manage page" />
                    </Box>
                    <Box justifyContent="center" alignItems="center" display="flex" mt="15px">
                        <FormControl>
                            <RadioGroup row aria-label="categories" defaultValue="department" name='categories group'>

                                <FormControlLabel value='department' label={<Typography variant="h4" color="initial">Department</Typography>} control={<Radio onClick={(e) => { handler(2) }} />}></FormControlLabel>
                                <FormControlLabel value='sub-department' label={<Typography variant="h4" color="initial">Sub-Department</Typography>} control={<Radio onClick={(e) => { handler(3) }} />}></FormControlLabel>
                            </RadioGroup>
                        </FormControl>

                    </Box>
                    <Box m="40px auto" width={{ lg: "50%", sm: "100%", md: "60%", xs: "80%" }}>

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

export default Manage