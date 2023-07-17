import { Button, Chip, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { addSubDept } from '../Validation/Admin'
import { addSubDepartment, delSubDept, editSubDept, getDept, getSubDept, getSubDeptInfo, } from '../../api/Admin'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from 'react'
import { HighlightOffRounded, ModeEditOutlineOutlined } from '@mui/icons-material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box } from '@material-ui/core'
import { useState } from 'react'
import { blue, grey } from '@mui/material/colors'
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
    const [status, setStatus] = useState(false)
    const handler = (status) => {
        setStatus(status)
    }

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
        unit: "",
        taskDependencySubDept:""
    }

    // Sub-Department Add Fucntion 
    const { errors, touched, values, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: initialvalues,
        validationSchema: addSubDept,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            // console.log(values)
            const { data } = await addSubDepartment(values)
            setSubmitting(false)
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
    // console.log(data)
    const columns = useMemo(dept => [
        { field: "subDept", headerName: "Sub-Deptartment", width: 160, headerClassName: "header", headerAlign: "center", align: "center", },
        { field: "rate", headerName: "Rate", width: 40, headerClassName: "header", headerAlign: "center", align: "center", },
        { field: "unit", headerName: "Unit", width: 40, headerClassName: "header", headerAlign: "center", align: "center", },
        { field: "taskDependencySubDept", headerName: "Task Dependency ", width: 184, headerClassName: "header", headerAlign: "center", align: "center", },
        {
            field: "Action", headerName: "Action", width: 180, headerClassName: "header", headerAlign: "center", align: "center",
            renderCell: (params) =>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Chip color='secondary' label="Edit" size='small' onClick={() => getSubDeptDetails(params.row.subDept, params.row.deptId)} icon={<ModeEditOutlineOutlined fontSize='small' />} sx={{ mr: 1 }} />
                    <Chip icon={<HighlightOffRounded fontSize='small' />} color='error' label="Delete" size='small' disabled={loading} onClick={() => handledelete(params.row._id, params.row.deptId)} />
                </Box>
        },
    ], [])

    return (
        <div style={{ marginBottom: "2rem" }}>
            <Typography variant="h3" color="textSecondary" fontWeight="bold">Manage Sub-Department</Typography>


            {/* Update sub-department form  */}

            {editOpen && <form action="" onSubmit={handleSubmitForm} autoComplete='on'>
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
                !editOpen && <form action="" onSubmit={handleSubmit} autoComplete='on'>
                    <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

                        <TextField
                            select
                            fullWidth
                            label="Select Department "
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
                                    inputProps={{ style:{ textTransform:"capitalize"}}}
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
                                    inputProps={{ style:{ textTransform:"capitalize"}}}

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
                                    inputProps={{ style:{ textTransform:"capitalize"}}}

                                />
                                {errors.unit && touched.unit ? <Typography variant="caption" color="error">{errors.unit}</Typography> : null}
                                <FormControl>
                                    <Typography variant="body1" color="initial">Do You Want Task Dependency :</Typography>
                                    <RadioGroup row aria-label="dategroup" defaultValue="number" name='date group'>

                                        <FormControlLabel value='date' label={<Typography variant="h4" color="initial">Yes</Typography>} control={<Radio onClick={(e) => { handler(true) }} />}></FormControlLabel>
                                        <FormControlLabel value='number' label={<Typography variant="h4" color="initial">No</Typography>} control={<Radio onClick={(e) => { handler(false) }} />}></FormControlLabel>
                                    </RadioGroup>
                                </FormControl>
                                {
                                    status === true && <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }} >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Task Dependency Sub-Department "
                                            size='small'
                                            name='taskDependencySubDept'
                                            type='text'
                                            variant='standard'
                                            onChange={handleChange}
                                            value={values.taskDependencySubDept}
                                            onBlur={handleBlur}
                                        >
                                            {
                                                subDept && subDept?.map((data) => (
                                                    <MenuItem value={data.subDept}>{data.subDept}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        {errors.taskDependencySubDept && touched.taskDependencySubDept ? <Typography variant="caption" color="error">{errors.taskDependencySubDept}</Typography> : null}
                                    </Stack>
                                }

                                <Stack direction={"row"}>
                                    <Tooltip x title="Add Sub-Department">
                                        <Button sx={{ mx: "1rem" }} variant="contained" color='primary' type='submit' size='small' disabled={isSubmitting} >
                                            Add
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Add Sub-Department">
                                        <Button variant="contained" color='error' size='false' onClick={() => setOpen(false)}>
                                            Cancel
                                        </Button>
                                    </Tooltip>
                                </Stack>
                            </>
                        }
                        {subDept &&
                            <>

                                {!open &&
                                    <>
                                        <Box justifyContent="left !important" display="flex !important">
                                            <Button variant='contained' color='secondary' onClick={() => setOpen(true)} size='small' sx={{ maxWidth: 200, }}>Add New Sub-Department</Button>
                                        </Box>
                                        <Stack sx={{
                                            display: "grid",
                                            height: "35vh",
                                        }}
                                        >

                                            <DataGrid
                                                rows={subDept}
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
                                                }}
                                            />
                                        </Stack>
                                    </>
                                }
                            </>

                        }

                    </Stack>
                </form>
            }

        </div >
    )
}

export default Subdepartment