
import React from 'react'
import EmpHeader from './EmpHeader'
import { Box, Chip, Stack, Tooltip, } from '@mui/material'
import { useMemo } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Header from '../Global/Header'
import Submit from './Submit'
import Reject from './Reject'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { GetAssignTask } from '../../Redux/Action/Employee'
import { blue, grey } from '@mui/material/colors'
import { Circle } from '@mui/icons-material'
const EmpTask = () => {
  const dispatch = useDispatch()
  const { getAsignTask } = useSelector(state => state.emp)
  //  for Get Assign Work
  React.useEffect(() => {
    dispatch(GetAssignTask())
  }, [dispatch]);

  const columns = useMemo((getAsignTask) => [
    { field: "name", headerName: "Task Name", width: 120, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "rate", headerName: "Rate", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "unit", headerName: "Unit", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "department", headerName: "Department", width: 115, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "subDepartment", headerName: "Sub-Department", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "taskDependency", headerName: "Dependency", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },

    { field: "instruction", headerName: "Instruction", width: 220, headerClassName: "header", renderCell: (params) => { <Tooltip sx={{ maxWidth: 500, }} title={<h1>{params.value}</h1>} >{params.value}</Tooltip> }, headerAlign: "center", align: "center" },

    {
      field: "startDate", headerName: "Start At", width: 100, headerClassName: "header",
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), headerAlign: "center", align: "center"
    },
    { field: "endDate", headerName: "End At", width: 100, headerClassName: "header", valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), headerAlign: "center", align: "center" },
    { field: "timeDuration", headerName: "Task-Duration", width: 110, headerClassName: "header", valueFormatter: (params) => params.value ? (params.value) : "------", headerAlign: "center", align: "center" },
    {
      field: "status", headerName: "Status", width: 130, headerClassName: "header", headerAlign: "center", align: "center",
      renderCell: params => {
        if (params.row.status === "assign") {
          return <Chip icon={<Circle fontSize='small' color='success' />} label={params.row.status} color='error' variant='outlined' size='small' />
        }
        else if (params.row.status === "Remarked") {
          return <Chip icon={<Circle fontSize='small' color='warning' />} label={params.row.status} color='warning' variant='outlined' size='small' />
        }
        else if (params.row.status === "Rejected") {
          return <Chip icon={<Circle fontSize='small' color='error' />} label={params.row.status} color='error' variant='outlined' size='small' />
        }

      },
      sortable: false,
      // filterable: false
    },
    {
      field: "actions", type: "actions",
      headerName: "Action", headerClassName: "header", headerAlign: "center", align: "center",
      width: 122,
      renderCell: (params) => {
        if (params.row.status === "assign") {
          return <Box display="flex" alignItems="center" justifyContent="center">
            <Submit checklist={params.row.checkList} id={params.row._id} />
            <Reject id={params.row._id} />
          </Box>

        } else if(params.row.status === "Remarked") {
          return <Box>
            <Submit checklist={params.row.checkList} id={params.row._id} />
          </Box>
        }
      }
      ,

      sortable: false,
      filterable: false
    },
  ], [])

  return (
    <div>
      <EmpHeader />
      <Box sx={{ mt: "5rem", ml: "1rem", }} >
        <Header title="Tasks" subtitle="Welcome to task page here Display your tasks" />

        <Stack style={{ display: "grid", height: "50vh", }}>
          {getAsignTask ?
            <DataGrid
              rows={getAsignTask}
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
                margin: "auto auto"
              }}

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