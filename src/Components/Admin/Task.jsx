import React from 'react'
import { makeStyles, } from '@material-ui/core'
import AdminTopbar from '../Global/AdminTopbar';
import { Box } from '@mui/material';
import Header from '../Global/Header';


const usestyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

    },
    toolbar: theme.mixins.toolbar,
}))


const Task = () => {
    const classes = usestyles();
    return (
        <>
            <AdminTopbar />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Box m="15px">
                <Box display='flex' justifyContent='space-between' alignItems="center"  >
                <Header title="Task" subtitle="Welcome to Task page" />
                </Box>
                </Box>
            </div>
        </>
    )
}

export default Task