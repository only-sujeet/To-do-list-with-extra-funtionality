import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,  Grid, TextField, Tooltip, Typography, IconButton } from '@mui/material'
import {  useFormik } from 'formik';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import axios from 'axios';
import { reject } from '../Validation/Employee';
import { DoDisturbOnTwoTone } from '@mui/icons-material';


const Reject = ({ id }) => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const initialvalue = {
        reason: ""
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalue,
        validationSchema: reject,
        onSubmit: (values) => {
            console.log(values)
            console.log(id)
        }
    })
    return (
        <div>
            <Tooltip title="Reject Task">
               <IconButton aria-label="reject" onClick={handleClickOpen}>
                 <DoDisturbOnTwoTone color='error' fontSize='medium' />
               </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "90%", md: "80%", xs: "80%" }, position: "fixed", m: 0, top: 40, } }} >
                <DialogTitle> <Typography variant="h6" color="initial">Submit</Typography></DialogTitle>
                <DialogContent>
                    <form action="" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows="3"
                                    variant='filled'
                                    color='secondary'
                                    id="instruction"
                                    label="Reason"
                                    name='reason'
                                    type="text"
                                    value={values.reason}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.reason && touched.reason ? <Typography variant="caption" color="error">{errors.reason}</Typography> : null}
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <Button variant="contained" color='primary' type='submit' >
                                    Send
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

export default Reject
