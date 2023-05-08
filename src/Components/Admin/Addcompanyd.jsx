import * as React from 'react';
import { Button, TextField,  Stack, Tooltip, Typography } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from '@material-ui/core';
import { useFormik } from 'formik';
import { addcom } from '../Validation/Admin';
import { addCompany,  } from '../../api/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { getCompany } from '../../Redux/Action/Admin';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Addcompanyd = () => {
    

    const dispatch = useDispatch()


    const { company } = useSelector(state => state.admin)

    const initialvalue = {
        company: ""
    }
    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalue,
        validationSchema: addcom,
        onSubmit: async (values, { resetForm }) => {
            const res = await addCompany(values)
            if (res.success === true) {
                toast.success(res.message)
                resetForm({ values: "" })
                dispatch(getCompany())

            }
            if (res.success === false) {
                toast.error(res.message)
            }

        }

    })

    React.useEffect(() => {
        dispatch(getCompany())
    }, [dispatch]);

    // const deletecompany = async (id) => {
    //     const res = await deleteCompany(id)
    //     if (res.success === true) {
    //         toast.success(res.message)
    //         dispatch(getCompany())
    //     }
    //     if (res.success === false) {
    //         toast.error(res.message)
    //     }
    // }
    return (
        <div>
             <Typography variant="h2" color="textSecondary" fontWeight="bold">Mange  Company</Typography>
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
                           
                            <TableBody>

                                {company <= 0 ? <TableRow>
                                    <TableCell>
                                        <Typography variant="body1" color="primary" align='center' >No Company Added</Typography>
                                    </TableCell>
                                </TableRow> : company?.map((data) => (
                                    <TableRow key={data._id}>
                                        <TableCell>{data.company}</TableCell>
                                        {/* <TableCell>
                                                    <IconButton aria-label="delete" onClick={() => deletecompany(data._id)} >
                                                        <DeleteTwoTone color='error' fontSize='medium' />
                                                    </IconButton>
                                                </TableCell> */}
                                    </TableRow>
                                ))}

                            </TableBody>
                            {/* } */}
                        </Table>
                    </TableContainer>
            </Stack>
                </form>
           
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

export default Addcompanyd