import React, { useMemo } from 'react'
import {  makeStyles, } from '@material-ui/core'
import AdminTopbar from '../Global/AdminTopbar';
import { Box, Stack } from '@mui/material';
import Header from '../Global/Header';
import AddTask from './AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../../Redux/Action/Admin'
import { DataGrid } from '@mui/x-data-grid';
import Assign from './Assign';

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
        { field: "department", headerName: "Department", width: 100 },
        { field: "taskDependency", headerName: "Dependency", width: 150 },
        { field: "instruction", headerName: "Instruction", width: 120 },
        { field: "startDate", headerName: "Start At", width: 150 },
        { field: "endDate", headerName: "End At", width: 120 },
        { field: "status", headerName: "Status", width: 120 },
        // { field: "_id", headerName: "ID", width: 150 },

        {
            headerName: "Action",
            width: 150,
            renderCell: (params) => <Assign name={params.row.name} startDate={params.row.startDate} endDate={params.row.endDate} unit={params.row.unit} taskDependency={params.row.taskDependency} id={params.row._id} instruction={params.row.instruction} rate={params.row.rate} department={params.row.department} />,
            sortable: false,
            filterable: false
        },
    ], [])

    const options = {
        search: true,
        download: true,
        print: true,
        viewColumns: true,
        filter: true,
        filterType: "dropdown",
        // responsive,
        // tableBodyHeight,
        // tableBodyMaxHeight,
        // onTableChange: (action, state) => {
        //     console.log(action);
        //     console.dir(state);
        // }
    };
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

                    {/* <Container style={{width: { lg: "100%", md: "40%", sm: "40%", xs: "20%" } }}> */}
                    {/* <Grid container spacing={1} maxWidth="250">
                    <Grid item lg={10}> */}

                    <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

                    </Stack>
                    <div style={{
                        display: "grid",
                        width: "100%",
                        height:"50vh"
                        
                    }}>
                        
                        {task ?
                            < DataGrid
                                rows={task}
                                
                                key={row => row._id}
                                columns={columns}
                                getRowId={row => row._id}
                                options={options}
                            >

                            </DataGrid>
                            : undefined

                        }
                    </div>
                    {/* </Container> */}
                    {/* </Grid>
                </Grid> */}
                </Box>
            </div >
        </>
    )
}

export default Task