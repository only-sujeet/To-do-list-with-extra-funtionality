import { AddTaskTwoTone, DeleteForeverTwoTone, } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, getDept, getSubDept, getSubDeptDetails } from '../../api/Admin';
import {  getTask } from '../../Redux/Action/Admin';
import { addTasks } from '../Validation/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddTask = () => {

    React.useEffect(() => {
        getDepartment();
    }, []);

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const [val, setVal] = useState([])
    const [dept, setDept] = React.useState();
    const [subDept, setSubDept] = React.useState();
    const [subDeptDetails, setSubDeptDetails] = React.useState();

    const getDepartment = async () => {
        const { data } = await getDept()
        data && setDept(data)
    }

    const handleClose = () => {
        setOpen(false);
        dispatch(getTask())
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

   

    const handleAdd = () => {
        const abc = [...val, []]
        setVal(abc)
    }

    const handleChanges = (onChangeValue, i) => {
        const inputdata = [...val]
        inputdata[i] = onChangeValue.target.value
        setVal(inputdata)
    }

    const handleDelete = (i) => {
        const delval = [...val]
        delval.splice(i, 1)
        setVal(delval)
    }



    const initialvalue = {
        name: "",
        rate: "",
        unit: "",
        department: "",
        instruction: "",
        taskDependency: "",
        startDate: "",
        endDate: ""
    }
    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalue,
        validationSchema: addTasks,
        onSubmit: async (values, { resetForm }) => {
            console.log(values)
            console.log(subDeptDetails)
            // const res = await createTask(values, val)
            // if (res.success === true) {
            //     toast.success(res.message)
            //     resetForm({ values: "" })
            //     dispatch(getTask())
            // }
            // if (res.success === false) {
            //     toast.error(res.message)
            // }

        }
    })

    const handleTwoFunc2 = async (e) => {
        handleChange(e)
        const data = await getSubDept({ department: e.target.value })
        data && setSubDept(data)

    }
    const handleTwoFunc3 = async (e) => {
        handleChange(e)
        const data = await getSubDeptDetails({ department: values.department, subDept: e.target.value })
        data && setSubDeptDetails(data)
    }

    // console.log(subDeptDetails)
    return (
        <div>
            <Tooltip title="Add Task">
                <IconButton aria-label="add People" onClick={handleClickOpen}>
                    <AddTaskTwoTone color='primary' />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "90%", md: "80%", xs: "80%" }, position: "fixed", m: 0, top: 40, } }} >
                <DialogTitle> <Typography variant="h4" color="initial" fontWeight="bold" align='center'>Add Task</Typography></DialogTitle>
                <DialogContent>
                    <form action="" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="name"
                                    label="Task Name"
                                    name='name'
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {errors.name && touched.name ? <Typography variant="caption" color="error">{errors.name}</Typography> : null}
                            </Grid>

                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <FormControl variant='filled' fullWidth>
                                    <InputLabel color='secondary'>Department</InputLabel>
                                    <Select
                                        color='secondary'
                                        id='department'
                                        label="Depatment"
                                        name='department'
                                        value={values.department}
                                        onChange={handleTwoFunc2}
                                        onBlur={handleBlur}
                                    >
                                        {
                                            dept && dept?.map((data) => (
                                                <MenuItem value={data.department}>{data.department}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </FormControl>
                                {errors.department && touched.department ? <Typography variant="caption" color="error">{errors.department}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <FormControl variant='filled' fullWidth>
                                    <InputLabel color='secondary'>Task Dependency</InputLabel>
                                    <Select
                                        color='secondary'
                                        id='taskDependency'
                                        label="taskDependency"
                                        name='taskDependency'
                                        value={values.taskDependency}
                                        onChange={handleTwoFunc3}
                                        onBlur={handleBlur}
                                    >
                                        {
                                            subDept && subDept?.map((data) => (
                                                <MenuItem value={data.subDept}>{data.subDept}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </FormControl>
                                {errors.taskDependency && touched.taskDependency ? <Typography variant="caption" color="error">{errors.taskDependency}</Typography> : null}
                            </Grid>
                            {
                                subDeptDetails &&
                                <>
                                    <Grid item lg={3} sm={12} xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            variant='standard'
                                            color='secondary'
                                            id="rate"
                                            label="Rate"
                                            name='rate'
                                            type="number"
                                            value={subDeptDetails && subDeptDetails.rate }
                                            aria-readonly
                                        />
                                        {errors.rate && touched.rate ? <Typography variant="caption" color="error">{errors.rate}</Typography> : null}
                                    </Grid>
                                    <Grid item lg={9} sm={12} xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            variant='standard'
                                            color='secondary'
                                            id="unit"
                                            label="Unit"
                                            name='unit'
                                            type="text"
                                            value={subDeptDetails && subDeptDetails.unit}
                                            aria-readonly

                                        />
                                        {errors.unit && touched.unit ? <Typography variant="caption" color="error">{errors.unit}</Typography> : null}
                                    </Grid>
                                </>
                            }

                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows="3"
                                    variant='filled'
                                    color='secondary'
                                    id="instruction"
                                    label="Instruction"
                                    name='instruction'
                                    type="text"
                                    value={values.instruction}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.instruction && touched.instruction ? <Typography variant="caption" color="error">{errors.instruction}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="startDate"
                                    label="Start Date"
                                    name='startDate'
                                    type="date"
                                    InputLabelProps={{ shrink: true, }}
                                    value={values.startDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.startDate && touched.startDate ? <Typography variant="caption" color="error">{errors.startDate}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="endDate"
                                    label="End Date"
                                    name='endDate'
                                    type="date"
                                    InputLabelProps={{ shrink: true, }}
                                    value={values.endDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.endDate && touched.endDate ? <Typography variant="caption" color="error">{errors.endDate}</Typography> : null}
                            </Grid>

                            <Grid item lg={8} sm={8} xs={8} md={8}>
                                <Typography variant="h5" color="initial">Add Check List</Typography>
                            </Grid>
                            <Grid item lg={4} sm={4} xs={4} md={4}>
                                <Button variant="contained" color="info" size='small' onClick={() => handleAdd()}>
                                    Add Column
                                </Button>
                            </Grid>
                            {
                                val.map((data, i) => {
                                    return (
                                        <Grid container spacing={2} sx={{ m: "0px 20px" }}  >
                                            <Grid item lg={10} sm={10} xs={10} md={10} >
                                                <TextField
                                                    size='small'
                                                    sx={{ mb: "3px" }}
                                                    fullWidth
                                                    name='chk'
                                                    label="Enter Check List Data"
                                                    value={data}
                                                    onChange={e => handleChanges(e, i)}

                                                />
                                            </Grid>
                                            <Grid item lg={2} sm={2} xs={2} md={2}  >

                                                <Button aria-label="icon" variant='contained' onClick={() => handleDelete(i)}>
                                                    <DeleteForeverTwoTone color='error' />
                                                </Button>

                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <Button variant="contained" color='primary' type='submit' >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer
                position="top-center"
                autoClose={1000}
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

export default AddTask