import { Button, Chip, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { addSubDept } from '../Validation/Admin'
import { addSubDepartment, getDept, getSubDept, } from '../../api/Admin'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from 'react'
import { Delete, DeleteForeverTwoTone, DeleteOutlineTwoTone, Edit, HighlightOffRounded, ModeEditOutlineOutlined } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { Box, IconButton } from '@material-ui/core'

const Subdepartment = () => {

    useEffect(() => {
        getDepartment();
    }, []);

    const [dept, setDept] = React.useState();
    const [subDept, setSubDept] = React.useState();

    const getDepartment = async () => {
        const { data } = await getDept()
        data && setDept(data)
    }
    const initialvalues = {
        department:"",
        subDept:"",
        rate:"",
        unit:""
    }
    const handleGetSubDept = async (e) => {
        handleChange(e)
        const data = await getSubDept({ department: e.target.value })
        data && setSubDept(data)
    }

    const handledelete = () => { 
        alert("hello")
     }

    const columns = useMemo(dept => [
        { field: "subDept", headerName: "Sub-Deptartment", width: 155, headerClassName: 'super-app-theme--header' },
        { field: "rate", headerName: "Rate", width: 140, headerClassName: 'super-app-theme--header' },
        { field: "unit", headerName: "Unit", width: 140, headerClassName: 'super-app-theme--header' },
        {
            field: "Action", headerName: "Action", width: 170, headerAlign: "center", headerClassName: 'super-app-theme--header',
            renderCell: (params) =>
                <Box display="flex" justifyContent="center" alignItems="center">
                   
                    <Chip  icon={<HighlightOffRounded fontSize='small'/>} color='error' label="Delete"  size='medium'  onClick={handledelete}  />
                   <Chip color='secondary' label="Edit" size='medium'icon={<ModeEditOutlineOutlined/>} />
                    {/* <Button sx={{ ml: "10px" }} variant="contained" color='success' ><Edit /></Button> */}
                </Box>
        },
    ], [])


    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalues,
        validationSchema: addSubDept,
        onSubmit: async (values, { resetForm }) => {
            console.log(values)
            const { data } = await addSubDepartment(values)
            if (data.success === true) {
                toast.success(data.message)
                getd(data.department)
                resetForm({ values: null })
            }
            if (data.success === false) {
                toast.error(data.message)
            }
        }
    })

    const getd = async (value) => {
        const data = await getSubDept({ department: value })
        data && setSubDept(data)
    }



    return (
        <div>
            <Typography variant="h2" color="textSecondary" fontWeight="bold">Manage Sub-Department</Typography>
            <form action="" onSubmit={handleSubmit}>
                <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

                    <TextField
                        select
                        fullWidth
                        label="Select Department"
                        size='small'
                        name='department'
                        type='text'
                        variant='standard'
                        onChange={handleGetSubDept}
                        value={values.company}
                        onBlur={handleBlur}
                    >
                        {
                            dept && dept?.map((data) => (
                                <MenuItem value={data.department}>{data.department}</MenuItem>
                            ))
                        }
                    </TextField>
                    {errors.department && touched.department ? <Typography variant="caption" color="error">{errors.department}</Typography> : null}
                    <TextField
                        fullWidth
                        label="Add Sub-Department"
                        size='small'
                        name='subDept'
                        type='text'
                        variant='outlined'
                        placeholder='Enter Sub Department Name'
                        value={values.subDept}
                        onBlur={handleBlur}
                        onChange={handleChange}

                    />
                    {errors.subDept && touched.subDept ? <Typography variant="caption" color="error">{errors.subDept}</Typography> : null}
                    <TextField
                        fullWidth
                        label="Add Rate"
                        size='small'
                        name='rate'
                        type='number'
                        variant='outlined'
                        placeholder='Enter Rate'
                        value={values.rate}
                        onBlur={handleBlur}
                        onChange={handleChange}

                    />
                    {errors.rate && touched.rate ? <Typography variant="caption" color="error">{errors.rate}</Typography> : null}
                    <TextField
                        fullWidth
                        label="Add Unit"
                        size='small'
                        name='unit'
                        type='number'
                        variant='outlined'
                        placeholder='Enter Unit'
                        value={values.unit}
                        onBlur={handleBlur}
                        onChange={handleChange}

                    />
                    {errors.unit && touched.unit ? <Typography variant="caption" color="error">{errors.unit}</Typography> : null}
                    <Tooltip title="Add Sub-Department">
                        <Button variant="contained" color='primary' type='submit' >
                            Add
                        </Button>
                    </Tooltip>
                    <Stack sx={{
                        '& .super-app-theme--header': {
                            backgroundColor: "#3366ff",
                        },
                        display: "grid",
                        height: "40vh",
                        marginBottom: "2rem",
                    }}
                    >
                        {subDept ? <DataGrid
                            rows={subDept}
                            key={row => row._id}
                            columns={columns}
                            getRowId={row => row._id}

                            style={{
                                backgroundColor: "rgb(0,0,0,0.6)",
                                color: "white",
                                marginBottom: "1rem",
                                fontSize: "1rem", fontFamily: "Josefin Sans",
                            }}
                        /> : undefined}
                    </Stack>

                    {/* <TableContainer component={Paper}>
                        <Table aria-label='a dense table' size='small'>
                            <TableHead sx={{ backgroundColor:"lightskyblue" }} >
                                <TableRow>
                                    <TableCell align='center' ><b> Sub-Departments</b>  </TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    subDept && subDept?.map((data) => (
                                        <TableRow key={data}>
                                            <TableCell>{data.}</TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>

                        </Table>
                    </TableContainer> */}
                    {/* {subDept ? <DataGrid
                        rows={subDept}
                        key={row => row.data}
                        sx={{ fontSize: "1rem", fontFamily: "sans-serif", backgroundColor: "skyblue" }}
                        columns={columns}
                        getRowId={row => row.data}

                    ></DataGrid> : undefined} */}

                </Stack>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgdatasBar={true}
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

export default Subdepartment