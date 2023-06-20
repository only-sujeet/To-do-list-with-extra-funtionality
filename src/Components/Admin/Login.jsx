import React, { useEffect, useState } from 'react'
import { Container, InputAdornment, makeStyles, TextField, IconButton, Button, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { login } from '../Validation/Admin';
import { adminLogin } from '../../api/Admin';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { adminLog } from '../../Redux/Action/Admin';

const layout = makeStyles(theme =>
({

  const: {
    display: "block",
    fontFamily: "Yrsa",
    borderRadius: "10px",
    boxShadow: "3px 3px 6px",
    [theme.breakpoints.up('xs')]: {
      // backgroundColor: 'purple',
      margin: "230px auto",
      width: "80vw",
      height: "45vh",
    },
    [theme.breakpoints.up('sm')]: {
      // backgroundColor: 'red',
      margin: "380px auto",
      width: "80vw",
      height: "30vh",
      padding: "10px"
    },
    [theme.breakpoints.up('md')]: {
      //  backgroundColor: 'green',
      margin: "450px auto",
      width: "60vw",
      height: "24vh",
      padding: "10px"

    },
    [theme.breakpoints.up('lg')]: {
      //  backgroundColor: 'yellow',
      width: "30vw",
      height: "39vh",
      margin: "180px auto",
    },
    [theme.breakpoints.up('xl')]: {
      // backgroundColor: 'blue',

    },
  },
  input: {
    margin: "5px auto",
    padding: "5px auto",
    fontFamily: "Yrsa",
    fontSize: "100px"
  },
  btn: {
    fontSize: "15px",
    fontWeight: "15px",
    margin: "10px auto",
    fontFamily: "Yrsa",
    backgroundColor: "green",
    borderRadius: "100px",
    "&:hover": {
      backgroundColor: "blue"
    }
  },
  head: {
    fontFamily: "Yrsa",
    margin: "auto",
  }
})
)


const Login = () => {
  const classes = layout();
  const theme = useTheme();
  const showText = useMediaQuery(theme.breakpoints.up('xs'))
  const [type, setType] = useState("password")
  const [visible, setVisible] = useState(false)
  const icon = (visible ? <Visibility /> : <VisibilityOff />)
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

  const { loginData } = useSelector(s => s.admin)
  const navigate = useNavigate()


  loginData && navigate("/dashboard")

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
      dispatch(adminLog(values))
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
    <>

      {showText &&
        <Container className={classes.const} >
          <form onSubmit={handleSubmit}>
            <Typography variant="h2" className={classes.head} align="center" >Login</Typography>
            <TextField
              fullWidth
              className={classes.input}
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
              className={classes.input}
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
            <Button variant="contained" type='submit' className={classes.btn} fullWidth>
              Sign In
            </Button>

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
        </Container>}
    </>
  )
}

export default Login