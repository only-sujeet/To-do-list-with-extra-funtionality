import * as React from 'react';
import { Button, TextField, Stack, Tooltip, Select, InputLabel, Typography } from '@mui/material';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl } from '@material-ui/core';
import { useFormik } from 'formik';
import { adddep } from '../Validation/Admin';
import { useSelector } from 'react-redux';
import { addDepartment, getDept, getField } from '../../api/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDepartment = () => {

    React.useEffect(() => {
        getDepartment();
    }, []);

    const [dept, setDept] = React.useState();

    const getDepartment = async () => {
        const { data } = await getDept()
        data && setDept(data)
    }
   
    const initialvalues = {}

    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalues,
        validationSchema: adddep,
        onSubmit: async (values, { resetForm }) => {
            const res = await addDepartment(values)
            if (res.success === true) {
                toast.success(res.message)
                resetForm({ values: "" })
                getDepartment();
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
                                dept && dept.map((data) => (
                                    <TableRow>
                                        <TableCell>{data.department}</TableCell>
                                    </TableRow>
                                ))
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