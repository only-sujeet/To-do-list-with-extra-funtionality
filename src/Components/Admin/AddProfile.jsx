import { makeStyles, } from '@material-ui/core'
import { Stack, Box } from '@mui/material'
import React from 'react'
import AdminTopbar from '../Global/AdminTopbar'
import Header from '../Global/Header'
import Addcompanyd from './Addcompanyd'
import AddDepartment from './AddDepartment'
import AddPeople from './AddPeople'

const usestyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

    },
    toolbar: theme.mixins.toolbar,
}))





const AddProfile = () => {
    const classes = usestyles();
    return (
        <>
            <AdminTopbar />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Box m='15px'>
                    <Box display='flex' justifyContent='space-between' alignItems="center"  >
                        <Header title="Add Profile" subtitle="Welcome to Add Profile page" />
                        <Box display='flex'>
                            <Addcompanyd />
                            <AddDepartment />
                            <AddPeople />
                        </Box>

                    </Box>
                    <Stack direction={{ xs: 'column', sm: 'column', md: "row", lg: "row" }} justifyContent='space-evenly' alignItems='center' >

                    </Stack>
                </Box>


            </div>
        </>
    )
}

export default AddProfile