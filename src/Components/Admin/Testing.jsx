import { makeStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { AlternateEmail, Block, DateRangeTwoTone, Phone } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Tooltip, Typography, Fab, Chip } from '@mui/material'
import { blue, blueGrey, grey } from '@mui/material/colors'
import React from 'react'

const useStyles = makeStyles({
  main: {
    boxShadow: "2px 2px",
    borderRadius: "15px",
    backgroundColor: "#f0f0f0",
    padding: "8px",
    margin: "10px"
  },
  imageBox: {
    display: "flex",
    flexDirection: "row"
  },
  avatar: {
    margin: "10px"
  },
  nameBOx: {
    margin: "25px 20px 10px 25px"
  },
  constactBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: "10px"
  },
  Action: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: "10px",
    paddingRight: "10px"

  }
})
const Testing = () => {
  const classes = useStyles()
  return (
    <Box>

      <Grid container spacing={2}>
        <Grid item lg={4} sm={6} xs={12} md={4}>
          <Box className={classes.main}  >
            <Grid container className={classes.imageBox}>

              <Grid item lg={5} sm={5} xs={6} md={5}>
                <Avatar className={classes.avatar} sx={{ height: { lg: 120, md: 95, sm: 100, xs: 120 }, width: { lg: 120, md: 95, sm: 100, xs: 120 }, mr: "10px" }} variant='rounded' alt='image' src='https://source.unsplash.com/random?wallpapers' />
              </Grid>
              <Grid item lg={7} sm={7} xs={6} md={7} mt="15px" >
                <Typography variant="h3" color="initial" component='div' fontWeight='bold'>Jojnes Paul dfsssfsd</Typography>
                <Typography variant="h5" color="slateblue" component="span" m="8px 0px 4px 0px"> Content-Writer</Typography>
                <Typography variant="h5" color="slateblue" m="10px 0px"> Co Content-Writer</Typography>
                <Divider variant='fullWidth' sx={{ mt: "10px" }} />
              </Grid>
            </Grid>
            <Box className={classes.constactBox}>
              <Typography variant="h5" component='span' >   <DateRangeTwoTone sx={{ color: "blueviolet" }} />  : 01/02/2023</Typography>
              <Typography variant="h4" component='span' color="initial"><AlternateEmail color='secondary' />   :  sujeetm@gmail.com</Typography>
              <Typography variant="h5" component='span' >   <Phone sx={{ color: blue[900] }} />  : 1234567890</Typography>

            </Box>
            <Divider variant='fullWidth' />
            <Box className={classes.Action}>
              <Button variant="text" color="warning">
                Details
              </Button>

              <Button variant="contained" size='small' sx={{ color: grey[900], borderRadius: "25px", bgcolor: red['A700'] }} startIcon={<Block fontSize='small' />}>
                Block
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Testing
