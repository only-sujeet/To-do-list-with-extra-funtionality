import React from 'react'
import { makeStyles, } from '@material-ui/core'
import AdminTopbar from '../Global/AdminTopbar';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Header from '../Global/Header';
import AddTask from './AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../../Redux/Action/Admin'

const usestyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

    },
    toolbar: theme.mixins.toolbar,
}))


const Task = () => {
    const classes = usestyles();
    const dispatch = useDispatch()
    const { task, loading } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getTask())
    }, [dispatch])
    console.log(task)
    return (
        <>
            <AdminTopbar />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Box m="15px">
                    <Box display='flex' justifyContent='space-between' alignItems="center"  >
                        <Header title="Task" subtitle="Welcome to Task page" />
                        <AddTask />
                    </Box>
                    {loading ? <Typography variant="h1" color="initial">Loading</Typography> :
                        <TableContainer component={Paper} sx={{ width: { xs: "285px", lg: "1200px", sm: "450px", xl: "1200px", md: "1000px" }, backgroundColor: "lightskyblue" }} >
                            <Table aria-label='a dense table' size='small'   >
                                <TableHead  >
                                    <TableRow>
                                        <TableCell>Task Name</TableCell>
                                        <TableCell>Task Descrition</TableCell>
                                        <TableCell>Agency</TableCell>
                                        <TableCell>Department</TableCell>
                                        <TableCell>Task Dependency</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Ammount</TableCell>
                                        <TableCell>Status</TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody sx={{ backgroundColor: "white" }}>

                                    {task <= 0 ?

                                        <Typography variant="body1" fullwidth color="primary" align='center' >No Task Added</Typography>
                                        : task?.map((data) => (
                                            <TableRow key={data._id}>
                                                <TableCell>{data.name}</TableCell>
                                                <TableCell>{data.description}</TableCell>
                                                <TableCell>{data.agency}</TableCell>
                                                <TableCell>{data.field}</TableCell>
                                                <TableCell>{data.taskDependency}</TableCell>
                                                <TableCell>{data.QTY}</TableCell>
                                                <TableCell>{data.amount}</TableCell>
                                                <TableCell>{data.status}</TableCell>

                                            </TableRow>
                                        ))}

                                </TableBody>
                                {/* } */}
                            </Table>
                        </TableContainer>
                    }
                </Box>
            </div>
        </>
    )
}

export default Task