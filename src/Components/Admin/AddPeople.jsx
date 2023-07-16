import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Divider, } from '@mui/material';
import { PersonAdd, } from '@mui/icons-material';
import { useFormik } from 'formik';
import { addprofile } from '../Validation/Admin';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPeople, getDept, getSubDept } from '../../api/Admin';
import { getPeople } from '../../Redux/Action/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            minWidth: 35,
            minHeight: 35,
            paddingLeft: 3,
            paddingRight: 3,
            "& .MuiButton-startIcon": {
                margin: 0
            }
        }
    },
    buttonText: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
            // borderRadius:"50px"
        }
    }
}));

const AddPeople = () => {
    const classes = useStyles();
    React.useEffect(() => {
        getDepartment();
    }, []);
    const [hover, setHover] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState();
    const [image, setImage] = useState()

    const [dept, setDept] = React.useState();
    const [subDept, setSubDept] = React.useState();

    const getDepartment = async () => {
        const { data } = await getDept()
        data && setDept(data)
    }


    const handleGetSubDept = async (e) => {
        handleChange(e)
        const data = await getSubDept({ department: e.target.value })
        data && setSubDept(data)
    }

    const dispatch = useDispatch()
    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleImage = (e) => {
        const file = e.target.files[0];
        setFile(file)
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }



    const initialvalue = {
        department: "",
        subDept: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        dob: "",
        doj: "",
        age: "",
        mobileno: "",
        altmobileno: "",
        address1: "",
        address2: "",
        adharno: "",
        panno: "",
        acNo: "",
        ifscCode: "",
        upiId: "",
    }
    const { errors, touched, values, handleBlur, handleChange, handleSubmit, resetForm, isSubmitting, setFieldValue } = useFormik({
        initialValues: initialvalue,
        validationSchema: addprofile,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                if (file) {

                    const formdata = new FormData()
                    formdata.append('file', file)
                    formdata.append('data', JSON.stringify(values))

                    const res = await addPeople(formdata)
                    setSubmitting(false)
                    if (res.success === true) {
                        toast.success(res.message)
                        resetForm({ values: "" })
                        setOpen(false)
                        dispatch(getPeople())
                    }
                    if (res.success === false) {
                        toast.error(res.message)
                    }
                    resetForm({ values: "" })
                }
                else {

                    alert("Please Select File")
                }

            } catch (error) {
                console.log(error.message)
            }
        }
    })

    const handleClose = () => {
        setOpen(false);
        dispatch(getPeople())
        resetForm();
    };

    const handleReset = () => {
        resetForm();
    }

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    const handleChangeAge = (event) => {
        handleChange(event)
        const age = calculateAge(event.target.value);
        setFieldValue('age', age);
    };



    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen} size='small' sx={{ mr: 1, borderRadius: "20px" }} onMouseOver={() => setHover(true)} onMouseOut={() => { setHover(false) }}
                startIcon={<PersonAdd />} className={classes.button}>
                <Typography variant="h6" color="whitesmoke" className={classes.buttonText} >
                    {hover ? ("Add Employee Menually") : (`Add Employee`)}
                </Typography>
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "90%", md: "80%", xs: "80%" }, position: "fixed", m: 0, top: 40, } }} >
                <DialogTitle> <Typography variant="h6" color="initial" >Add Employee</Typography></DialogTitle>
                <DialogContent>
                    <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
                        <Grid container spacing={2} >

                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <FormControl variant='filled' fullWidth>
                                    <InputLabel color='secondary'>Department</InputLabel>
                                    <Select
                                        color='secondary'
                                        id='Field'
                                        label="Depatment"
                                        name='department'
                                        value={values.department}
                                        onChange={handleGetSubDept}
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
                                    <InputLabel color='secondary'>Sub-Department</InputLabel>
                                    <Select
                                        color='secondary'
                                        id='subField'
                                        label="Sub-Depatment"
                                        name='subDept'
                                        value={values.subDept}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {values.department
                                            ?
                                            subDept && subDept?.map((data) => (
                                                <MenuItem value={data.subDept}>{data.subDept}</MenuItem>
                                            ))
                                            : <MenuItem >Please First Select Department</MenuItem>
                                        }

                                    </Select>
                                </FormControl>
                                {errors.subDept && touched.subDept ? <Typography variant="caption" color="error">{errors.subDept}</Typography> : null}
                            </Grid>

                            <Grid item lg={6} sm={12} xs={12} md={6}>

                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id=""
                                    label="Upload Photo"
                                    name=''
                                    type="file"
                                    InputLabelProps={{ shrink: true, }}
                                    inputProps={{ style: { textTransform: "capitalize" } }}

                                    onChange={handleImage}

                                />
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <img style={{ width: "10rem" }} src={image} alt="" />
                            </Grid>
                            <Grid item lg={4} sm={12} xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="fname"
                                    label="First Name"
                                    name='firstName'
                                    placeholder='Enter  First Name'
                                    type="text"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                />
                                {errors.firstName && touched.firstName ? <Typography variant="caption" color="error">{errors.firstName}</Typography> : null}
                            </Grid>
                            <Grid item lg={4} sm={12} xs={12} md={4}>
                                <TextField

                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="middleName"
                                    label="Middle Name"
                                    placeholder='Enter  Middle Name'
                                    name='middleName'
                                    type="text"
                                    value={values.middleName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                />
                                {errors.middleName && touched.middleName ? <Typography variant="caption" color="error">{errors.middleName}</Typography> : null}
                            </Grid>
                            <Grid item lg={4} sm={12} xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="lastName"
                                    label="Last Name"
                                    placeholder='Enter Last Name'
                                    name='lastName'
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                />
                                {errors.lastName && touched.lastName ? <Typography variant="caption" color="error">{errors.lastName}</Typography> : null}
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
                                    placeholder='Enter Email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {errors.email && touched.email ? <Typography variant="caption" color="error">{errors.email}</Typography> : null}
                            </Grid>

                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="doj"
                                    label="Date of Joining"
                                    placeholder='Enter Date of Joining'
                                    name='doj'
                                    type="date"
                                    InputLabelProps={{ shrink: true, }}
                                    value={values.doj}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {errors.doj && touched.doj ? <Typography variant="caption" color="error">{errors.doj}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="dob"
                                    label="Date of Birth"
                                    placeholder='Enter Date of Birth'
                                    name='dob'
                                    type="date"
                                    InputLabelProps={{ shrink: true, }}
                                    value={values.dob}
                                    onChange={handleChangeAge}
                                    onBlur={handleBlur}

                                />
                                {errors.dob && touched.dob ? <Typography variant="caption" color="error">{errors.dob}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="age"
                                    label="Age"
                                    placeholder='Enter Age'
                                    name='age'
                                    type="text"
                                    value={values.age}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.age && touched.age ? <Typography variant="caption" color="error">{errors.age}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="adharno"
                                    label="Adhar Card No."
                                    placeholder='Enter Your Adhar Card No.'
                                    name='adharno'
                                    type="number"
                                    value={values.adharno}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.adharno && touched.adharno ? <Typography variant="caption" color="error">{errors.adharno}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="panno"
                                    label="Pan Card No."
                                    placeholder='Enter Your Pan Card No.'
                                    name='panno'
                                    type="text"
                                    value={values.panno}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.panno && touched.panno ? <Typography variant="caption" color="error">{errors.panno}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="mobileno"
                                    label="Mobile No."
                                    placeholder='Enter Your Moblie No.'
                                    name='mobileno'
                                    type="number"
                                    value={values.mobileno}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                />
                                {errors.mobileno && touched.mobileno ? <Typography variant="caption" color="error">{errors.mobileno}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="altmobileno"
                                    label="Alternate Mobile No"
                                    placeholder='Enter Your Alternate Mobile No.'
                                    name='altmobileno'
                                    type="number"
                                    value={values.altmobileno}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                />
                                {errors.altmobileno && touched.altmobileno ? <Typography variant="caption" color="error">{errors.altmobileno}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="address1"
                                    label="Address 1"
                                    placeholder='Enter Your Address'
                                    name='address1'
                                    type="text"
                                    value={values.address1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "capitalize" } }}

                                />
                                {errors.address1 && touched.address1 ? <Typography variant="caption" color="error">{errors.address1}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="address2"
                                    label="Address 2 (Optional)"
                                    placeholder='Enter Your Second Address'
                                    name='address2'
                                    type="text"
                                    value={values.address2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "capitalize" } }}

                                />
                                {errors.address2 && touched.address2 ? <Typography variant="caption" color="error">{errors.address2}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <Divider textAlign='left'>
                                    <Typography variant='caption'>Bank Details</Typography>
                                </Divider>
                            </Grid>
                           
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="acNo"
                                    label="Account Number"
                                    placeholder='Enter Your Account Number'
                                    name='acNo'
                                    type="number"
                                    value={values.acNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "uppercase" } }}

                                />
                                {errors.acNo && touched.acNo ? <Typography variant="caption" color="error">{errors.acNo}</Typography> : null}
                            </Grid> 
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="ifscCode"
                                    label="Ifsc Code"
                                    placeholder='Enter Your Ifsc Code'
                                    name='ifscCode'
                                    type="text"
                                    value={values.ifscCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {errors.ifscCode && touched.ifscCode ? <Typography variant="caption" color="error">{errors.ifscCode}</Typography> : null}
                            </Grid>
                             <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    variant='standard'
                                    id="upiId"
                                    label="upiId"
                                    placeholder='Enter Your Upi Id'
                                    name='upiId'
                                    type="text"
                                    value={values.upiId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "capitalize" } }}

                                />
                                {errors.upiId && touched.upiId ? <Typography variant="caption" color="error">{errors.upiId}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <Button variant="contained" color='primary' type='submit' disabled={isSubmitting} >
                                    Add
                                </Button>
                                <Button variant="contained" color='secondary' type='button' onClick={handleReset} sx={{ ml: 1 }} >
                                    Reset
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

export default AddPeople