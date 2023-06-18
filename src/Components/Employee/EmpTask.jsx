import React from 'react'
import EmpHeader from './EmpHeader'
import { Box, IconButton, Stack, Tooltip, Button } from '@mui/material'
import Header from '../Global/Header'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect } from 'react'
import { getTask } from '../../Redux/Action/Admin'
import { CheckCircleOutlineTwoTone } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
const EmpTask = () => {
  const dispatch = useDispatch()
  const { task } = useSelector(state => state.admin)
  useEffect(() => {
    dispatch(getTask())
  }, [dispatch])


  const columns = useMemo(task => [
    { field: "name", headerName: "Task Name", width: 120 },
    { field: "rate", headerName: "Rate", width: 100 },
    { field: "unit", headerName: "Unit", width: 100 },
    { field: "department", headerName: "Department", width: 160 },
    { field: "taskDependency", headerName: "Dependency", width: 150 },
    { field: "instruction", headerName: "Instruction", width: 250 },
    { field: "startDate", headerName: "Start At", width: 150 },
    { field: "endDate", headerName: "End At", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    //  { field: "_id", headerName: "ID", width: 150 },

    {
      headerName: "Action",
      width: 150,
      renderCell: (params) => <Tooltip title="Accept">
        <Button variant="outlined" color="default">
          Submit
        </Button>
      </Tooltip>,
      sortable: false,
      filterable: false
    },
  ], [])
  return (
    <div>
      <EmpHeader />
      <Box sx={{ mt: "5rem", ml: "1rem", }}>
        <Header title="Tasks" subtitle="Welcome to task page here Display your tasks" />
        <Stack display="grid" alignSelf="center" width={["90vw", "97.5vw"]} height="60vh" marginRight="1rem">
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

export default EmpTask