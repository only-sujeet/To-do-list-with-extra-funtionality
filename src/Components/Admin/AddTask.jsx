import { AddTaskTwoTone, } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtask, getField } from '../../api/Admin';
import { getCompany, getTask } from '../../Redux/Action/Admin';
import { addTask } from '../Validation/Admin';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getCompany } from '../../Redux/Action/Admin';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddTask = () => {
    const dispatch = useDispatch()
    const { company } = useSelector(state => state.admin)
    const [open, setOpen] = React.useState(false);
    const [dept, setDept] = useState([]);

    const handleClose = () => {
        setOpen(false);
        dispatch(getTask())
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        dispatch(getCompany())
    }, [dispatch])


    const initialvalue = {
        name: "",
        description: "",
        field: "",
        agency: "",
        taskDependency: "",
        QTY: "",
        amount: "",
    }
    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalue,
        validationSchema: addTask,
        onSubmit: async (values, { resetForm }) => {
            const res = await addtask(values)
            if (res.success === true) {
                toast.success(res.message)
                resetForm({ values: "" })
                //dispatch(getCompany())

            }
            if (res.success === false) {
                toast.error(res.message)
            }
        }

    })
    const handleTwoFunc = async (e) => {
        handleChange(e)
        const { data } = await getField(e.target.value);
        setDept(data)
    }
    const handleTwoFunc2 = async (e) => {
        handleChange(e)

    }

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
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="description"
                                    label="Description"
                                    name='description'
                                    type="text"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.description && touched.description ? <Typography variant="caption" color="error">{errors.description}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <FormControl fullWidth
                                    variant='filled'>
                                    <InputLabel color='secondary'>Agency</InputLabel>
                                    <Select
                                        color='secondary'
                                        label="Agency"
                                        id="agency"
                                        name='agency'
                                        value={values.agency}
                                        // onChange={handleCompany}
                                        onChange={handleTwoFunc}
                                        onBlur={handleBlur}
                                    >

                                        {company?.map((data) => (

                                            <MenuItem value={data.company}>{data.company}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {errors.agency && touched.agency ? <Typography variant="caption" color="error">{errors.agency}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <FormControl variant='filled' fullWidth>
                                    <InputLabel color='secondary'>Department</InputLabel>
                                    <Select
                                        color='secondary'
                                        id='field'
                                        label="Depatment"
                                        name='field'
                                        value={values.field}
                                        onChange={handleTwoFunc2}
                                        onBlur={handleBlur}
                                    >
                                        {values.agency ?
                                            dept && dept?.map((data) => (
                                                <MenuItem value={data.field}>{data.field}</MenuItem>
                                            ))
                                            : <MenuItem >Please First Select Company</MenuItem>}


                                    </Select>
                                </FormControl>
                                {errors.field && touched.field ? <Typography variant="caption" color="error">{errors.field}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="taskDependency"
                                    label="Task Dependency"
                                    name='taskDependency'
                                    type="text"
                                    value={values.taskDependency}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.taskDependency && touched.taskDependency ? <Typography variant="caption" color="error">{errors.taskDependency}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="QTY"
                                    label="Quantity"
                                    name='QTY'
                                    type="number"
                                    value={values.QTY}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.QTY && touched.QTY ? <Typography variant="caption" color="error">{errors.QTY}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="amount"
                                    label="amount"
                                    name='amount'
                                    type="number"
                                    value={values.amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.amount && touched.amount ? <Typography variant="caption" color="error">{errors.amount}</Typography> : null}
                            </Grid>
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
                autoClose={3000}
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