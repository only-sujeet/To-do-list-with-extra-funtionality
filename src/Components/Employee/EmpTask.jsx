
import React from 'react'
import EmpHeader from './EmpHeader'
import { Box, Stack, IconButton, Tooltip } from '@mui/material'
import { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Header from '../Global/Header'
import { CheckCircleOutlineTwoTone } from '@mui/icons-material'
import axios from 'axios'

const EmpTask = () => {
  React.useEffect(() => {
    getTask();
  }, []);

  const [tasks, setTasks] = React.useState();

  const getTask = async () => {
    const { data } = await axios.get(`/api/emp/getAssignedTask`)
    data && setTasks(data.tasks)
  }


  const columns = useMemo(task => [
    { field: "name", headerName: "Task Name", width: 120, headerClassName: "header" },
    { field: "rate", headerName: "Rate", width: 100, headerClassName: "header" },
    { field: "unit", headerName: "Unit", width: 100, headerClassName: "header" },
    { field: "department", headerName: "Department", width: 160, headerClassName: "header" },
    { field: "taskDependency", headerName: "Dependency", width: 150, headerClassName: "header" },
    { field: "instruction", headerName: "Instruction", width: 250, headerClassName: "header" },
    { field: "startDate", headerName: "Start At", width: 150, headerClassName: "header" },
    { field: "endDate", headerName: "End At", width: 150, headerClassName: "header" },
    { field: "status", headerName: "Status", width: 150, headerClassName: "header" },
    {
      headerName: "Action", headerClassName: "header",
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
      <Box sx={{ mt: "5rem", ml: "1rem", }} >
        <Header title="Tasks" subtitle="Welcome to task page here Display your tasks" />

        <Stack display="grid" alignSelf="center" width={["90vw", "97.5vw"]} height="60vh" marginRight="1rem">
          {tasks ?
            <DataGrid
              rows={tasks}
              key={row => row._id}
              sx={{
                fontSize: "1rem", fontFamily: "sans-serif",
                '& .header': {
                  backgroundColor: "#3366ff",
                },
                backgroundColor: "rgb(0,0,0,0.3)"

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