import React, { useMemo } from 'react'
import { Box, Stack, Tooltip, Zoom, IconButton, Toolbar } from '@mui/material';
import Header from '../Global/Header';
import AddTask from './AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../../Redux/Action/Admin'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Assign from './Assign';
import dayjs from 'dayjs';
import { CheckCircleOutlineTwoTone,  ClearTwoTone, EditNoteTwoTone } from '@mui/icons-material';
import { ApproveTask } from '../../api/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../Global/Topbar';
const drawerWidth = 240;


const Task = () => {
    
    const dispatch = useDispatch()
    const { task } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getTask())
    }, [dispatch])

    const handleApprove = async (id) => {
        const res = await ApproveTask(id)
        if (res.success === true) {
            toast.success(res.message)
            dispatch(getTask())
        }
        if (res.success === false) {
            toast.error(res.message)
        }
    }
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
                return (params.row.status === "Created" ? <Box display="flex" justifyContent="center" alignItems="center" >
                    <Tooltip title="Approve" >
                        <IconButton onClick={() => handleApprove(params.row._id)} aria-label="approve"  >
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
                    <Assign name={params.row.name} startDate={params.row.startDate} endDate={params.row.endDate} unit={params.row.unit} taskDependency={params.row.taskDependency} id={params.row._id} instruction={params.row.instruction} rate={params.row.rate} department={params.row.department} />)
            },
            sortable: false,
            filterable: false
        },
    ], [])


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
                                slots={{ toolbar: GridToolbar }}
                                sx={{
                                    '& .header': {
                                        backgroundColor: "#3366ff",
                                    },
                                    backgroundColor: "rgb(0,0,0,0.3)",
                                    textTransform: "capitalize"
                                }}
                            >
                            </DataGrid>
                            : undefined
                        }
                    </Stack>
                </Box>
           </Box>
            {/*ToastContainer for display pop-up messages  */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgdatasBar={true}
                newestOnTop={false}
                closeButton={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default Task