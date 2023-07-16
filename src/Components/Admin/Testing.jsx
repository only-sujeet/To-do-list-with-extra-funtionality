import { makeStyles } from '@material-ui/core'
import { AccountBalanceTwoTone, AddIcCallTwoTone, AlternateEmailTwoTone, ApartmentTwoTone,  CalendarMonthTwoTone, CallTwoTone, CreditCard, CreditCardOutlined,  DateRangeTwoTone,  DomainTwoTone, HouseTwoTone, PeopleTwoTone, Person3TwoTone,  } from '@mui/icons-material'
import { Avatar, Box,  Divider, Grid,  Typography, TextField, InputAdornment, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { deletePeople } from '../../api/Admin';
import { useDispatch } from 'react-redux';
import { getPeople } from '../../Redux/Action/Admin';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  main: {
    backgroundColor: "#f0f0f0",
    borderRadius: "15px",
    boxShadow: "3px 3px",
  },
})
const Testing = ({id}) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const Back = () => {
    navigate('/aprofile')
  }
  const dispatch = useDispatch()
  const deletepeople = async (ids) => {
    const res = await deletePeople(ids)
    if (res.success === true) {
        toast.success(res.message)
    }
    if (res.success === false) {
        toast.error(res.message)
    }

    dispatch(getPeople())

}

  return (
    <Box className={classes.main} sx={{ width: { lg: "80%", md: "90%", sm: "100%", xs: "100%" }, height: { lg: "95%", sm: "100%", md: "100%", xs: "200%" }, margin: { lg: "20px auto", md: "20px auto", sm: "0px", xs: "0px" }, padding: { lg: "20px", md: "20px", sm: "10px", xs: "10px" } }}>
      <Typography variant="h1" fontWeight='bold' align='center' color="initial">Details</Typography>
      <Grid container spacing={2}>
        <Grid item lg={4} sm={4} xs={12} md={4}>
          <Avatar sx={{ height: { lg: 250, md: 250, sm: 250, xs: 130 }, width: { lg: 310, md: 300, sm: 230, xs: 350 }, mr: "20px", ml: "20px" }} variant='rounded' alt='image' src={`https://source.unsplash.com/random?wallpapers`} />
        </Grid>
        <Grid item lg={4} sm={4} xs={12} md={4}>
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Name"
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            sx={{ mb: "8px" }}
            value="sujeet Kumar Maurya"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <PeopleTwoTone color='secondary' /></InputAdornment>)
            }}

          />
          {/* <Typography variant="body1" color="initial">Age :</Typography> */}
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Date Of Birth"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="23"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <CalendarMonthTwoTone color='secondary' /></InputAdornment>)
            }}

          />
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Age"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="23"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <CalendarMonthTwoTone color='secondary' /></InputAdornment>)
            }}
          />
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Adhar Card No."
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="232312345678"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <Person3TwoTone color='secondary' /></InputAdornment>)
            }}
          />
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Pan Card No."
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="232312345678"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <Person3TwoTone color='secondary' /></InputAdornment>)
            }}
          />
        </Grid>
        <Grid item lg={4} sm={4} xs={12} md={4}>
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Company"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="dfsad"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <ApartmentTwoTone color='secondary' /></InputAdornment>)
            }}

          />
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Department"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="content Writer"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <DomainTwoTone color='secondary' /></InputAdornment>)
            }}

          />
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Sub-Department"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value=" CO-content Writer"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <DomainTwoTone color='secondary' /></InputAdornment>)
            }}

          />
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Date Of Joining"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            type='date'
            value="02/02/2022"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <DateRangeTwoTone color='secondary' /></InputAdornment>)
            }}

          />
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Email Id"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value=" sujeet@gmail.com"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <AlternateEmailTwoTone color='secondary' /></InputAdornment>)
            }}

          />

        </Grid>
        <Grid item lg={6} sm={6} xs={12} md={6}>
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Mobile No."
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="5448554545"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <CallTwoTone color='secondary' /></InputAdornment>)
            }}
          />
        </Grid>
        <Grid item lg={6} sm={6} xs={12} md={6}>
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Alternate Mobile No."
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="5448554545"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <AddIcCallTwoTone color='secondary' /></InputAdornment>)
            }}
          />
        </Grid>
        <Grid item lg={6} sm={12} xs={12} md={6}>
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Address"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="5448554545"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <HouseTwoTone color='secondary' /></InputAdornment>)
            }}
          />
        </Grid>
        <Grid item lg={6} sm={12} xs={12} md={6}>
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Alternate Address"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="5448554545"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <HouseTwoTone color='secondary' /></InputAdornment>)
            }}
          />
        </Grid>
        <Grid item lg={4} sm={4} xs={12} md={4}>
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Account No."
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="544855454534"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <AccountBalanceTwoTone color='secondary' /></InputAdornment>)
            }}
          />
        </Grid>
        <Grid item lg={4} sm={4} xs={12} md={4}>
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="Ifsc NO."
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="544855454534"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <CreditCard color='secondary' /></InputAdornment>)
            }}
          />
        </Grid>
        <Grid item lg={4} sm={4} xs={12} md={4}>
          <TextField
            id="name"
            fullWidth
            color='secondary'
            label="UPI ID"
            sx={{ mb: "8px" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            autoFocus
            value="544855454534"
            variant='standard'
            size='small'
            InputProps={{
              startAdornment: (<InputAdornment position="start"> <CreditCardOutlined color='secondary' /></InputAdornment>)
            }}
          />
        </Grid>
      </Grid>
      <Divider variant='middle'></Divider>
      sdfsdf
      <Divider variant='middle'></Divider>
      <Box display='flex' justifyContent='flex-end' alignItems='center'>
        <Button aria-label="delete" variant="text" size='large' sx={{ fontWeight: "bold", fontSize: 18 }} onClick={() => deletepeople(id)}>
          Delete
        </Button>
        <Button variant="text" size='large' sx={{ fontWeight: "bold", fontSize: 18 }} color="primary" onClick={Back}>
          Back
        </Button>


      </Box>
    </Box>

  )
}

export default Testing
