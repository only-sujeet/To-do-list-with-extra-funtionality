import { Button, Chip, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { addSubDept } from '../Validation/Admin'
import { addSubDepartment, delSubDept, editSubDept, getDept, getSubDept, getSubDeptInfo, } from '../../api/Admin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from 'react'
import { HighlightOffRounded, ModeEditOutlineOutlined } from '@mui/icons-material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box } from '@material-ui/core'
import { useState } from 'react'

const Subdepartment = () => {


    useEffect(() => {
        getDepartment();
    }, []);


    // all useState hooks 
    const [data, setData] = useState({
        unit: "",
        rate: "",
        subDept: ""
    });
    const [dept, setDept] = useState();

    const [subDept, setSubDept] = useState();

    const [loading, setloading] = useState(false);

    const [open, setOpen] = useState(false)

    const [editOpen, seteditOpen] = useState();



    // get department function
    const getDepartment = async () => {
        const { data } = await getDept()
        data && setDept(data)
    }

    // get sub-department function 
    const handleGetSubDept = async (e) => {
        handleChange(e)
        const data = await getSubDept({ department: e.target.value })
        data && setSubDept(data)
    }

    // initialvalues  of sub-department
    const initialvalues = {
        department: "",
        subDept: "",
        rate: "",
        unit: ""
    }

    // Sub-Department Add Fucntion 
    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalues,
        validationSchema: addSubDept,
        onSubmit: async (values, { resetForm }) => {
            console.log(values)
            const { data } = await addSubDepartment(values)
            if (data.success === true) {
                toast.success(data.message)
                getd(data.department)
                setOpen(false)
                resetForm({ values: null })
            }
            if (data.success === false) {
                toast.error(data.message)
            }
        }
    })

    // Delete Function 
    const handledelete = async (id, deptId) => {
        setloading(true)
        const data = await delSubDept(id, { deptId })
        setloading(false)
        if (data.success === true) {
            toast.success(data.message)
            getd(data.department)
        }
        if (data.success === false) {
            toast.error(data.message)
            seteditOpen(false)
        }
    }

    // get sub-department 
    const getd = async (value) => {
        const data = await getSubDept({ department: value })
        data && setSubDept(data)
    }

    // get sub-department single data
    const getSubDeptDetails = async (subDept, deptId) => {
        seteditOpen(true)
        const data = await getSubDeptInfo({ subDept, deptId })
        data && setData(data)
        if (data.success === false) {
            toast.error(data.message)
            seteditOpen(false)
        }
    }
    // Edit sub-department function
    const handleEdit = (e) => {
        const { name, value } = e.target

        setData(
            {
                ...data,
                [name]: value
            }
        )

    }
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const res = await editSubDept(data)
        if (res.success === true) {
            toast.success(res.message)
            getd(res.dept.department)
            seteditOpen(false)
        }
        if (data.success === false) {
            toast.error(data.message)
        }

    }
    console.log(data)
    const columns = useMemo(dept => [
        { field: "subDept", headerName: "Sub-Deptartment", width: 155, headerClassName: 'super-app-theme--header' },
        { field: "rate", headerName: "Rate", width: 140, headerClassName: 'super-app-theme--header' },
        { field: "unit", headerName: "Unit", width: 140, headerClassName: 'super-app-theme--header' },
        {
            field: "Action", headerName: "Action", width: 170, headerAlign: "center", headerClassName: 'super-app-theme--header',
            renderCell: (params) =>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Chip color='secondary' label="Edit" size='medium' onClick={() => getSubDeptDetails(params.row.subDept, params.row.deptId)} icon={<ModeEditOutlineOutlined />} />
                    <Chip icon={<HighlightOffRounded fontSize='small' />} color='error' label="Delete" size='medium' disabled={loading} onClick={() => handledelete(params.row._id, params.row.deptId)} />
                </Box>
        },
    ], [])

    return (
        <div>
            <Typography variant="h2" color="textSecondary" fontWeight="bold">Manage Sub-Department</Typography>


            {/* Update sub-department form  */}

            {editOpen && <form action="" onSubmit={handleSubmitForm}>
                <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mt="2rem" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>
                    <Typography variant="h4" color="textSecondary" fontWeight="bold">Update Sub-Department</Typography>
                    <TextField
                        fullWidth
                        label="Sub-Department"
                        size='small'
                        name='subDept'
                        type='text'
                        variant='outlined'
                        placeholder='Enter Sub Department Name'
                        required
                        value={data.subDept}
                        onChange={handleEdit}

                    />

                    <TextField
                        fullWidth
                        label="Rate"
                        size='small'
                        name='rate'
                        type='number'
                        variant='outlined'
                        placeholder='Enter Sub Department Name'
                        value={data.rate}
                        onChange={handleEdit}
                        required

                    />
                    <TextField
                        fullWidth
                        label="Unit"
                        size='small'
                        name='unit'
                        type='text'
                        variant='outlined'
                        placeholder='Enter Sub Department Name'
                        value={data.unit}
                        onChange={handleEdit}
                        required
                    />
                    <Stack direction={"row"}>
                        <Tooltip x title="Add Sub-Department">
                            <Button sx={{ mx: "1rem" }} variant="contained" color='primary' type='submit' >
                                Update
                            </Button>
                        </Tooltip>
                        <Tooltip title="Add Sub-Department">
                            <Button variant="contained" color='error' onClick={() => seteditOpen(false)}>
                                Cancel
                            </Button>
                        </Tooltip>
                    </Stack>
                </Stack>
            </form>}

            {/*Add New sub-department form  */}
            {
                !editOpen && <form action="" onSubmit={handleSubmit}>
                    <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

                        <TextField
                            select
                            fullWidth
                            label="Select Department  for "
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
                        <Button variant='contained' onClick={() => setOpen(true)} size='small' sx={{ justifySelf: "end", }}>Add New Department</Button>
                        {open &&
                            <>

                                <TextField
                                    id=""
                                    label="Sub-Department"
                                    size='small'
                                    onChange={handleChange}
                                    name='subDept'
                                    placeholder='Enter Sub-department'
                                    value={values.subDept}
                                    onBlur={handleBlur}
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
                                    variant='outlined'
                                    placeholder='Enter Unit'
                                    value={values.unit}
                                    onBlur={handleBlur}
                                    onChange={handleChange}

                                />
                                {errors.unit && touched.unit ? <Typography variant="caption" color="error">{errors.unit}</Typography> : null}
                                <Stack direction={"row"}>
                                    <Tooltip x title="Add Sub-Department">
                                        <Button sx={{ mx: "1rem" }} variant="contained" color='primary' type='submit' >
                                            Add
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Add Sub-Department">
                                        <Button variant="contained" color='error' onClick={() => setOpen(false)}>
                                            Cancel
                                        </Button>
                                    </Tooltip>
                                </Stack>
                            </>
                        }
                        {subDept &&
                            <>
                                {!open && <Stack sx={{
                                    '& .super-app-theme--header': {
                                        backgroundColor: "#3366ff",
                                    },
                                    display: "grid",
                                    height: "40vh",

                                }}
                                >

                                    <DataGrid
                                        rows={subDept}
                                        key={row => row._id}
                                        columns={columns}
                                        getRowId={row => row._id}
                                        slots={{ toolbar: GridToolbar }}
                                        style={{
                                            backgroundColor: "rgb(0,0,0,0.6)",
                                            color: "white",
                                            textTransform: "capitalize",
                                            fontSize: "1rem", fontFamily: "Josefin Sans",
                                        }}
                                    />
                                </Stack>}
                            </>

                        }

                    </Stack>
                </form>
            }

            {/*ToastContainer for display pop-up messages  */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgdatasBar={true}
                newestOnTop={false}
                closeButton={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div >
    )
}

export default Subdepartment