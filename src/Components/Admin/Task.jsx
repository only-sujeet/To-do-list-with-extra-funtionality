import React, { useMemo } from 'react'
import { Button, List, makeStyles, } from '@material-ui/core'
import AdminTopbar from '../Global/AdminTopbar';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Header from '../Global/Header';
import AddTask from './AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../../Redux/Action/Admin'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

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

    const [pageSize, setPageSize] = useState(5);

    const columns = useMemo(task => [
        { field: "name", headerName: "Task Name", width: 150 },
        { field: "rate", headerName: "Rate", width: 120 },
        { field: "unit", headerName: "Unit", width: 120 },
        { field: "taskDependency", headerName: "Dependency", width: 200 },
        { field: "instruction", headerName: "Instruction", width: 150 },
        { field: "startDate", headerName: "Start At", width: 200 },
        { field: "endDate", headerName: "End At", width: 150 },
        { field: "status", headerName: "Status", width: 150 },
        { field: "_id", headerName: "ID", width: 150 },

        {
            headerName: "Action",
            width: 150,
            renderCell: (params) => <Button variant='contained' color='primary' onClick={() => alert(params.row.name)}>Assign</Button>,
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
                    {task ?

                        < DataGrid
                            rows={task}
                            key={row => row._id}
                            sx={{ fontSize: "1rem", fontFamily: "sans-serif", width: "100%" }}
                            columns={columns}
                            getRowId={row => row._id}
                        >

                        </DataGrid>
                        : undefined

                    }
                </Box>
            </div >
        </>
    )
}

export default Task