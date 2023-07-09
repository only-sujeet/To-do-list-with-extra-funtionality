import React from 'react'
import { Box, Button, IconButton, InputAdornment, TextField, Typography, Grid, Paper } from '@mui/material'
import image from '../Images/login7.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../Validation/Admin';
import { adminLogin } from '../../api/Admin';
import { adminLog } from '../../Redux/Action/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Login1 = () => {
  const [type, setType] = React.useState("password")
  const [visible, setVisible] = React.useState(false)
  const icon = (visible ? <Visibility color='secondary' /> : <VisibilityOff color='secondary' />)
  const showClick = () => {
    if (visible === false) {
      setVisible(true)
      setType("text")
    }
    else {
      setVisible(false)
      setType("password")
    }
  }
  const navigate = useNavigate()
  const isAuthenticated = Cookies.get('Token')
  isAuthenticated && navigate("/dashboard")

  const initialvalue = {
    email: "",
    password: ""
  }
  const dispatch = useDispatch()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: initialvalue,
    validationSchema: login,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      // console.log(values)
      const res = await adminLogin(values)
      // await dispatch(adminLog(values))
      setSubmitting(false)
      if (res.success === true) {
        toast.success(res.message)
        navigate("/dashboard")
        resetForm({ values: "" })
      }
      if (res.success === false) {
        toast.error(res.message)
      }
    }
  })

  return (
    <Grid container component='main' sx={{ height: "100vh" }}>
      <Grid item xs={false} sm={6} md={8} sx={{
        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>

      </Grid>
      <Grid item xs={12} sm={6} md={4} component={Paper} elevation={10} square >
        <Box
          maxWidth="sm"
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
          }}>

          <Typography variant="h6" color="initial" m="15px auto" align='center'><img src={image} alt="register" height="100px" width="100px" /></Typography>
          <Typography variant="h2" color="secondary" align="center" sx={{ marginBottom: "10px" }}  >Sign In</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              color='secondary'
              sx={{ marginBottom: "15px", }}
              size='small'
              label="Email"
              type='email'
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ shrink: true, }}
              placeholder='Enter Your Email'
              variant='standard'
            />
            {errors.email && touched.email ? <Typography variant="caption" color="error">{errors.email}</Typography> : null}
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="password"
              size='small'
              label="Password"
              type={type}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ shrink: true, }}
              color='secondary'
              placeholder='Enter Your Password'
              variant='standard'
              name='password'
              InputProps={{
                endAdornment: (<InputAdornment position="end"> <IconButton onClick={showClick}>
                  {icon}
                </IconButton> </InputAdornment>)
              }}
            />
            {errors.password && touched.password ? <Typography variant="caption" color="error">{errors.password}</Typography> : null}<br></br>
            <Typography
              // className={classes.title}
              variant="caption"
              noWrap
              color="initial"

            >
              If you Don't have Account ? <Typography variant="caption" color="textPrimary" to="/register" component={Link} sx={{ textDecoration: "none", color: "blue" }}>Create a New Account</Typography>
            </Typography>
            <Box m="10px">

              <Button variant="contained" type='submit' sx={{ borderRadius: "20px", mt: "10px" }} disabled={isSubmitting} fullWidth>
                Sign In
              </Button>
            </Box>

          </form>
        </Box>
      </Grid>

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
    </Grid>
  )
}

export default Login1
