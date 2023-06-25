import React, { useMemo } from 'react'
import { makeStyles, } from '@material-ui/core'
import AdminTopbar from '../Global/AdminTopbar';
import { Box, Stack, Tooltip, Zoom, Button, IconButton } from '@mui/material';
import Header from '../Global/Header';
import AddTask from './AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../../Redux/Action/Admin'
import { DataGrid } from '@mui/x-data-grid';
import Assign from './Assign';
import dayjs from 'dayjs';
import { CheckCircleOutlineTwoTone, ClearAll, ClearTwoTone, EditNoteTwoTone } from '@mui/icons-material';

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
        { field: "name", headerName: "Task Name", width: 120, headerClassName: "header" },
        { field: "rate", headerName: "Rate", width: 100, headerClassName: "header", },
        { field: "unit", headerName: "Unit", width: 100, headerClassName: "header" },
        { field: "department", headerName: "Department", width: 130, headerClassName: "header" },
        { field: "taskDependency", headerName: "Dependency", width: 150, headerClassName: "header", },
        { field: "instruction", headerName: "Instruction", width: 120, headerClassName: "header", renderCell: (params) => { <Tooltip sx={{ maxWidth: 500, }} title={params.value} TransitionComponent={Zoom} >{params.value}</Tooltip> } },
        { field: "startDate", headerName: "Start At", width: 150, headerClassName: "header", valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), },
        { field: "endDate", headerName: "End At", width: 120, headerClassName: "header", valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), },
        { field: "timeDuration", headerName: "Task-Duration", width: 120, headerClassName: "header" },
        { field: "status", headerName: "Status", width: 120, headerClassName: "header" },
        {
            headerName: "Action", headerClassName: "header",
            width: "135",
            renderCell: (params) => {
                return params.row.status === "Created" ? <Box display="flex" justifyContent="center" alignItems="center" >
                    <Tooltip title="Approve" >
                        <IconButton aria-label="approve"  >
                            <CheckCircleOutlineTwoTone color='success' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Reject">
                        <IconButton aria-label="approve"  >
                            <ClearTwoTone color='error' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton aria-label="approve"  >
                            <EditNoteTwoTone color='info' />
                        </IconButton>
                    </Tooltip>
                </Box>
                    :
                    <Assign name={params.row.name} startDate={params.row.startDate} endDate={params.row.endDate} unit={params.row.unit} taskDependency={params.row.taskDependency} id={params.row._id} instruction={params.row.instruction} rate={params.row.rate} department={params.row.department} />
            },
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

                    <Stack style={{
                        display: "grid",
                        width: "100%",
                        height: "50vh",

                    }}>
                        {task ?
                            < DataGrid
                                rows={task}
                                key={row => row._id}
                                columns={columns}
                                getRowId={row => row._id}
                                options={options}
                                sx={{
                                    '& .header': {
                                        backgroundColor: "#3366ff",
                                    },
                                    backgroundColor: "rgb(0,0,0,0.3)"
                                }}
                            >
                            </DataGrid>
                            : undefined
                        }
                    </Stack>
                </Box>
            </div >
        </>
    )
}

export default Task