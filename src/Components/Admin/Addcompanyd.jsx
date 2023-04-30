import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Tooltip } from '@mui/material';
import { BusinessTwoTone } from '@mui/icons-material';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@material-ui/core';
import { useFormik } from 'formik';
import { addcom } from '../Validation/Admin';
import { addCompany } from '../../api/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { getCompany } from '../../Redux/Action/Admin';
const Addcompanyd = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()

 
    const { loading, company } = useSelector(state => state.admin)

    const initialvalue = {
        company: ""
    }
    // console.log(company)
    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalue,
        validationSchema: addcom,
        onSubmit: async (values, { resetForm }) => {
            const { data } = await addCompany(values)
            console.log(data)
            resetForm({ values: "" })
        }

    })

    React.useEffect(() => {
        dispatch(getCompany())
    }, []);
    return (
        <div>
            <Tooltip title="Add Company">

                <IconButton aria-label="add Company" onClick={handleClickOpen}>
                    <BusinessTwoTone color='primary' />
                </IconButton>

            </Tooltip>
            <Dialog open={open} onClose={handleClose} maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "100%", md: "60%", xs: "80%" }, position: "fixed", m: 0, top: 60, } }} >
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
                            {errors.company && touched.company ? <Typography variant="caption" color="error">{errors.company}</Typography> : null}
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
                                    {/* {loading ? <CircularProgress /> : */}
                                        
                                        <TableBody>
                                        
                                            {company <=0 ? <TableRow>
                                                <TableCell>
                                                    <Typography variant="h5" color="primary">No Company Added</Typography>
                                                </TableCell>
                                            </TableRow>  :   company?.map((data) => (
                                                <TableRow key={data._id}>
                                                    <TableCell>{data.company}</TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    {/* } */}
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