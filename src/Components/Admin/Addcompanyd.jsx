import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Tooltip } from '@mui/material';
import { BusinessTwoTone } from '@mui/icons-material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@material-ui/core';
import { useFormik } from 'formik';
import { addcom } from '../Validation/Admin';
const Addcompanyd = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const row = [
        { name: "ink" },
        { name: "ink" },
        { name: "ink" },
        { name: "ink" },
    ]
    const initialvalue = {
        company: ""
    }
    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalue,
        validationSchema: addcom,
        onSubmit: (values , {resetForm}) => { 
            console.log(values)
        resetForm({values:""})
        }

    })

    return (
        <div>
            <Tooltip title="Add Company">

                <IconButton aria-label="add Company" onClick={handleClickOpen}>
                    <BusinessTwoTone color='primary' />
                </IconButton>

            </Tooltip>
            <Dialog open={open} onClose={handleClose} maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "100%", md: "60%", xs:"80%" }, position: "fixed", m: 0, top: 60, } }} >
                <DialogTitle>Add Company</DialogTitle>
                <DialogContent>
                    <form action="" onSubmit={handleSubmit}>
                        <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

                            <TextField
                                fullWidth
                                id="addcompany"
                                label="Add Company"
                                size='small'
                                name='company'
                                type='text'
                                variant='standard'
                                placeholder='Enter Company Name'
                                value={values.company}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.company && touched.company ? <Typography variant="caption" color="error">{errors.company}</Typography>: null}
                            <Tooltip title="Add Company">
                                <Button variant="contained" color='primary' type='submit' >
                                    Add
                                </Button>
                            </Tooltip>
                            <TableContainer component={Paper}>
                                <Table aria-label='a dense table' size='small'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Company Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell>{row.name}</TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Addcompanyd