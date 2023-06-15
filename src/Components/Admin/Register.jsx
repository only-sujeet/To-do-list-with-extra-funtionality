import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import image from '../Images/register.png'
import TextField from '@mui/material/TextField'
import { InputAdornment, Button, Box } from '@mui/material'
import { BusinessTwoTone, EmailTwoTone, PasswordTwoTone } from '@mui/icons-material'
import { useFormik } from 'formik'
import { register } from '../Validation/Admin'
import { adminRegister } from '../../api/Admin'
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {

  const initialvalue = {
    email: "",
    password: "",
    company: "",
  }

  const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialvalue,
    validationSchema: register,
    onSubmit: async (values, { resetForm }) => {
      const  res  = await adminRegister(values)
      if (res.success === true) {
            toast.success(res.message)
            resetForm({ values: "" })
        }
        if (res.success === false) {
            toast.error(res.message)
        }
      // console.log(data)
    }

  })
  return (

    <Container maxWidth="xs" sx={{ backgroundColor: "transparent", height: { xs: "100%", sm: "40%", md: "35%", lg: "60%" }, m: "auto auto", borderRadius: "10px" }}  >
      <Typography variant="h6" color="initial" m="10px auto" align='center'><img src={image} alt="register" height="50px" width="50px" /></Typography>
      <Typography variant="h2" color="initial" align='center'>Register</Typography>
      <form action="" onSubmit={handleSubmit}  >

        <TextField
          fullWidth

          label="Email"
          name='email'
          variant='standard'
          color='secondary'
          type='email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          InputLabelProps={{ style: { fontSize: 20 } }}
          InputProps={{
            startAdornment: (<InputAdornment position="start"> <EmailTwoTone color='secondary' /></InputAdornment>)
          }}
          sx={{ marginBottom: "10px" }}
        />
        {errors.email && touched.email ? <Typography variant="caption" color="error">{errors.email}</Typography> : null}
        <TextField
          fullWidth
          id="password"
          label="Password"
          name='password'
          variant='standard'
          color='secondary'
          type='password'
          size="small"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          InputLabelProps={{ style: { fontSize: 20 } }}
          InputProps={{
            startAdornment: (<InputAdornment position="start"> <PasswordTwoTone color='secondary' /></InputAdornment>)
          }}
          sx={{ marginBottom: "10px" }}
        />
        <Typography variant="caption" color="error"> {errors.password && touched.password ? errors.password : null}</Typography>
        <TextField
          fullWidth
          id="company"
          label="Company Name"
          name='company'
          variant='standard'
          color='secondary'
          type='text'
          size="small"
          value={values.company}
          onChange={handleChange}
          onBlur={handleBlur}
          InputLabelProps={{ style: { fontSize: 20 } }}
          InputProps={{
            startAdornment: (<InputAdornment position="start"> <BusinessTwoTone color='secondary' /></InputAdornment>)
          }}
          sx={{ marginBottom: "10px" }}
        />
        {errors.company && touched.company ? <Typography variant="caption" color="error">{errors.company}</Typography> : null}

        <Box m="10px">
          <Button type='submit' fullWidth variant="contained" color="primary"  >
            Register
          </Button>
        </Box>
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
    </Container>

  )
}

export default Register