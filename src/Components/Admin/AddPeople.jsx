import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Grid, Typography, FormControl, FormLabel, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import { BusinessTwoTone, PeopleTwoTone } from '@mui/icons-material';
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
        // validationSchema: addcom,
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
                PaperProps={{ sx: { width: { lg: "40%", sm: "100%", md: "60%", xs: "80%" }, position: "fixed", m: 0, top: 60, } }} >
                <DialogTitle> <Typography variant="h6" color="initial">Add People</Typography></DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} >
                        <Grid item lg={6} sm={12}  xs={12} md={6}>
                            <FormControl fullWidth
                            variant='filled'>
                                <InputLabel >Company</InputLabel>
                                <Select
                                    label="Company"
                                    id="Company"
                                >
                                    <MenuItem value="ink1">Ink1</MenuItem>
                                    <MenuItem value="ink2">Ink2</MenuItem>
                                    <MenuItem value="ink3">Ink3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6} sm={12} xs={12} md={6}>
                            <FormControl variant='filled' fullWidth>
                                <InputLabel>Field</InputLabel>
                                <Select
                                    id='Field'
                                    label="Field"

                                >
                                    <MenuItem value="ink1">Ink1</MenuItem>
                                    <MenuItem value="ink2">Ink2</MenuItem>
                                    <MenuItem value="ink3">Ink3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
<TextField
  id="fname"
  label="First Name"
  
/>
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

export default AddPeople