import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Tooltip, Grid, Card, CardMedia, Box, CardContent, TextField, InputAdornment, Avatar } from '@mui/material';
import dateFormat from 'dateformat';
import { AccountBalanceTwoTone, AddHomeTwoTone, AddIcCallTwoTone, AlternateEmailTwoTone, ApartmentTwoTone, CalendarMonthTwoTone, CallTwoTone, CreditCard, CreditCardOutlined, DateRangeTwoTone, DialpadTwoTone, DomainTwoTone, HouseTwoTone, NfcTwoTone, PeopleOutlineTwoTone, PeopleTwoTone, Person3TwoTone, SignpostTwoTone, TtyTwoTone } from '@mui/icons-material';
import { deletePeople } from '../../api/Admin';
import { useDispatch } from 'react-redux';
import { getPeople } from '../../Redux/Action/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';

const useStyles = makeStyles({
    main: {
        backgroundColor: "#f0f0f0",
        borderRadius: "15px",
        boxShadow: "3px 3px",
    },
})

const NewPeopledet = ({ com, dept, firstName, lastName, middleName, age, email, dob, mobileno, altmobileno, Image, address1, address2, id,doj,adharno,panno,acNo,ifscCode,upiId,subDept}) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const classes = useStyles()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletepeople = async (ids) => {
        const res = await deletePeople(ids)
        if (res.success === true) {
            toast.success(res.message)
        }
        if (res.success === false) {
            toast.error(res.message)
        }
        setOpen(false);
        dispatch(getPeople())

    }
    return (
        <div>
            <Tooltip title="Details">
                <Button variant="text" color="secondary" onClick={handleClickOpen}>
                    Details
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}
                PaperProps={{ sx: { position: "fixed", m: 0, top: 0,  } }} fullScreen>
                <DialogTitle align='center'><Typography variant="h3" color="-moz-initial"><Typography variant="h2" fontWeight="bold" color="initial">Details</Typography></Typography></DialogTitle>
                <DialogContent>
                    
                    <Box className={classes.main} sx={{
                        width: { lg: "80%", md: "90%", sm: "100%", xs: "100%" }, margin: { lg: "20px auto", md: "20px auto", sm: "0px", xs: "0px" }, padding: { lg: "20px", md: "20px", sm: "10px", xs: "10px" }
                    }}>
                        <Grid container spacing={2}>
                            <Grid item lg={4} sm={4} xs={12} md={4}>
                                <Avatar sx={{ height: { lg: 250, md: 250, sm: 250, xs: 130 }, width: { lg: 310, md: 300, sm: 230, xs: 250 }, m: "10px auto" }} variant='rounded' alt='image' src={`http://localhost:5000/Image/${Image}`} />
                            </Grid>
                            <Grid item lg={4} sm={4} xs={12} md={4}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Name"
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    sx={{ mb: "8px" }}
                                    value={`${firstName} ${middleName} ${lastName}`}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <PeopleTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Date Of Birth"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={dayjs(dob).format('DD/MM/YYYY')}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <CalendarMonthTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Age"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={age}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <CalendarMonthTwoTone color='secondary' /></InputAdornment>)
                                    }}
                                />
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Adhar Card No."
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={adharno}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <Person3TwoTone color='secondary' /></InputAdornment>)
                                    }}
                                />
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Pan Card No."
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={panno}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <Person3TwoTone color='secondary' /></InputAdornment>)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={4} sm={4} xs={12} md={4}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Company"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={com}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <ApartmentTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Department"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={dept}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <DomainTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Sub-Department"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={subDept}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <DomainTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Date Of Joining"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    type='date'
                                    value={dayjs(doj).format('DD/MM/YYYY')}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <DateRangeTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Email Id"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={email}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <AlternateEmailTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />

                            </Grid>
                            <Grid item lg={6} sm={6} xs={12} md={6}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Mobile No."
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={mobileno}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <CallTwoTone color='secondary' /></InputAdornment>)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={6} sm={6} xs={12} md={6}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Alternate Mobile No."
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={altmobileno}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <AddIcCallTwoTone color='secondary' /></InputAdornment>)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Address"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={address1}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <HouseTwoTone color='secondary' /></InputAdornment>)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12} md={6}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Alternate Address"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={address2}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <HouseTwoTone color='secondary' /></InputAdornment>)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={4} sm={4} xs={12} md={4}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Account No."
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={acNo}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <AccountBalanceTwoTone color='secondary' /></InputAdornment>)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={4} sm={4} xs={12} md={4}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="Ifsc NO."
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={ifscCode}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <CreditCard color='secondary' /></InputAdornment>)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={4} sm={4} xs={12} md={4}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    color='secondary'
                                    label="UPI ID"
                                    sx={{ mb: "8px" }}
                                    inputProps={{ style: { fontSize: 16 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    autoFocus
                                    value={upiId}
                                    variant='standard'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <CreditCardOutlined color='secondary' /></InputAdornment>)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
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
        </div>
    )
}

export default NewPeopledet