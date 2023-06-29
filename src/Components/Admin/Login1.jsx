import React from 'react'
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import image from '../Images/login4.png'
import back from '../Images/back4.jpg'
import {  Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../Validation/Admin';
import { adminLogin } from '../../api/Admin';
import { adminLog } from '../../Redux/Action/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialvalue,
    validationSchema: login,
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      const res = await adminLogin(values)
      await dispatch(adminLog(values))
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
    <div style={{ backgroundImage:`url(${back})`, width:"100vw", backgroundRepeat:"no-repeat",backgroundSize:"cover",}}  >
        <Container maxWidth="xs" sx={{ backgroundColor:"transparent" , height: { xs: "100%", sm: "35%", md: "60%", lg: "50%" }, m:"10% auto", }}>
        <Typography variant="h6" color="initial" m="15px auto" align='center'><img src={image} alt="register" height="80px" width="80px" /></Typography>
        <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              sx={{ marginBottom: "10px" }}
              size='small'
              label="Email"
              type='email'
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
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
              placeholder='Enter Your Password'
              variant='standard'
              name='password'
              InputProps={{
                endAdornment: (<InputAdornment position="end"> <IconButton onClick={showClick}>
                  {icon}
                </IconButton> </InputAdornment>)
              }}
            />
            {errors.password && touched.password ? <Typography variant="caption" color="error">{errors.password}</Typography> : null}
            <Box m="10px">
            <Button variant="contained" type='submit'  fullWidth>
              Sign In
            </Button>
            </Box>

          </form>
        </Container>
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

export default Login1
