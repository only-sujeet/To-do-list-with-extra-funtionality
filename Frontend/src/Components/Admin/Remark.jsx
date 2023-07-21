import { useFormik } from 'formik';
import React from 'react'
import { remarks } from '../Validation/Admin';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { DoDisturbOnTwoTone } from '@mui/icons-material';
import { remark } from '../../api/Admin';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { getCompletedTask, } from '../../Redux/Action/Admin'

const Remark = ({id}) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const initialvalue = {
        remarks: ""
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalue,
        validationSchema: remarks,
        onSubmit: async (values) => {
            // console.log(values)
            // console.log(id)
            const res = await remark(id, values)
            if (res.success === true) {
                toast.success(res.message)
                setOpen(false);
                dispatch(getCompletedTask())
            }
            if (res.success === false) {
                toast.error(res.message)
            }
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
                            label="Remarks"
                            name='remarks'
                            type="text"
                            value={values.remarks}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.remarks && touched.remarks ? <Typography variant="caption" color="error">{errors.remarks}</Typography> : null}
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

export default Remark
