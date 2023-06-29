import * as React from 'react';
import { Button, TextField, Stack, Tooltip, Typography, FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';
import { } from '@material-ui/core';
import { useFormik } from 'formik';
import { adddep } from '../Validation/Admin';
import { addDepartment, getDept } from '../../api/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Delete } from '@mui/icons-material';

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
        { field: "department", headerName: "Task Name", width: 150, headerClassName: 'super-app-theme--header' },
        {
            field: "subDepts", headerName: 'Sub-Department',
            width: 200,
            renderCell: (params) => (
                <FormControl variant='filled' fullWidth>
                    <InputLabel>Sub-Department</InputLabel>
                    <Select
                        id='Field'
                        label="Depatment"
                        name='department'>
                        {
                            params.row.subDepts <= 0 ? <MenuItem>No Sub-Department Added</MenuItem> : params.row.subDepts?.map((data) => (
                                <MenuItem disabled value={data.subDept}>{data.subDept}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            ),
        },
        {
            field: "Action", headerName: "Action", width: 255, headerAlign: "center", headerClassName: 'super-app-theme--header',
            renderCell: (params) => <Box display="flex" alignItems="center" justifyContent="space-between" >
                <Button variant="contained" sx={{ color: "red", display: "flex", margin: "auto", mr:"2px"}} ><Delete /></Button>
                {/* <Button variant="contained" sx={{ display: "flex", margin: "auto" }} >Add Sub-Department</Button> */}
            </Box>
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
                width:"100%"
            }}
            >
                {dept ? <DataGrid
                    rows={dept}
                    key={row => row._id}
                    columns={columns}
                    getRowId={row => row._id}
                    // getRowSpacing={getRowSpacing}    
                    slots={{ toolbar: GridToolbar }}
                    style={{
                        backgroundColor: "rgb(0,0,0,0.6)",
                        color: "white",
                        fontSize: "1rem", 
                        fontFamily: "Josefin Sans",
                        marginBottom: "1rem",
                        textTransform: "capitalize"
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

export default AddDepartment