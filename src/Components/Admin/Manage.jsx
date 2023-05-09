import React from 'react'
import { makeStyles, } from '@material-ui/core'
import AdminTopbar from '../Global/AdminTopbar';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup,  Typography,  } from '@mui/material';
import Header from '../Global/Header';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Addcompanyd from './Addcompanyd';
import AddDepartment from './AddDepartment';
import Subdepartment from './Subdepartment';

const usestyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

    },
    toolbar: theme.mixins.toolbar,
}))



const Manage = () => {
    const classes = usestyles();
    const [status, setStatus] = useState(1)
    const handler = (status) => {
        setStatus(status)
    }

    // for company
   

   
    return (

        <>
            <AdminTopbar />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Box m="15px">
                    <Box display='flex' justifyContent='space-between' alignItems="center"  >
                        <Header title="Manage" subtitle="Welcome to Manage page" />
                    </Box>
                    <Box justifyContent="center" alignItems="center" display="flex" mt="15px">
                        <FormControl>
                            <RadioGroup row aria-label="categories" defaultValue="company" name='categories group'>

                                <FormControlLabel value='company' label={<Typography variant="h4" color="initial">Company</Typography>} control={<Radio onClick={(e) => { handler(1) }} />}></FormControlLabel>
                                <FormControlLabel value='department' label={<Typography variant="h4" color="initial">Department</Typography>} control={<Radio onClick={(e) => { handler(2) }} />}></FormControlLabel>
                                <FormControlLabel value='sub-department' label={<Typography variant="h4" color="initial">Sub-Department</Typography>} control={<Radio onClick={(e) => { handler(3) }} />}></FormControlLabel>
                            </RadioGroup>
                        </FormControl>

                    </Box>
                    <Box m="40px auto" width={{ lg: "40%", sm: "100%", md: "60%", xs: "80%"   }}>
                        {
                            status === 1 && <Addcompanyd />    
                            
                        }
                        {
                            status === 2 && <AddDepartment/>
                        }
                        {
                            status === 3 && <Subdepartment/>
                        }
                    </Box>

                </Box>
                
            </div>
        </>
    )
}

export default Manage