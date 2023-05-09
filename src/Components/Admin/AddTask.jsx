import { AddTaskTwoTone, } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import { addTask } from '../Validation/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCompany } from '../../Redux/Action/Admin';

const AddTask = () => {
    const [open, setOpen] = React.useState(false);
    const { company, loading } = useSelector(state => state.admin)
    const dispatch = useDispatch();
    const handleClose = () => { 
        setOpen(false);
        // dispatch(getPeople())
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        dispatch(getCompany())
    }, [dispatch]);

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

    })
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >

                                        {company?.map((data) => (

                                            <MenuItem value={data.company}>{data.company}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {errors.company && touched.company ? <Typography variant="caption" color="error">{errors.company}</Typography> : null}
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
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTask