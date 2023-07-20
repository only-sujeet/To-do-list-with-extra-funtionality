import * as React from 'react';
import { Button, TextField, Stack, Tooltip, Typography, FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';
import { } from '@material-ui/core';
import { useFormik } from 'formik';
import { adddep } from '../Validation/Admin';
import { addDepartment, getDept } from '../../api/Admin';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Delete } from '@mui/icons-material';
import { blue, grey } from '@mui/material/colors';

const AddDepartment = () => {

    React.useEffect(() => {
        getDepartment();
    }, []);

    const [dept, setDept] = React.useState();

    const getDepartment = async () => {
        const { data } = await getDept()
        data && setDept(data)
    }


    const columns = useMemo(dept => [
        { field: "department", headerName: "Task Name", width: 173, headerClassName: "header", headerAlign: "center", align:"center", resizable:true },
        {
            field: "subDepts", headerName: 'Sub-Department',headerClassName: "header", headerAlign: "center", align:"center",
            width: 230,
            renderCell: (params) => (
                <FormControl variant='filled' fullWidth>
                    <InputLabel>Sub-Department </InputLabel>
                    <Select
                        id='Field'
                        label="Depatment"
                        name='department'>
                        {
                            params.row.subDepts <= 0 ? <MenuItem>No Sub-Department Added</MenuItem> : params.row.subDepts?.map((data) => (
                                <MenuItem  value={data.subDept}>{data.subDept}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl >
            ),
        },
        {
            field: "Action", headerName: "Action", width: 220,  headerClassName: "header", headerAlign: "center", align:"center",
            renderCell: (params) => <Box display="flex" alignItems="center" justifyContent="space-between" >
                <Button variant="contained" size='small' sx={{ color: "red", display: "flex", margin: "auto", mr: "2px" }} ><Delete fontSize='small' /></Button>
            </Box>
        },
    ], [])



    const initialvalues = {department:""}

    const { errors, touched, values, handleBlur, handleChange, handleSubmit ,isSubmitting } = useFormik({
        initialValues: initialvalues,
        validationSchema: adddep,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            const res = await addDepartment(values)
            setSubmitting(false)
            if (res.success === true) {
                toast.success(res.message)
                resetForm({ values: "" })
                getDepartment();
            }
            if (res.success === false) {
                toast.error(res.message)
            }
            // console.log(values)
        }
    })
    return (
        <div style={{ paddingBottom: "3rem" }}>

            <Typography variant="h3" color="textSecondary" fontWeight="bold">Mange Department</Typography>
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
                        inputProps={{ style:{ textTransform:"capitalize"}}}

                    />
                    {errors.department && touched.department ? <Typography variant="caption" color="error">{errors.department}</Typography> : null}
                    <Tooltip title="Add Department">
                        <Button variant="contained" color='primary' type='submit'  disabled={isSubmitting}>
                            Add
                        </Button>
                    </Tooltip>


                </Stack>
            </form>
            <Stack sx={{
               
                display: "grid",
                height: "32vh",
               
            }}
            >
                {dept ? <DataGrid
                    rows={dept}
                    key={row => row._id}
                    columns={columns}
                    getRowId={row => row._id}   
                    slots={{ toolbar: GridToolbar }}
                    getRowSpacing={0}
                    rowHeight={37}
                    rowSelection= "true"
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
                       fontFamily:"Josefin Sans",
                    }}
                /> : undefined}
            </Stack>
        </div>
    )
}

export default AddDepartment