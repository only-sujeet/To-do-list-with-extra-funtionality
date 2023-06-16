import { Button, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { addSubDept } from '../Validation/Admin'
import { useSelector } from 'react-redux'
import { addSubDepartment, addSubField, getDept, getField, getSubDept, getSubField } from '../../api/Admin'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Refdatah } from '@mui/icons-material'

const Subdepartment = () => {

    useEffect(() => {
        getDepartment();
    }, []);

    const [dept, setDept] = React.useState();
    const [subDept, setSubDept] = React.useState();

    const getDepartment = async () => {
        const { data } = await getDept()
        data && setDept(data)
    }
    const initialvalues = {

    }
    const handleGetSubDept = async (e) => {
        handleChange(e)
        const data = await getSubDept({ department: e.target.value })
        data && setSubDept(data)
    }


    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalues,
        validationSchema: addSubDept,
        onSubmit: async (values, { dataetForm }) => {
            const { data } = await addSubDepartment(values)
            if (data.success === true) {
                toast.success(data.message)
                getd(data.department)
                dataetForm({ values:null })
            }
            if (data.success === false) {
                toast.error(data.message)
            }
        }
    })

    const getd = async (value) => {
        const data = await getSubDept({ department: value })
        data && setSubDept(data)
    }

    return (
        <div>
            <Typography variant="h2" color="textSecondary" fontWeight="bold">Manage Sub-Department</Typography>
            <form action="" onSubmit={handleSubmit}>
                <Stack direction={{ xs: 'column', sm: 'column', md: "column", lg: "column" }} mb="10px" spacing={{ xs: 1, sm: 2, md: 4, lg: 2 }}>

                    <TextField
                        select
                        fullWidth
                        label="Select Department"
                        size='small'
                        name='department'
                        type='text'
                        variant='standard'
                        onChange={handleGetSubDept}
                        value={values.company}
                        onBlur={handleBlur}
                    >
                        {
                            dept && dept?.map((data) => (
                                <MenuItem value={data.department}>{data.department}</MenuItem>
                            ))
                        }
                    </TextField>
                    {errors.department && touched.department ? <Typography variant="caption" color="error">{errors.department}</Typography> : null}
                    <TextField
                        fullWidth
                        label="Add Sub-Department"
                        size='small'
                        name='subDept'
                        type='text'
                        variant='outlined'
                        placeholder='Enter Sub Department Name'
                        value={values.subField}
                        onBlur={handleBlur}
                        onChange={handleChange}

                    />
                    {errors.subDept && touched.subDept ? <Typography variant="caption" color="error">{errors.SubDept}</Typography> : null}
                    <Tooltip title="Add Sub-Department">
                        <Button variant="contained" color='primary' type='submit' >
                            Add
                        </Button>
                    </Tooltip>
                    <TableContainer component={Paper}>
                        <Table aria-label='a dense table' size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'   ><b> Sub-Departments</b>  </TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    subDept && subDept?.map((data) => (
                                        <TableRow key={data}>
                                            <TableCell>{data}</TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>

                        </Table>
                    </TableContainer>

                </Stack>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgdatasBar={true}
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

export default Subdepartment