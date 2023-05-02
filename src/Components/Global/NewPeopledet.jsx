import * as React from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography, Tooltip, Grid } from '@mui/material';

const NewPeopledet = ({ com, dept, firstName, lastName, middleName, age, email, dob, mobileno, altmobileno, Image, address1, address2 }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Tooltip title="Add Company">

                {/* <IconButton aria-label="add Company" onClick={handleClickOpen}>
                    <BusinessTwoTone color='primary' />
                </IconButton> */}
                <Button variant="text" color="primary" onClick={handleClickOpen}>
                    Details
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} 
                PaperProps={{ sx: { width: { lg: "40%", sm: "80%", md: "60%", xs: "90%" }, position: "fixed", m: 0, top: 60, backgroundImage: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)', } }} >
                <DialogTitle ><Typography variant="h3" color="-moz-initial">Details</Typography></DialogTitle>
                <DialogContent>
                    <Avatar src={`http://localhost:5000/Image/${Image}`} style={{ cursor: "pointer", borderRadius: "50%", height: "150px", width: "150px", margin: "10px auto 20px auto" }} />
                    <Divider />
                    <Grid container spacing={2}>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                            <Typography variant="h4" color="initial"> Company:</Typography>
                            <Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> {com}</Typography>
                            <Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> Depatment: </Typography>
                            <Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> {dept}</Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> Full-Name:   </Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> {firstName} {middleName} {lastName}  </Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> Age: </Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> {age}</Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> Date of Birth:</Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> {dob}</Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> Email: </Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> {email}</Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> Mobile No.: </Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial">  {mobileno}</Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> Alternate Mobile No.:</Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> {altmobileno}</Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> Address 1: </Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> {address1}</Typography><Divider />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> Address 2: </Typography><Divider/>
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6} md={6}>
                        <Typography variant="h4" color="initial"> {address2}</Typography><Divider />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewPeopledet