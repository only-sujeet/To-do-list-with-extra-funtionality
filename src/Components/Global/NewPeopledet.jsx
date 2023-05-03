import * as React from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography, Tooltip, Grid, Card, CardMedia, Box, CardContent, TextField, InputAdornment } from '@mui/material';
import dateFormat from 'dateformat';
import { AddHomeTwoTone, AddRoadTwoTone, AlternateEmailTwoTone, CalendarMonthTwoTone, DialpadTwoTone, NfcTwoTone, PeopleOutlineTwoTone, SignpostTwoTone, TtyTwoTone } from '@mui/icons-material';
import { deletePeople } from '../../api/Admin';
import { useDispatch } from 'react-redux';
import { getPeople } from '../../Redux/Action/Admin';
const NewPeopledet = ({ com, dept, firstName, lastName, middleName, age, email, dob, mobileno, altmobileno, Image, address1, address2, id }) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletepeople = async (ids) => {
        await deletePeople(ids)
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
                PaperProps={{ sx: { position: "fixed", m: 0, top: 0, backgroundImage: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)', } }} fullScreen>
                <DialogTitle align='center'><Typography variant="h3" color="-moz-initial"><Typography variant="h2" fontWeight="bold" color="initial">Details</Typography></Typography></DialogTitle>
                <DialogContent>

                    <Card sx={{ display: "flex", width: "80%", margin: "20px auto" }}>
                        <CardMedia
                            component="img"
                            sx={{ width: { lg: 400, md: 300, sm: 350, xs: 0 }, height: "auto", }}
                            image={`http://localhost:5000/Image/${Image}`}
                            alt="Live from space album cover"
                        />
                        <Box sx={{
                            display: "flex", flexDirection:
                                { lg: "column", sm: "row", xs: "row", md: "column" }
                        }}>
                            <CardContent sx={{ flex: "1 0 auto" }}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} sm={12} xs={12} md={6}>

                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Company"
                                            value={com}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <AddHomeTwoTone color='secondary' /></InputAdornment>)
                                            }}

                                        />
                                    </Grid>
                                    <Grid item lg={6} sm={12} xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Department"
                                            value={dept}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <NfcTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={4} sm={12} xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="First Name"
                                            value={firstName}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <PeopleOutlineTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={4} sm={12} xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Middle Name"
                                            value={middleName}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <PeopleOutlineTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={4} sm={12} xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Last Name"
                                            value={lastName}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <PeopleOutlineTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={6} sm={12} xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Age"
                                            value={age}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <DialpadTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={6} sm={12} xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Date of Birth"
                                            value={dateFormat(dob, "mmmm dS, yyyy")}
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
                                            label="Email"
                                            value={email}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <AlternateEmailTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={6} sm={12} xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Mobile No."
                                            value={mobileno}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <TtyTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={6} sm={12} xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Alternate Mobile No."
                                            value={altmobileno}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <TtyTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
                                    </Grid>


                                    <Grid item lg={12} sm={12} xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Address 1"
                                            value={address1}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <SignpostTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />

                                    </Grid>
                                    <Grid item lg={12} sm={12} xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label="Address 2"
                                            value={address2}
                                            size="small"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <SignpostTwoTone color='secondary' /></InputAdornment>)
                                            }}
                                        />
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
        </div>
    )
}

export default NewPeopledet