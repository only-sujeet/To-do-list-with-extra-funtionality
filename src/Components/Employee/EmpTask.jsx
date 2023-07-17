
import React from 'react'
import EmpHeader from './EmpHeader'
import { Box, Stack, Tooltip, } from '@mui/material'
import { useMemo } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Header from '../Global/Header'
import Submit from './Submit'
import Reject from './Reject'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { GetAssignTask } from '../../Redux/Action/Employee'
const EmpTask = () => {
  const dispatch = useDispatch()
  const { getAsignTask } = useSelector(state => state.emp)
  //  for Get Assign Work
  React.useEffect(() => {
    dispatch(GetAssignTask())
  }, [dispatch]);

  const columns = useMemo((getAsignTask) => [
    { field: "name", headerName: "Task Name", width: 120, headerClassName: "header" },
    { field: "rate", headerName: "Rate", width: 100, headerClassName: "header" },
    { field: "unit", headerName: "Unit", width: 100, headerClassName: "header" },
    { field: "department", headerName: "Department", width: 160, headerClassName: "header" },
    { field: "taskDependency", headerName: "Dependency", width: 150, headerClassName: "header" },

    { field: "instruction", headerName: "Instruction", width: 250, headerClassName: "header", renderCell: (params) => { <Tooltip sx={{ maxWidth: 500, }} title={<h1>{params.value}</h1>} >{params.value}</Tooltip> } },

    {
      field: "startDate", headerName: "Start At", width: 150, headerClassName: "header",
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    { field: "endDate", headerName: "End At", width: 150, headerClassName: "header", valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), },
    { field: "status", headerName: "Status", width: 150, headerClassName: "header" },
    {
      field: "actions", type: "actions",
      headerName: "Action", headerClassName: "header",
      width: 150,
      renderCell: (params) => 
          <Box display="flex" alignItems="center" justifyContent="center">
        <Submit checklist={params.row.checkList} id={params.row._id} />
        <Reject id={params.row._id} />
      </Box>
      ,

      // sortable: false,
      // filterable: false
    },
  ], [])

  return (
    <div>
      <EmpHeader />
      <Box sx={{ mt: "5rem", ml: "1rem", }} >
        <Header title="Tasks" subtitle="Welcome to task page here Display your tasks" />

        <Stack style={{ display: "grid", width: "100%", height: "50vh", }}>
          {getAsignTask ?
            <DataGrid
              rows={getAsignTask}
              key={row => row._id}
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
              slots={{ toolbar: GridToolbar }}
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