
import React from 'react'
import EmpHeader from './EmpHeader'
import { Box, Stack,  Tooltip,  } from '@mui/material'
import { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Header from '../Global/Header'
import axios from 'axios'
import Submit from './Submit'
import dayjs from 'dayjs'
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

    { field:"instruction",headerName: "Instruction", width: 250, headerClassName: "header", renderCell: (params) => {<Tooltip sx={{maxWidth:500,}}  title={<h1>{params.value}</h1>} >{params.value}</Tooltip>} },

    {
      field: "startDate", headerName: "Start At", width: 150, headerClassName: "header",
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    { field: "endDate", headerName: "End At", width: 150, headerClassName: "header", valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), },
    { field: "status", headerName: "Status", width: 150, headerClassName: "header" },
    {
      headerName: "Action", headerClassName: "header",
      width: 150,
      renderCell: (params) => <Submit checklist={params.row.checkList} id={params.row._id} />,
      sortable: false,
      filterable: false
    },
  ], [])

  return (
    <div>
      <EmpHeader />
      <Box sx={{ mt: "5rem", ml: "1rem", }} >
        <Header title="Tasks" subtitle="Welcome to task page here Display your tasks" />

        <Stack style={{ display: "grid", width: "100%", height: "50vh", }}>
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