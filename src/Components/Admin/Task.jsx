import React, { useMemo, } from 'react'
import { Box, Stack, Tooltip, Zoom, IconButton, Toolbar, Chip } from '@mui/material';
import Header from '../Global/Header';
import AddTask from './AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../../Redux/Action/Admin'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Assign from './Assign';
import dayjs from 'dayjs';
import { CheckCircleOutlineTwoTone, Circle, ClearTwoTone, EditNoteTwoTone } from '@mui/icons-material';
import { ApproveTask } from '../../api/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../Global/Topbar';
import AdminRoute from '../../Protected Route/AdminRoute';
import UploadExcel from './UploadExcel';
import { blue, grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
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
        { field: "name", headerName: "Task Name", width: 120, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "rate", headerName: "Rate", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "unit", headerName: "Unit", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "department", headerName: "Department", width: 130, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "taskDependency", headerName: "Dependency", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "instruction", headerName: "Instruction", width: 120, headerClassName: "header", renderCell: (params) => { <Tooltip sx={{ maxWidth: 500, }} title={params.value} TransitionComponent={Zoom} >{params.value}</Tooltip> }, headerAlign: "center", align: "center" },
        { field: "startDate", headerName: "Start At", width: 100, headerClassName: "header", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------", headerAlign: "center", align: "center" },
        { field: "endDate", headerName: "End At", width: 100, headerClassName: "header", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------", headerAlign: "center", align: "center" },
        { field: "timeDuration", headerName: "Task-Duration", width: 110, headerClassName: "header", valueFormatter: (params) => params.value ? (params.value) : "------", headerAlign: "center", align: "center" },
        {
            field: "status", headerName: "Status", width: 130, headerClassName: "header", headerAlign: "center", align: "center", renderCell: params => {
                if (params.row.status === "Created") {
                    return <Chip icon={<Circle fontSize='small' color='error' />} label={params.row.status} color='error' variant='outlined' size='small' />
                }
                else if (params.row.status === "Approved") {
                    return <Chip icon={<Circle fontSize='small' color='warning' />} label={params.row.status} color='warning' variant='outlined' size='small' />



                }
                else if (params.row.status === "assign") {
                    return <Chip icon={<Circle fontSize='small' color='success' />} label={params.row.status} color='success' variant='outlined' size='small' />
                }

            }
        },
        {
            headerName: "Action", headerClassName: "header", headerAlign: "center", align: "center",
            width: 122,
            renderCell: params => {
                if (params.row.status === "Created") {

                    return <Box display="flex" justifyContent="center" alignItems="center"  >
                        <Tooltip title="Approve"  >
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
                            <Link to={`/edittask/${params.row._id}`}>
                                <IconButton aria-label="approve"  >
                                    <EditNoteTwoTone color='info' />
                                </IconButton>
                            </Link>
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
                <Box mt="15px" mb="10px">
                    <Box display='flex' justifyContent='space-between' alignItems="center"  >
                        <Header title="Task" subtitle="Welcome to Task page" />
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <AddTask />
                            <UploadExcel />
                        </Box>
                    </Box>

                    <Stack style={{
                        display: "grid",
                        // width: "100%",
                        height: "65vh",

                    }}>
                        {task ?
                            < DataGrid
                                rows={task}
                                // key={row => row._id}
                                columns={columns}
                                getRowId={(row) => row._id}
                                slots={{ toolbar: GridToolbar }}
                                getRowSpacing={0}
                                rowHeight={37}
                                rowSelection="true"
                                rowSpacingType='margin'
                                scrollbarSize={1}
                                columnHeaderHeight={37}
                                //    autoPageSize="true"
                                //    autoHeight="true"
                                sx={{
                                    '& .header': {
                                        backgroundColor: blue[700],

                                    },
                                    '.MuiDataGrid-columnSeparator': {
                                        display: 'none',
                                    },
                                    '&.MuiDataGrid-root': {
                                        border: 'none',
                                    },

                                    bgcolor: grey[300],
                                    textTransform: "capitalize",
                                    fontFamily: "Josefin Sans",
                                    // fontSize:""

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