import * as React from 'react';
import { Button, TextField, Stack, Tooltip, Typography, Box } from '@mui/material';
import { } from '@material-ui/core';
import { useFormik } from 'formik';
import { adddep } from '../Validation/Admin';
import { addDepartment, getDept } from '../../api/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { ArrowDropDownCircleTwoTone, Delete } from '@mui/icons-material';



const Testing = () => {

  React.useEffect(() => {
    getDepartment();
  }, []);

  const [dept, setDept] = React.useState();

  const getDepartment = async () => {
    const { data } = await getDept()
    data && setDept(data)
  }


  const columns = useMemo(dept => [
    { field: "department", headerName: "Task Name", flex: 1, headerClassName: 'super-app-theme--header' },
    { field: "subDepts", headerName: "sub-department", flex: 1, headerClassName: 'super-app-theme--header' ,type: "singleSelect", width: 120,  
    editable: true,
    renderCell: ({ value }) => (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>{value.subDept}</div>
        <ArrowDropDownCircleTwoTone />
      </Box>
    )   },
    {
      field: "Action", headerName: "Action", width: 200, headerAlign: "center", headerClassName: 'super-app-theme--header',
      renderCell: (params) => <Button variant="contained" sx={{ color: "red", display: "flex", margin: "auto" }} ><Delete /></Button>
    },
  ], [])


  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  const initialvalues = {}

  const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialvalues,
    validationSchema: adddep,
    onSubmit: async (values, { resetForm }) => {
      const res = await addDepartment(values)
      if (res.success === true) {
        toast.success(res.message)
        resetForm({ values: "" })
        getDepartment();
      }
      if (res.success === false) {
        toast.error(res.message)
      }
      console.log(values)
    }
  })
  return (
    <div style={{ paddingBottom: "3rem" }}>

    <Typography variant="h2" color="textSecondary" fontWeight="bold">Mange Department</Typography>
    <form action="" onSubmit={handleSubmit}>
        <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

            <TextField

                fullWidth
                label="Add Department"
                size='small'
                name='department'
                type='text'
                variant='outlined'
                placeholder='Enter Department Name'
                value={values.department}
                onBlur={handleBlur}
                onChange={handleChange}

            />
            {errors.field && touched.field ? <Typography variant="caption" color="error">{errors.field}</Typography> : null}
            <Tooltip title="Add Department">
                <Button variant="contained" color='primary' type='submit' >
                    Add
                </Button>
            </Tooltip>


        </Stack>
    </form>
    <Stack sx={{
        '& .super-app-theme--header': {
            backgroundColor: "#33aaff",
        },
        display: "grid",
        height: "40vh",
        marginBottom: "2rem",
    }}
    >
        {dept ? <DataGrid
            rows={dept}
            key={row => row._id}
            columns={columns}
            getRowId={row => row._id}
            getRowSpacing={getRowSpacing}
            style={{
                backgroundColor: "rgb(0,0,0,0.6)",
                color: "white",
                fontSize: "1rem", fontFamily: "Josefin Sans",
                marginBottom: "1rem",
                
            }}
        /> : undefined}
    </Stack>
    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
</div>

  )
}

export default Testing