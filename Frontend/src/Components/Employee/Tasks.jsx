import React from 'react'
import EmpHeader from './EmpHeader'
import { Box, Stack, IconButton, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllTask, getTask } from '../../Redux/Action/Admin'
import { useMemo } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Header from '../Global/Header'
import { CheckCircleOutlineTwoTone } from '@mui/icons-material'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs'
import { blue, grey } from '@mui/material/colors'

const Tasks = () => {
    const dispatch = useDispatch()
    const { alltask } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getAllTask())
    }, [dispatch])
    const acceptTask = async (id) => {
        const { data } = await axios.get(`/api/emp/acceptTask/${id}`)
        if (data.success === true) {
            toast.success(data.message)
            dispatch(getAllTask())
        }
        if (data.success === false) {
            toast.error(data.message)
        }
    }
    const columns = useMemo((alltask) => [
        { field:"name",headerName:"Task Name",width:150,headerClassName:"header"},
        { field:"rate",headerName:"Rate",width:80,type:"number",headerClassName:"header"},
        { field:"unit",headerName:"Unit",width:80,type:"number",headerClassName:"header"},
        { field:"department",headerName:"Department",width:160,headerClassName:"header" },
        { field:"taskDependency",headerName:"Dependency",width: 150,headerClassName:"header" },
        { field:"instruction",headerName:"Instruction",width: 250, headerClassName: "header" },
        { field: "startDate", headerName: "Start At", width: 150,type:"date" ,headerClassName: "header", valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), },
        { field: "endDate", headerName: "End At", width: 150,type:"date" ,headerClassName: "header", valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), },
        { field: "timeDuration", headerName: "Task-Duration", width: 110, headerClassName: "header", valueFormatter: (params) => params.value ? (params.value) : "------", headerAlign: "center", align: "center" },
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
                <Stack style={{display:"grid",height:"50vh",}}>{alltask ?
                        <DataGrid
                            rows={alltask}
                            key={row => row._id}
                            columns={columns}
                            getRowId={row => row._id}
                            slots={{ toolbar: GridToolbar }}
                            getRowSpacing={0}
                            rowHeight={37}
                            rowSelection="true"
                            rowSpacingType='margin'
                            scrollbarSize={1}
                            columnHeaderHeight={37}
                            
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
                            }}
                        ></DataGrid>:undefined}
                </Stack>
            </Box>
           
        </>
    )
}

export default Tasks