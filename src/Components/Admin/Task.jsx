import React, { useMemo } from 'react'
import { Button, Container, List, makeStyles, } from '@material-ui/core'
import AdminTopbar from '../Global/AdminTopbar';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid } from '@mui/material';
import { Button,  makeStyles, } from '@material-ui/core'
import AdminTopbar from '../Global/AdminTopbar';
import { Box } from '@mui/material';
import Header from '../Global/Header';
import AddTask from './AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../../Redux/Action/Admin'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Assign from './Assign';
import { DataGrid} from '@mui/x-data-grid';


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
    const { task } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getTask())
    }, [dispatch])

 

    const columns = useMemo(task => [
        { field: "name", headerName: "Task Name", width: 120 },
        { field: "rate", headerName: "Rate", width: 100 },
        { field: "unit", headerName: "Unit", width: 100 },
        { field: "taskDependency", headerName: "Dependency", width: 150 },
        { field: "instruction", headerName: "Instruction", width: 120 },
        { field: "startDate", headerName: "Start At", width: 150 },
        { field: "endDate", headerName: "End At", width: 120 },
        { field: "status", headerName: "Status", width: 120 },
        // { field: "_id", headerName: "ID", width: 150 },

        {
            headerName: "Action",
            width: 150,
            renderCell: (params) => <Assign name={params.row.name} startDate={params.row.startDate} EndDate={params.row.EndDate} unit={params.row.unit} taskDependency={params.row.taskDependency} id={params.row._id} instruction={params.row.instruction} rate={params.row.rate}  />,
            sortable: false,
            filterable: false
        },
    ], [])


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
                </Box>
                <Container style={{width:{lg:"100%", md:"80%", sm:"40%", xs:"20%"}}}>
                    {/* <Grid container spacing={1} maxWidth="250">
                    <Grid item lg={10}> */}


                    {task ?
                        < DataGrid
                            rows={task}
                            key={row => row._id}
                            sx={{ fontSize: "1rem", fontFamily: "sans-serif",  }}
                            columns={columns}
                            getRowId={row => row._id}

                        >

                        </DataGrid>
                        : undefined

                    }
                </Container>
                {/* </Grid>
                </Grid> */}
            </div >
        </>
    )
}

export default Task