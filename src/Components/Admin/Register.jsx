import React from 'react'
import Typography from '@mui/material/Typography'
import image from '../Images/login6.png'
import back from '../Images/register1.jpg'
import TextField from '@mui/material/TextField'
import { InputAdornment, Button, Box, Grid, Paper } from '@mui/material'
import { BusinessTwoTone, EmailTwoTone, PasswordTwoTone } from '@mui/icons-material'
import { useFormik } from 'formik'
import { register } from '../Validation/Admin'
import { adminRegister } from '../../api/Admin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom'

const Register = () => {

  const initialvalue = {
    email: "",
    password: "",
    company: "",
  }
  const navigate = useNavigate()
  const { errors, touched, values, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: initialvalue,
    validationSchema: register,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const res = await adminRegister(values)
      setSubmitting(false)
      if (res.success === true) {
        toast.success(res.message)
        resetForm({ values: "" })
        navigate("/login")

      }
      if (res.success === false) {
        toast.error(res.message)
      }
      // console.log(data)
    }

  })
  return (
    <Grid container component='main' sx={{ height: "100vh" }}>
      <Grid item xs={false} sm={6} md={8} sx={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
       

      }}>

      </Grid>
      <Grid item xs={12} sm={6} md={4} component={Paper} elevation={10} square sx={{
        backgroundColor:"whitesmoke"
      }} >
        <Box
          maxWidth="sm"
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            p: 2
            // alignItems: 'center',
          }}>
          <Typography variant="h6" color="initial" m="10px auto" align='center'><img src={image} alt="register" height="80px" width="80px" /></Typography>
          <Typography variant="h1" color="initial" align='center' fontWeight="bold">Register</Typography>
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
              <Button type='submit' fullWidth variant="contained" color="primary" disabled={isSubmitting} >
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
        </Box>
      </Grid>
    </Grid>
    // <Container maxWidth="xs" sx={{ backgroundColor: "transparent", height: { xs: "100%", sm: "40%", md: "35%", lg: "60%" }, m: "auto auto", borderRadius: "10px" }}  >

    // </Container>

  )
}

export default Register