import React, { useMemo, useState, } from 'react'
import { Box, Stack, Tooltip, Zoom, IconButton, Toolbar, Chip, FormControl, InputLabel, Select, MenuItem,  Button,  } from '@mui/material';
import Header from '../Global/Header';
import AddTask from './AddTask';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedTask, getRejectedTask, getTask } from '../../Redux/Action/Admin'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Assign from './Assign';
import dayjs from 'dayjs';
import { CheckCircleOutlineTwoTone, Circle, ClearTwoTone, EditNoteTwoTone } from '@mui/icons-material';
import { ApproveTask, delTask, setComplete } from '../../api/Admin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from '../../Protected Route/AdminRoute';
import UploadExcel from './UploadExcel';
import { blue, grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import AdminTopbar from '../Global/AdminTopbar';
import Remark from './Remark';

const drawerWidth = 240;




const Task = () => {
    
    
    
    const [status, setStatus] = useState(2)
    const dispatch = useDispatch()
    const { task, completedtask, rejectedtask } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getTask())
        dispatch(getCompletedTask())
        dispatch(getRejectedTask())
    }, [dispatch])
    // console.log(completedtask)

    // for approve task
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
    // for complete task
    const handleComplete = async (id) => {
        const res = await setComplete(id)
        if (res.success === true) {
            toast.success(res.message)
            dispatch(getTask())
            dispatch(getCompletedTask())

        }
        if (res.success === false) {
            toast.error(res.message)
        }
    }

    // for delete task
    const handleDelete = async (id) => {
        const res = await delTask(id)
        if (res.success === true) {
            toast.success(res.message)
            dispatch(getTask())
        }
        if (res.success === false) {
            toast.error(res.message)
        }
    }


    const handleChange = (status) => {
        setStatus(status)
    }


    // for task Column
    const columns = useMemo(task => [
        { field: "name", headerName: "Task Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "rate", headerName: "Rate", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "unit", headerName: "Unit", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "department", headerName: "Department", width: 115, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "subDepartment", headerName: "Sub-Department", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "taskDependency", headerName: "Dependency", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "instruction", headerName: "Instruction", width: 185, headerClassName: "header", renderCell: (params) => { <Tooltip sx={{ maxWidth: 500, }} title={params.value} TransitionComponent={Zoom} >{params.value}</Tooltip> }, headerAlign: "center", align: "center" },
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
            headerName: "Actions", headerClassName: "header", headerAlign: "center", align: "center",
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
                            <IconButton onClick={() => handleDelete(params.row._id)} aria-label="approve"  >
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
    // for completed task columns
    const completeTaskComlumns = useMemo(completedtask => [
        { field: "name", headerName: "Task Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "rate", headerName: "Rate", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "unit", headerName: "Unit", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "department", headerName: "Department", width: 115, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "subDepartment", headerName: "Sub-Department", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "taskDependency", headerName: "Dependency", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        {
            field: "driveLink", headerName: "Document", width: 150, headerClassName: "header", headerAlign: "center", align: "center", renderCell: params => {
                return <Button variant="text" color="secondary" href={params.row.driveLink} target='_blank' size="large">
                    View
                </Button>
            }
        },
        { field: "startDate", headerName: "Start At", width: 100, headerClassName: "header", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------", headerAlign: "center", align: "center" },
        { field: "endDate", headerName: "End At", width: 100, headerClassName: "header", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------", headerAlign: "center", align: "center" },
        { field: "timeDuration", headerName: "Task-Duration", width: 110, headerClassName: "header", valueFormatter: (params) => params.value ? (params.value) : "------", headerAlign: "center", align: "center" },
        {
            field: "status", headerName: "Status", width: 130, headerClassName: "header", headerAlign: "center", align: "center",
            renderCell: params => {
                if (params.row.status === "submitted") {
                    return <Chip icon={<Circle fontSize='small' color='error' />} label={params.row.status} color='error' variant='outlined' size='small' />
                }
                else if (params.row.status === "Completed") {
                    return <Chip icon={<Circle fontSize='small' color='success' />} label={params.row.status} color='success' variant='outlined' size='small' />
                }

            }
        },
        {
            headerName: "Actions", headerClassName: "header", headerAlign: "center", align: "center",
            width: 122,
            renderCell: params => {
                if (params.row.status === "submitted") {

                    return <Box display="flex" justifyContent="center" alignItems="center"  >
                        <Tooltip title="Completed"  >
                            <IconButton onClick={() => handleComplete(params.row._id)} aria-label="approve"  >
                                <CheckCircleOutlineTwoTone color='success' />
                            </IconButton>
                        </Tooltip>
                       <Remark id={params.row._id}/>
                    </Box>
                }
            }

        }
    ], [])
    // for rejected task
    const rejectedTaskComlumns = useMemo(rejectedtask => [
        { field: "name", headerName: "Task Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "rate", headerName: "Rate", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "unit", headerName: "Unit", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "department", headerName: "Department", width: 115, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "subDepartment", headerName: "Sub-Department", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "taskDependency", headerName: "Dependency", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "reason", headerName: "Reason", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
        { field: "instruction", headerName: "Instruction", width: 185, headerClassName: "header", renderCell: (params) => { <Tooltip sx={{ maxWidth: 500, }} title={params.value} TransitionComponent={Zoom} >{params.value}</Tooltip> }, headerAlign: "center", align: "center" },
        { field: "startDate", headerName: "Start At", width: 100, headerClassName: "header", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------", headerAlign: "center", align: "center" },
        { field: "endDate", headerName: "End At", width: 100, headerClassName: "header", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------", headerAlign: "center", align: "center" },
        { field: "timeDuration", headerName: "Task-Duration", width: 110, headerClassName: "header", valueFormatter: (params) => params.value ? (params.value) : "------", headerAlign: "center", align: "center" },
        {
            field: "status", headerName: "Status", width: 130, headerClassName: "header", headerAlign: "center", align: "center",
            // renderCell: params => {
            //     if (params.row.status === "Created") {
            //         return <Chip icon={<Circle fontSize='small' color='error' />} label={params.row.status} color='error' variant='outlined' size='small' />
            //     }
            //     else if (params.row.status === "Approved") {
            //         return <Chip icon={<Circle fontSize='small' color='warning' />} label={params.row.status} color='warning' variant='outlined' size='small' />



            //     }
            //     else if (params.row.status === "assign") {
            //         return <Chip icon={<Circle fontSize='small' color='success' />} label={params.row.status} color='success' variant='outlined' size='small' />
            //     }

            // }
        }
    ], [])

    return (

        <>
            <AdminTopbar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {/* <DrawerHeader/> */}
                <Box mt="10px" mb="10px">
                    <Box display='flex' justifyContent='space-between' alignItems="center"  >
                        <Header title="Task" subtitle="Welcome to Task page" />
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <AddTask />
                            <UploadExcel />
                        </Box>
                    </Box>

                    <Box display='flex' justifyContent='flex-end' alignItems='center' >
                        <FormControl sx={{ m: 1, minWidth: 120, }} size="small">
                            <InputLabel id="demo-select-small-label"></InputLabel>
                            <Select
                                size='small'
                                sx={{ borderRadius: "30px" }}
                                color='secondary'
                                variant='outlined'
                                defaultValue={1}
                                onChange={(e) => { handleChange(e.target.value) }}
                            >
                                <MenuItem value={1}>Task</MenuItem>
                                <MenuItem value={2}>Completed Task</MenuItem>
                                <MenuItem value={3}>Reject Task</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {
                        status === 1 &&
                        <Stack style={{
                            display: "grid",
                            // width: "100%",
                            height: "60vh",

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
                    }
                    {
                        status === 2 && <Stack style={{
                            display: "grid",
                            height: "60vh",

                        }}> {completedtask ?
                            < DataGrid
                                rows={completedtask}
                                key={row => row._id}
                                columns={completeTaskComlumns}
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
                            }  </Stack>
                    }
                    {
                        status === 3 && <Stack style={{
                            display: "grid",
                            height: "60vh",

                        }}> {rejectedtask ?
                            < DataGrid
                                rows={rejectedtask}
                                // key={row => row._id}
                                columns={rejectedTaskComlumns}
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
                            }  </Stack>
                    }
                </Box>
            </Box>
        </>
    )
}

export default AdminRoute(Task)