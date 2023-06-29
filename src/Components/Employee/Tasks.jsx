import React from 'react'
import EmpHeader from './EmpHeader'
import { Box, Stack, IconButton, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTask } from '../../Redux/Action/Admin'
import { useMemo } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Header from '../Global/Header'
import { CheckCircleOutlineTwoTone } from '@mui/icons-material'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs'

const Tasks = () => {
    const dispatch = useDispatch()
    const { task } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getTask())
    }, [dispatch])
    const acceptTask = async (id) => {
        const { data } = await axios.get(`/api/emp/acceptTask/${id}`)
        if (data.success === true) {
            toast.success(data.message)
            dispatch(getTask())
        }
        if (data.success === false) {
            toast.error(data.message)
        }
    }
    const columns = useMemo((task) => [
        { field:"name",headerName:"Task Name",width:150,headerClassName:"header"},
        { field:"rate",headerName:"Rate",width:100,type:"number",headerClassName:"header"},
        { field:"unit",headerName:"Unit",width:100,type:"number",headerClassName:"header"},
        { field:"department",headerName:"Department",width:160,headerClassName:"header" },
        { field:"taskDependency",headerName:"Dependency",width: 150,headerClassName:"header" },
        { field:"instruction",headerName:"Instruction",width: 250, headerClassName: "header" },
        { field: "startDate", headerName: "Start At", width: 150,type:"date" ,headerClassName: "header", valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), },
        { field: "endDate", headerName: "End At", width: 150,type:"date" ,headerClassName: "header", valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), },
        { field: "status", headerName: "Status", width: 150, headerClassName: "header" },
        {headerName: "Action", headerClassName: "header",
            width: 150,
            renderCell: (params) => <Tooltip title="Accept"><IconButton aria-label="check" onClick={() => acceptTask(params.row._id)}><CheckCircleOutlineTwoTone color='success' /></IconButton></Tooltip>,
            sortable: false,
            filterable: false},
    ], []);

    return (
        <>
            <EmpHeader />
            <Box sx={{ mt:"5rem", ml:"1rem", }} >
                <Header title="Tasks" subtitle="Welcome to tasks page here All tasks show" />
                <Stack style={{display:"grid",width:"100%",height:"50vh",}}>{task ?
                        <DataGrid
                            rows={task}
                            key={row => row._id}
                            slots={{ toolbar: GridToolbar }}
                            sx={{
                                fontSize: "1rem", fontFamily: "sans-serif",
                                '& .header': {
                                    backgroundColor: "#3366ff",
                                },
                                backgroundColor: "rgb(0,0,0,0.3)",
                                textTransform: "capitalize"
                            }}
                            columns={columns}
                            getRowId={row => row._id}
                        ></DataGrid>:undefined}
                </Stack>
            </Box>
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
                theme="colored" />
        </>
    )
}

export default Tasks