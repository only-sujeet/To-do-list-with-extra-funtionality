import React, { useMemo } from 'react'
import { Box, Stack, Tooltip, Zoom, IconButton, Toolbar, Fab, Chip } from '@mui/material';
import Header from '../Global/Header';
import AddTask from './AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../../Redux/Action/Admin'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Assign from './Assign';
import dayjs from 'dayjs';
import { CheckCircleOutlineTwoTone, Circle, CircleTwoTone, ClearTwoTone, EditNoteTwoTone } from '@mui/icons-material';
import { ApproveTask } from '../../api/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../Global/Topbar';
import AdminRoute from '../../Protected Route/AdminRoute';
import UploadExcel from './UploadExcel';
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
        { field: "name", headerName: "Task Name", width: 120, headerClassName: "header", headerAlign: "center" },
        { field: "rate", headerName: "Rate", width: 100, headerClassName: "header", headerAlign: "center" },
        { field: "unit", headerName: "Unit", width: 100, headerClassName: "header", headerAlign: "center" },
        { field: "department", headerName: "Department", width: 130, headerClassName: "header", headerAlign: "center" },
        { field: "taskDependency", headerName: "Dependency", width: 150, headerClassName: "header", headerAlign: "center" },
        { field: "instruction", headerName: "Instruction", width: 120, headerClassName: "header", renderCell: (params) => { <Tooltip sx={{ maxWidth: 500, }} title={params.value} TransitionComponent={Zoom} >{params.value}</Tooltip> }, headerAlign: "center" },
        { field: "startDate", headerName: "Start At", width: 150, headerClassName: "header", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------", headerAlign: "center" },
        { field: "endDate", headerName: "End At", width: 120, headerClassName: "header", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------", headerAlign: "center" },
        { field: "timeDuration", headerName: "Task-Duration", width: 120, headerClassName: "header", valueFormatter: (params) => params.value ? (params.value) : "------", headerAlign: "center" },
        {
            field: "status", headerName: "Status", width: 120, headerClassName: "header", headerAlign: "center", renderCell: params => {
                if (params.row.status === "Created") {
                    return <Chip icon={<Circle fontSize='small' color='error' />} label={params.row.status} color='error' variant='outlined' size='medium' />
                }
                else if (params.row.status === "Approved") {
                    return <Chip icon={<Circle fontSize='small' color='warning' />} label={params.row.status} color='warning' variant='outlined' size='medium' />



                }
                else if (params.row.status === "assign") {
                    return <Chip icon={<Circle fontSize='small' color='success' />} label={params.row.status} color='success' variant='outlined' size='medium' />
                }

            }
        },
        {
            headerName: "Action", headerClassName: "header", headerAlign: "center",
            width: "135",
            renderCell: params => {
                if (params.row.status === "Created") {

                    return <Box display="flex" justifyContent="center" alignItems="center" >
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

                }
                else if (params.row.status === "Approved") {
                    return <Assign name={params.row.name} startDate={params.row.startDate} endDate={params.row.endDate} unit={params.row.unit} taskDependency={params.row.taskDependency} id={params.row._id} instruction={params.row.instruction} rate={params.row.rate} department={params.row.department} />
                }
                else {
                    return <Box></Box>
                }
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
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <AddTask />
                            <UploadExcel />
                        </Box>
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
                                    '.MuiDataGrid-columnSeparator': {
                                        display: 'none',
                                    },
                                    '&.MuiDataGrid-root': {
                                        border: 'none',
                                    },
                                   
                                    backgroundColor: "rgb(0,0,0,0.3)",
                                    textTransform: "capitalize",
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

export default AdminRoute(Task)