import * as React from 'react';
import { Button, TextField, Stack, Tooltip, Select, InputLabel,Typography } from '@mui/material';
import { MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  FormControl, FormLabel, FormHelperText, } from '@material-ui/core';
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

    const handleCompany = async (e) => {
        setCom(e.target.value)
        console.log(e.target.value)
        const { data } = await getField(e.target.value);
        setTDept(data)

    }

    console.log(tdept)
    const initialvalues = {
        company: "",
        field: ""
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

        }
    })
    return (
        <div>

            <Typography variant="h2" color="textSecondary" fontWeight="bold">Mange Sub-Department</Typography>
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
                        {!loading ? company?.map((data) => (

                            <MenuItem value={data.company}>{data.company}</MenuItem>
                        )) : undefined
                        }
                    </TextField>
                    {errors.company && touched.company ? <Typography variant="caption" color="error">{errors.company}</Typography> : null}
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
                    {errors.field && touched.field ? <Typography variant="caption" color="error">{errors.field}</Typography> : null}
                    <Tooltip title="Add Department">
                        <Button variant="contained" color='primary' type='submit' >
                            Add
                        </Button>
                    </Tooltip>


                </Stack>
            </form>
            <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>
                <FormControl fullWidth variant='filled'  >
                    <InputLabel  color='secondary' >Select Company</InputLabel>
                    <Select
                       color='secondary'
                       label="Company"
                       id="Company"
                       size='small'
                        onChange={handleCompany}
                        value={com}

                    >
                        {!loading ? company?.map((data) => (

                            <MenuItem value={data.company}>{data.company}</MenuItem>
                        )) : undefined}
                    </Select>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table aria-label='a dense table' size='small'>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>Company Name</TableCell> */}
                                <TableCell>Department Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading ? tdept?.map((data) => (
                                <TableRow key={data}>
                                    <TableCell>{data}</TableCell>
                                </TableRow>
                            ))
                                : undefined}

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