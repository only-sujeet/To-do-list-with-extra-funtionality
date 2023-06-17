import React from 'react'
import EmpHeader from './EmpHeader'
import { Box, Stack, IconButton, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTask } from '../../Redux/Action/Admin'
import { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Header from '../Global/Header'
import { CheckCircleOutlineTwoTone } from '@mui/icons-material'




const Tasks = () => {
    const dispatch = useDispatch()
    const { task } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getTask())
    }, [dispatch])


    const columns = useMemo(task => [
        { field: "name", headerName: "Task Name", width: 120 },
        { field: "rate", headerName: "Rate", width: 100 },
        { field: "unit", headerName: "Unit", width: 100 },
        { field: "field", headerName: "Department", width: 100 },
        { field: "taskDependency", headerName: "Dependency", width: 150 },
        { field: "instruction", headerName: "Instruction", width: 120 },
        { field: "startDate", headerName: "Start At", width: 150 },
        { field: "endDate", headerName: "End At", width: 120 },
        { field: "status", headerName: "Status", width: 120 },
        // { field: "_id", headerName: "ID", width: 150 },

        {
            headerName: "Action",
            width: 150,
            renderCell: (params) => <Tooltip title="Accept">

                <IconButton aria-label="check">
                    <CheckCircleOutlineTwoTone color='success' />
                </IconButton>
            </Tooltip>,
            sortable: false,
            filterable: false
        },
    ], [])

    return (
        <div>
            <EmpHeader />
            <Box sx={{ mt: "70px", ml: "10px" }}>
                <Header title="Tasks" subtitle="Welcome to tasks page here All tasks show" />
                <Stack display="grid" width="100" height="50vh" marginX="1rem">
                    {task ?
                        <DataGrid
                            rows={task}
                            key={row => row._id}
                            sx={{
                                fontSize: "1rem", fontFamily: "sans-serif",
                               
                            }}
                            columns={columns}
                            getRowId={row => row._id}

                        >

                        </DataGrid>
                        : undefined

                    }
                </Stack>
            </Box>
        </div>
    )
}

export default Tasks