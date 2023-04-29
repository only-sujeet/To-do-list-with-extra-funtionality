import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {  PeopleTwoTone } from '@mui/icons-material';
import { useFormik } from 'formik';
import { addprofile } from '../Validation/Admin';

const AddPeople = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const initialvalue = {
        company: "",
        field: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        dob: "",
        age: "",
        mobileno: "",
        altmobileno: "",
        address1: "",
        address2: "",
    }
    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalue,
        validationSchema: addprofile,
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            resetForm({ values: "" })
        }

    })
    return (
        <div>
            <Tooltip title="Add People">

                <IconButton aria-label="add People" onClick={handleClickOpen}>
                    <PeopleTwoTone color='primary' />
                </IconButton>

            </Tooltip>
            <Dialog open={open} onClose={handleClose} maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "90%", md: "80%", xs: "80%" }, position: "fixed", m: 0, top: 40, } }} >
                <DialogTitle> <Typography variant="h6" color="initial">Add People</Typography></DialogTitle>
                <DialogContent>
                    <form action="" onSubmit={handleSubmit}>
                        <Grid container spacing={2} >
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <FormControl fullWidth
                                    variant='filled'>
                                    <InputLabel color='secondary'>Company</InputLabel>
                                    <Select
                                        color='secondary'
                                        label="Company"
                                        id="Company"
                                        value={values.company}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <MenuItem value="ink1">Ink1</MenuItem>
                                        <MenuItem value="ink2">Ink2</MenuItem>
                                        <MenuItem value="ink3">Ink3</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.company && touched.company ? <Typography variant="caption" color="error">{errors.company}</Typography>: null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <FormControl variant='filled' fullWidth>
                                    <InputLabel color='secondary'>Field</InputLabel>
                                    <Select
                                        color='secondary'
                                        id='Field'
                                        label="Field"
                                        value={values.field}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <MenuItem value="ink1">Ink1</MenuItem>
                                        <MenuItem value="ink2">Ink2</MenuItem>
                                        <MenuItem value="ink3">Ink3</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.field && touched.field ? <Typography variant="caption" color="error">{errors.field}</Typography>: null}
                            </Grid>
                            <Grid item lg={4} sm={12} xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="fname"
                                    label="First Name"
                                    name='firstName'
                                    type="text"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.firstName && touched.firstName ? <Typography variant="caption" color="error">{errors.firstName}</Typography>: null}
                            </Grid>
                            <Grid item lg={4} sm={12} xs={12} md={4}>
                                <TextField

                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="middleName"
                                    label="Middle Name"
                                    name='middleName'
                                    type="text"
                                    value={values.middleName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                 {errors.middleName && touched.middleName ? <Typography variant="caption" color="error">{errors.middleName}</Typography>: null}
                            </Grid>
                            <Grid item lg={4} sm={12} xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="lastName"
                                    label="Last Name"
                                    name='LastName'
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                 {errors.lastName && touched.lastName ? <Typography variant="caption" color="error">{errors.lastName}</Typography>: null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="email"
                                    label="Email"
                                    name='email'
                                    type="email"
                                    helperText="Example : abc@gmail.com"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                 {errors.email && touched.email ? <Typography variant="caption" color="error">{errors.email}</Typography>: null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='success'
                                    id="dob"
                                    label="Date of Birth"
                                    name='dob'
                                    type="date"
                                    InputLabelProps={{ shrink: true, }}
                                    value={values.dob}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    focused
                                />
                                 {errors.dob && touched.dob ? <Typography variant="caption" color="error">{errors.dob}</Typography>: null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="age"
                                    label="Age"
                                    name='age'
                                    type="number"
                                    value={values.age}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                 {errors.age && touched.age ? <Typography variant="caption" color="error">{errors.age}</Typography>: null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="mobileno"
                                    label="Mobile No."
                                    name='mobileno'
                                    type="number"
                                    value={values.mobileno}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                 {errors.mobileno && touched.mobileno ? <Typography variant="caption" color="error">{errors.mobileno}</Typography>: null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="altmobileno"
                                    label="Alternate Mobile No"
                                    name='altmobileno'
                                    type="number"
                                    value={values.altmobileno}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                 {errors.altmobileno && touched.altmobileno ? <Typography variant="caption" color="error">{errors.altmobileno}</Typography>: null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="address1"
                                    label="Address 1"
                                    name='address1'
                                    type="text"
                                    value={values.address1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                 {errors.address1 && touched.address1 ? <Typography variant="caption" color="error">{errors.address1}</Typography>: null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="address2"
                                    label="Address 2"
                                    name='address2'
                                    type="text"
                                    value={values.address2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                 {errors.address2 && touched.address2 ? <Typography variant="caption" color="error">{errors.address2}</Typography>: null}
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
        </div>
    )
}

export default AddPeople