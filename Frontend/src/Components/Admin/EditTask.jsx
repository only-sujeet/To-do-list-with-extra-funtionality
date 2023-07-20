import { DeleteForeverTwoTone, } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createTask, getDept, getOneTask, getSubDept, getSubDeptDetails } from '../../api/Admin';
import { getTask } from '../../Redux/Action/Admin';
import { addTasks } from '../Validation/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            minWidth: 35,
            minHeight: 35,
            paddingLeft: 7,
            paddingRight: 7,
            "& .MuiButton-startIcon": {
                margin: 0
            }
        }
    },
    buttonText: {
        [theme.breakpoints.down("sm")]: {
            display: "none",

        }
    }
}));



const EditTask = () => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const [hover, setHover] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [datas, setDatas] = React.useState({
        name: "",
        rate: "",
        unit: "",
        department: "",
        subDepartment: "",
        instruction: "",
        taskDependency: "",
        startDate: "",
        endDate: ""
    });
    const [val, setVal] = useState([])
    const [dept, setDept] = React.useState();
    const [subDept, setSubDept] = React.useState();
    const [taskDepend, setTaskDepend] = React.useState();
    const [status, setStatus] = useState(false)
    const { _id } = useParams()

    const [daysdata, setDaysdata] = useState({
        number: "",
        selection: ""
    })

    React.useEffect(() => {
        getDepartment();

    }, []);
    React.useEffect(() => {
        getTask()
    }, []);

    const getTask = async () => {
        const data = await getOneTask(_id);
        console.log(data)
        data && setDatas(data)
        // setFieldValue('name', data.name)
        // setFieldValue('rate', data.rate)
        // setFieldValue('unit', data.unit)
        // // setFieldValue('department', data.department)
        // // setFieldValue('subDepartment', data.subDepartment)
        // setFieldValue('instruction', data.instruction)
        // // setFieldValue('taskDependency', data.taskDependencySubDept)
        // setFieldValue('startDate', data.startDate)
        // setFieldValue('endDate', data.endDate)
    }

    const handleday = (event) => {
        setDaysdata({
            ...daysdata, [event.target.name]: event.target.value
        })
    }

    const getDepartment = async () => {
        const { data } = await getDept()
        data && setDept(data)
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handler = (status) => {
        setStatus(status)
    }

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
        subDepartment: "",
        instruction: "",
        taskDependency: "",
        startDate: "",
        endDate: ""
    }
    const { errors, touched, values, handleBlur, handleChange, handleSubmit, resetForm, isSubmitting, setFieldValue } = useFormik({
        initialValues: initialvalue,
        validationSchema: addTasks,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            //     console.log(values)
            //     const res = await createTask(values, val, daysdata)
            //     setSubmitting(false)
            //     if (res.success === true) {
            //         toast.success(res.message)
            //         resetForm({ values: null }) 
            //         dispatch(getTask())
            //         setVal([])
            //         setDaysdata({ number:"", selection:""})
            //     }
            //     if (res.success === false) {
            //         toast.error(res.message)
            //     }

        }
    }
    )

    const handleTwoFunc2 = async (e) => {
        handleChange(e)
        const data = await getSubDept({ department: e.target.value })
        data && setSubDept(data)
        data && setTaskDepend(data)
    }

    const handleTwoFunc3 = async (e) => {
        handleChange(e)
        const data = await getSubDeptDetails({ department: values.department, subDept: e.target.value })
        setFieldValue('rate', data.rate)
        setFieldValue('unit', data.unit)
        setFieldValue('taskDependency', data.taskDependencySubDept)
    }
    const navigate = useNavigate()
    const handleClose = () => {
        navigate("../")
        setOpen(false);
        dispatch(getTask())
        resetForm();


    };
    const handleReset = () => {
        resetForm();
        setVal([])
        setDaysdata({ number: "", selection: "" })
    }

    return (
        <div>
            <Dialog open="true" onClose={handleClose} maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "90%", md: "60%", xs: "100%" }, position: "fixed", m: 0, top: 40, } }} >
                <DialogTitle> <Typography variant="h4" color="initial" fontWeight="bold" align='center'>Edit Task</Typography></DialogTitle>
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
                                    // value={values.name}
                                    value={datas.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    inputProps={{ style: { textTransform: "capitalize" } }}

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
                                        value={datas.department}
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
                                    <InputLabel color='secondary'>Sub-Department</InputLabel>
                                    <Select
                                        color='secondary'
                                        id='subDepartment'
                                        label="subDepartment"
                                        name='subDepartment'
                                        value={datas.taskDependency}
                                        onChange={handleTwoFunc3}
                                        onBlur={handleBlur}

                                    >
                                        {console.log(datas.taskDependency)}
                                        {
                                            subDept && subDept?.map((data) => (
                                                <MenuItem value={data.subDept}>{data.subDept}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                {errors.subDepartment && touched.subDepartment ? <Typography variant="caption" color="error">{errors.subDepartment}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <FormControl variant='filled' fullWidth>
                                    <InputLabel color='secondary'>Task Dependency</InputLabel>
                                    <Select
                                        color='secondary'
                                        id='taskDependency'
                                        label="taskDependency"
                                        name='taskDependency'
                                        value={datas.taskDependency}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {
                                            taskDepend && taskDepend?.map((data) => (
                                                <MenuItem value={data.subDept}>{data.subDept}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                {errors.taskDependency && touched.taskDependency ? <Typography variant="caption" color="error">{errors.taskDependency}</Typography> : null}
                            </Grid>

                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="rate"
                                    label="Rate"
                                    name='rate'
                                    type="number"
                                    value={datas.rate}
                                    aria-readonly
                                    onChange={handleChange}

                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                />
                                {errors.rate && touched.rate ? <Typography variant="caption" color="error">{errors.rate}</Typography> : null}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    id="unit"
                                    label="Unit"
                                    name='unit'
                                    type="text"
                                    value={datas.unit}
                                    aria-readonly

                                />
                                {errors.unit && touched.unit ? <Typography variant="caption" color="error">{errors.unit}</Typography> : null}
                            </Grid>


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
                                    value={datas.instruction}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                />
                                {errors.instruction && touched.instruction ? <Typography variant="caption" color="error">{errors.instruction}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <FormControl>
                                    <Typography variant="body1" color="initial">Do You Want Enter Start Date and Ending Date :</Typography>
                                    <RadioGroup row aria-label="dategroup" defaultValue="number" name='date group'>

                                        <FormControlLabel value='date' label={<Typography variant="h4" color="initial">Yes</Typography>} control={<Radio onClick={(e) => { handler(true) }} />}></FormControlLabel>
                                        <FormControlLabel value='number' label={<Typography variant="h4" color="initial">No</Typography>} control={<Radio onClick={(e) => { handler(false) }} />}></FormControlLabel>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {status === true && <Grid container spacing={2} sx={{ margin: "0px 10px" }}  >
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
                                        value={datas.startDate}
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
                                        value={datas.endDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.endDate && touched.endDate ? <Typography variant="caption" color="error">{errors.endDate}</Typography> : null}
                                </Grid>

                            </Grid>
                            }
                            {status === false &&

                                <Grid container spacing={2} sx={{ margin: "0px 10px" }}>
                                    <Grid item lg={12} sm={12} xs={12} md={6}>
                                        <Typography variant="h5" color="textSecondary" fontWeight="bold">Time Duration</Typography>
                                    </Grid>
                                    <Grid item lg={6} sm={12} xs={12} md={6}>

                                        <TextField
                                            fullWidth
                                            required
                                            variant='standard'
                                            color='secondary'
                                            id="Durationnumber"
                                            label="Duration Number"
                                            name='number'
                                            type="number"

                                            value={daysdata.number}
                                            onChange={handleday}

                                        />
                                    </Grid>
                                    <Grid item lg={6} sm={12} xs={12} md={6}>
                                        <FormControl variant='filled' fullWidth>
                                            <InputLabel color='secondary'>Duration</InputLabel>
                                            <Select
                                                required
                                                color='secondary'
                                                id='selection'
                                                label="Select Duration Type"
                                                name='selection'
                                                value={daysdata.selection}
                                                onChange={handleday}
                                                inputProps={{ style: { textTransform: "capitalize" } }}

                                            >
                                                <MenuItem value="Minute">Minute</MenuItem>
                                                <MenuItem value="Hour">Hour</MenuItem>
                                                <MenuItem value="Day">Day</MenuItem>
                                                <MenuItem value="Month">Month</MenuItem>
                                                <MenuItem value="Year">Year</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                            }
                            {/* <Divider variant='middle' /> */}
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <Divider variant='middle'>
                                    <Typography variant='caption'>Add Check List</Typography>
                                </Divider>
                            </Grid>
                            <Grid item lg={8} sm={8} xs={8} md={8}>
                                <Typography variant="subtitle1" color="initial">Click right side  button to add Checklist field</Typography>
                            </Grid>
                            <Grid item lg={4} sm={4} xs={4} md={4}>
                                <Button variant="contained" color="info" size='small' onClick={() => handleAdd()}  >
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
                                                    inputProps={{ style: { textTransform: "capitalize" } }}
                                                    onChange={e => handleChanges(e, i)}

                                                />
                                            </Grid>
                                            <Grid item lg={2} sm={2} xs={2} md={2}  >

                                                <Button aria-label="icon" variant='contained' size='small' onClick={() => handleDelete(i)}>
                                                    <DeleteForeverTwoTone color='error' />
                                                </Button>

                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <Button variant="contained" color='primary' type='submit' disabled={isSubmitting}>
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

        </div>
    )
}

export default EditTask
