import { Button, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { addSubDept } from '../Validation/Admin'
import { useSelector } from 'react-redux'
import { addSubField, getField, getSubField } from '../../api/Admin'

const Subdepartment = () => {

    const [dept, setDept] = useState();
    const [subDept, setSubDept] = useState();
    const [details, setdetails] = useState();
    const initialvalues = {

    }
    const { loading, company } = useSelector(state => state.admin)
    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalues,
        validationSchema: addSubDept,
        onSubmit: async (values, { resetForm }) => {
            const { data } = await addSubField(values)
            console.log(values)

        }
    })
    const handleTwoFunc = async (e) => {
        handleChange(e)
        const { data } = await getField(e.target.value);
        setDept(data)
    }


    const handleTwoFunc2 = async (e) => {
        handleChange(e)
        const getSubFieldDetails = (e) => {
            const { name, value } = e.target
            setdetails({
                ...details,
                [name]: value
            })
        }
    }

    console.log(details)
    return (
        <div>
            <Typography variant="h2" color="textSecondary" fontWeight="bold">Manage Sub-Department</Typography>
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
                        onChange={handleTwoFunc}
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
                        select
                        fullWidth
                        label="Select Company"
                        size='small'
                        name='filed'
                        type='text'
                        variant='standard'
                        onChange={handleTwoFunc2}
                        value={values.company}
                        onBlur={handleBlur}
                    >
                        {
                            values.company ?
                                !loading ? dept?.map((data) => (
                                    <MenuItem value={data.field}>{data.field}</MenuItem>

                                ))
                                    : undefined
                                : <MenuItem >Please First Select Company</MenuItem>
                        }
                    </TextField>
                    {errors.field && touched.field ? <Typography variant="caption" color="error">{errors.field}</Typography> : null}
                    <TextField

                        fullWidth
                        label="Add Sub-Department"
                        size='small'
                        name='subField'
                        type='text'
                        variant='outlined'
                        placeholder='Enter Sub Department Name'
                        value={values.subField}
                        onBlur={handleBlur}
                        onChange={handleChange}

                    />
                    {errors.subField && touched.subField ? <Typography variant="caption" color="error">{errors.subField}</Typography> : null}
                    <Tooltip title="Add Sub-Department">
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

                                {/* {company <= 0 ? <TableRow>
                                    <TableCell>
                                        <Typography variant="body1" color="primary" align='center' >No Company Added</Typography>
                                    </TableCell>
                                </TableRow> : company?.map((data) => ( */}
                                <TableRow key="id">
                                    <TableCell>hello</TableCell>
                                    {/* <TableCell>
                                                    <IconButton aria-label="delete" onClick={() => deletecompany(data._id)} >
                                                        <DeleteTwoTone color='error' fontSize='medium' />
                                                    </IconButton>
                                                </TableCell> */}
                                </TableRow>
                                {/* ))} */}

                            </TableBody>
                            {/* } */}
                        </Table>
                    </TableContainer>

                </Stack>
            </form>

        </div>
    )
}

export default Subdepartment