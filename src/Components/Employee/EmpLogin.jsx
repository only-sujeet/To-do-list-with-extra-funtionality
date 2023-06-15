import React from 'react'
import Container from '@mui/material/Container'
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { EmailTwoTone, PasswordTwoTone, Visibility, VisibilityOff } from '@mui/icons-material'
import { elogin } from '../Validation/Employee'
import { useFormik } from 'formik'
import { useState } from 'react'
import image from '../Images/login4.png'

const EmpLogin = () => {
  const [type, setType] = useState("password")
  const [visible, setVisible] = useState(false)
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

  const initialvalue = {
    email: "",
    password: "",
  }

  const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialvalue,
    validationSchema: elogin,
    onSubmit: async (values, { resetForm }) => {
      // const { data } = await adminRegister(values)
      // console.log(data)
      console.log(values)
    }

  })

  return (
    
    <Container maxWidth="xs" sx={{ backgroundColor: "lightskyblue", height: { xs: "100%", sm: "35%", md: "60%", lg: "50%" }, m:"auto auto", }}>
       <Typography variant="h6" color="initial" m="15px auto" align='center'><img src={image} alt="register" height="80px" width="80px" /></Typography>
      {/* <Typography variant="h2" color="initial" align='center'>Login</Typography> */}
      <form action="" onSubmit={handleSubmit}>

        <TextField
          fullWidth

          label="Email"
          name='email'
          variant='standard'
          color='secondary'
          type='email'
          placeholder='Enter Your Email'
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
          type={type}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Enter Your Password'
          variant='standard'
          name='password'
          InputLabelProps={{ style: { fontSize: 20 } }}
          InputProps={{startAdornment: (
              <InputAdornment InputAdornment position="start" ><PasswordTwoTone color='secondary' /></InputAdornment>
            ),
            endAdornment: (<InputAdornment position="end"> <IconButton onClick={showClick}>
              {icon}
            </IconButton> </InputAdornment>)
          }}
        />
        {errors.password && touched.password ? <Typography variant="caption" color="error">{errors.password}</Typography> : null}
        <Box m="10px">
          <Button type='submit' fullWidth variant="contained" color="primary"  >
            Login
          </Button>
        </Box>
      </form>
    </Container >
  )
}

export default EmpLogin