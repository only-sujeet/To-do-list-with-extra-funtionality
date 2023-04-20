import React, { useState } from 'react'
import back from './Images/back.jpg'
import { Box, Container, InputAdornment, makeStyles, TextField, IconButton, Button, Typography } from '@material-ui/core';
// import { Button } from '@mui/material';
import {  Visibility, VisibilityOff } from '@mui/icons-material';
import { borderRadius } from '@mui/system';
// import { TextField } from '@mui/material';
// import './Login.css';

const layout = makeStyles({
  box: {
    backgroundImage: `url(${back})`,
    backgroundSize:"cover",
    width: "100%",
    height: "auto",
    paddingTop: "10rem",
  },
  const: {
    display: "flex",
    width: "50%",
    fontFamily: "Yrsa",
    alignItems: "center",
    margin: "auto 50px",
    float:"right",
    borderRadius: "10px",
  },
  input: {
    width: "80%",
    margin: "5px auto",
    padding: "5px auto",
    fontFamily: "Yrsa",
    fontSize:"100px"
  },
  const1: {
    margin: "10px auto",
  },
  btn: {
    // color:"crimson",
    margin: "10px auto",
    width: "80%",
    fontFamily: "yrsa",
    backgroundColor: "green",
    borderRadius:"10px"
  },
  head: {
    fontFamily: "Yrsa",
    margin: "10px auto"
  }
})


const Login = () => {
  const classes = layout();
  const [type, setType] = useState("password")
  const [visible, setVisible] = useState(false)
  const icon = (visible ? <Visibility  /> : <VisibilityOff />)
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
  return (
    <>
      <div className={classes.box}>
        <Container maxWidth="sm" className={classes.const} >
          <Box className={classes.const1}>
            <Typography variant="h2"  className={classes.head} >Login</Typography>
            <TextField
              className={classes.input}
              id="Email"
              size='small'
              label="Email"
              type='email'
              placeholder='Enter Your Email'
              variant='outlined'
            />
            <TextField
              className={classes.input}
              id="password"
              size='small'
              label="Password"
              type={type}
              placeholder='Enter Your Password'
              variant='filled'
             
              InputProps={{
                endAdornment: (<InputAdornment position="end"> <IconButton onClick={showClick}>
                  {icon}
                </IconButton> </InputAdornment>)
              }}
            />
            <Button variant="contained" className={classes.btn}>
              Sign In
            </Button>
          </Box>
         
        </Container>
      </div>
    </>
  )
}

export default Login