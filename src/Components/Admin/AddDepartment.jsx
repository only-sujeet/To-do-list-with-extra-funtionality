import * as React from 'react';
import { Button, TextField, Stack, Tooltip, Select, InputLabel, Typography } from '@mui/material';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl } from '@material-ui/core';
import { useFormik } from 'formik';
import { adddep } from '../Validation/Admin';
import { useSelector } from 'react-redux';
import { addDepartment, getField } from '../../api/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDepartment = () => {
    const [open, setOpen] = React.useState(false);
    const { loading, company } = useSelector(state => state.admin)
    const [dept, setDept] = React.useState([]);
    const [tdept, setTDept] = React.useState([]);

    const [com, setCom] = React.useState();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        setDept(company)
    }, [company])



    const initialvalues = {

    }

    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalues,
        validationSchema: adddep,
        onSubmit: async (values, { resetForm }) => {
            const res = await addDepartment(values)
            if (res.success === true) {
                toast.success(res.message)
                resetForm({ values: "" })
            }
            if (res.success === false) {
                toast.error(res.message)
            }
            console.log(values)
        }
    })
    return (
        <div>

            <Typography variant="h2" color="textSecondary" fontWeight="bold">Mange Department</Typography>
            <form action="" onSubmit={handleSubmit}>
                <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

                    <TextField

                        fullWidth
                        label="Add Department"
                        size='small'
                        name='department'
                        type='text'
                        variant='outlined'
                        placeholder='Enter Department Name'
                        value={values.department}
                        onBlur={handleBlur}
                        onChange={handleChange}

                    />
                    {errors.field && touched.field ? <Typography variant="caption" color="error">{errors.field}</Typography> : null}
                    <Tooltip title="Add Department">
                        <Button variant="contained" color='primary' type='submit' >
                            Add
                        </Button>
                    </Tooltip>


                </Stack>
            </form>
            <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

                <TableContainer component={Paper}>
                    <Table aria-label='a dense table' size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' >Your Department Name's</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                tdept >= 0 ? <Typography align='center' color="initial">Department Not Found</Typography>
                                    :
                                    !loading ? tdept?.map((data) => (

                                        <TableRow key={data._id}>
                                            <TableCell>{data.field}</TableCell>
                                        </TableRow>
                                    ))
                                        : undefined
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>

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

export default AddDepartment