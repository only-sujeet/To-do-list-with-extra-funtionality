import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Tooltip } from '@mui/material';
import { AddCircleOutlineRounded, BusinessTwoTone } from '@mui/icons-material';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@material-ui/core';
import { useFormik } from 'formik';
import { adddep } from '../Validation/Admin';

const AddDepartment = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const rowd = [
        { name: "ink", deparment: "abc" },
        { name: "ink", deparment: "abc" },
        { name: "ink", deparment: "abc" },
        { name: "ink", deparment: "abc" },
    ]

    const initialvalues = {
        company: "",
        field: ""
    }

    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalues,
        validationSchema: adddep,
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            resetForm({ values: "" })
        }
    })
    return (
        <div>
            <Tooltip title="Add Field">

                <IconButton aria-label="add Company" onClick={handleClickOpen}>
                    <AddCircleOutlineRounded color='warning' />
                </IconButton>

            </Tooltip>
            <Dialog open={open} onClose={handleClose} maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "100%", md: "60%", xs: "80%" }, position: "fixed", m: 0, top: 60, } }} >
                <DialogTitle fontFamily="Yrsa"> <Typography variant="h5" color="initial">Add Field</Typography>  </DialogTitle>
                <DialogContent>
                    <form action="" onSubmit={handleSubmit}>
                        <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

                            <TextField
                                select
                                fullWidth
                                label="Select Company"
                                size='small'
                                name='company'
                                type='text'
                                variant='standard'
                                onChange={handleChange}
                                value={values.company}
                                onBlur={handleBlur}
                            >
                                <MenuItem value='ink1'>Ink1</MenuItem>
                                <MenuItem value='ink2'>Ink2</MenuItem>
                                <MenuItem value='ink3'>Ink3</MenuItem>
                                <MenuItem value='ink4'>Ink4</MenuItem>
                                <MenuItem value='ink5'>Ink5</MenuItem>
                            </TextField>
                            {errors.company && touched.company ? <Typography variant="caption" color="error">{errors.company}</Typography>: null}
                            <TextField

                                fullWidth
                                label="Add Field"
                                size='small'
                                name='field'
                                type='text'
                                variant='outlined'
                                placeholder='Enter Field Name'
                                value={values.field}
                                onBlur={handleBlur}
                                onChange={handleChange}

                            />
                             {errors.field && touched.field ? <Typography variant="caption" color="error">{errors.field}</Typography>: null}
                            <Tooltip title="Add Department">
                                <Button variant="contained" color='primary' type='submit' >
                                    Add
                                </Button>
                            </Tooltip>

                            <TableContainer component={Paper}>
                                <Table aria-label='a dense table' size='small'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Company Name</TableCell>
                                            <TableCell>Department Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowd.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.deparment}</TableCell>
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

export default AddDepartment