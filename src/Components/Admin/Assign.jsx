import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Tooltip, Grid, Card, Box, CardContent, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AddHomeTwoTone, CalendarMonthTwoTone, DialpadTwoTone, NfcTwoTone, PeopleOutlineTwoTone } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dateFormat from 'dateformat';
import { getEmpByDept } from '../../api/Admin';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Assign = ({ name, rate, unit, taskDependency, instruction, startDate, endDate, id, department }) => {
    const [open, setOpen] = React.useState(false);


    const [emp, setEmp] = React.useState();

    const getEmp = async (dept) => {
        //const { data } = await getEmpByDept(dept)
        const { data } = await axios.post('/api/admin/getEmpByDept', { department: dept })
        data && setEmp(data)
    }
    const [empId, setEmpId] = React.useState();
    const handleEmp = (e) => {
        setEmpId(e.target.value)
    }
    const assign = async (empId, taskId) => {
        const res = await axios.post('/api/admin/assignTask', { empId, taskId })
        if (res.success === true) {
            toast.success(res.message)
            setOpen(false)
            

        }
        if (res.success === false) {
            toast.error(res.message)
        }
    }

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletepeople = async (ids) => {
        // const res = await deletePeople(ids)
        // if (res.success === true) {
        //     toast.success(res.message)
        // }
        // if (res.success === false) {
        //     toast.error(res.message)
        // }
        // setOpen(false);
        // dispatch(getPeople())

    }
    return (
        <div>
            <Tooltip title="Details">
                <Button variant="text" color="primary" size='medium' onClick={handleClickOpen}>
                    Assign
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}
                PaperProps={{ sx: { position: "fixed", m: 0, top: 0, backgroundImage: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)', } }} fullScreen>
                <DialogTitle align='center'><Typography variant="h3" color="-moz-initial"><Typography variant="h2" fontWeight="bold" color="initial">Assign</Typography></Typography></DialogTitle>
                <DialogContent>

                    <Card sx={{ display: "flex", width: "60%", margin: "20px auto" }}>
                        <Box sx={{
                            display: "flex", flexDirection:
                                { lg: "column", sm: "row", xs: "row", md: "column" }
                        }}>
                            <CardContent sx={{ flex: "1 0 auto" }}>
                                <Grid container spacing={2}>
                                    <Grid item lg={12} sm={12} xs={12} md={12}>

                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Task Name"
                                            value={name}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <AddHomeTwoTone color='secondary' /></InputAdornment>)
                                            }}

                                        />
                                    </Grid>
                                    <Grid item lg={12} sm={12} xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Rate"
                                            value={rate}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <NfcTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={12} sm={12} xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Unit"
                                            value={unit}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <PeopleOutlineTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={12} sm={12} xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Task Dependency"
                                            value={taskDependency}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <PeopleOutlineTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={12} sm={12} xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Instruction"
                                            value={instruction}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <CalendarMonthTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={12} sm={12} xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Start Date"
                                            value={dateFormat(startDate, "mmmm dS, yyyy")}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <PeopleOutlineTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={12} sm={12} xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="End Date"
                                            // value={endDate}
                                            value={dateFormat(endDate, "mmmm dS, yyyy")}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <DialpadTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={12} sm={12} xs={12} md={12}>
                                        {emp ? undefined : <Button fullWidth variant='contained' onClick={() => getEmp(department)} color="primary">Here Click Show Employee According To Task Department</Button>}
                                        {emp ? <FormControl variant='filled' fullWidth>
                                            <InputLabel color='secondary'>Employee</InputLabel>
                                            <Select
                                                color='secondary'
                                                id='Field'
                                                label="Employee"
                                                name='employee'
                                                onChange={handleEmp}

                                            >
                                                {
                                                    emp && emp?.map((data) => (
                                                        <MenuItem value={data._id}>{data.firstName} {data.middleName} {data.lastName}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl> : undefined}

                                        {empId ? <Button fullWidth sx={{ mt: "1rem" }} onClick={() => assign(empId, id)} variant='contained' color="primary">Assign Task</Button> : undefined}

                                    </Grid>

                                </Grid>
                            </CardContent>

                        </Box>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Tooltip title="Delete Profile" color='error' variant='contained' >
                        <Button aria-label="delete" onClick={() => deletepeople(id)}>
                            Delete
                        </Button>
                    </Tooltip>
                    <Button onClick={handleClose} color="secondary" variant='contained'>Close</Button>
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

export default Assign