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
    margin: "20px 20px 10px 25px"
  },
  constactBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: "10px"
  },
 Action:{
 display:"flex",
justifyContent:"flex-end",
 alignItems:"center",
 paddingTop:"10px",
 paddingRight:"10px"
 
 }
})
const Testing = () => {
  const classes = useStyles()
  return (
    <Box>
      
      <Grid container spacing={2} width='100vw'>
        <Grid item lg={3} sm={6} xs={12} md={6}>
          <Box className={classes.main}  >
            <Box className={classes.imageBox}>
              <Avatar className={classes.avatar} sx={{ height: 120, width: 120 }} variant='rounded' alt='image' src='https://source.unsplash.com/random?wallpapers' />
              <Box className={classes.nameBOx}>
                <Typography variant="h2" color="initial" fontWeight='bold'>Jojnes Paul</Typography>
                <Typography variant="h5" color="slateblue" m="8px 0px 4px 0px"> Content-Writer</Typography>
                <Typography variant="h5" component="span" color="slateblue" m="10px 0px"> Co Content-Writer</Typography>
                <Divider variant='fullWidth' sx={{ mt: "10px" }} />
              </Box>
            </Box>
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
             
              <Button variant="contained" size='small'   sx={{ color:  grey[900], borderRadius:"25px" , bgcolor: red['A700']}} startIcon={<Block fontSize='small'/>}>
                Block
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3} sm={6} xs={12} md={6}>
          <Box className={classes.main}  >
            <Box className={classes.imageBox}>
              <Avatar className={classes.avatar} sx={{ height: 120, width: 120 }} variant='rounded' alt='image' src='https://source.unsplash.com/random?wallpapers' />
              <Box className={classes.nameBOx}>
                <Typography variant="h2" color="initial" fontWeight='bold'>Jojnes Paul</Typography>
                <Typography variant="h5" color="slateblue" m="8px 0px 4px 0px"> Content-Writer</Typography>
                <Typography variant="h5" component="span" color="slateblue" m="10px 0px"> Co Content-Writer</Typography>
                <Divider variant='fullWidth' sx={{ mt: "10px" }} />
              </Box>
            </Box>
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
             
              <Button variant="contained" size='small' color='error'  sx={{ color:  grey[900], borderRadius:"25px"}} startIcon={<Block fontSize='small'/>}>
                Block
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3} sm={6} xs={12} md={6}>
          <Box className={classes.main}  >
            <Box className={classes.imageBox}>
              <Avatar className={classes.avatar} sx={{ height: 120, width: 120 }} variant='rounded' alt='image' src='https://source.unsplash.com/random?wallpapers' />
              <Box className={classes.nameBOx}>
                <Typography variant="h2" color="initial" fontWeight='bold'>Jojnes Paul</Typography>
                <Typography variant="h5" color="slateblue" m="8px 0px 4px 0px"> Content-Writer</Typography>
                <Typography variant="h5" component="span" color="slateblue" m="10px 0px"> Co Content-Writer</Typography>
                <Divider variant='fullWidth' sx={{ mt: "10px" }} />
              </Box>
            </Box>
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
             
              <Button variant="contained" size='small' color='error'  sx={{ color:  grey[900], borderRadius:"25px"}} startIcon={<Block fontSize='small'/>}>
                Block
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3} sm={6} xs={12} md={6}>
          <Box className={classes.main}  >
            <Box className={classes.imageBox}>
              <Avatar className={classes.avatar} sx={{ height: 120, width: 120 }} variant='rounded' alt='image' src='https://source.unsplash.com/random?wallpapers' />
              <Box className={classes.nameBOx}>
                <Typography variant="h2" color="initial" fontWeight='bold'>Jojnes Paul</Typography>
                <Typography variant="h5" color="slateblue" m="8px 0px 4px 0px"> Content-Writer</Typography>
                <Typography variant="h5" component="span" color="slateblue" m="10px 0px"> Co Content-Writer</Typography>
                <Divider variant='fullWidth' sx={{ mt: "10px" }} />
              </Box>
            </Box>
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
             
              <Button variant="contained" size='small' color='error'  sx={{ color:  grey[900], borderRadius:"25px"}} startIcon={<Block fontSize='small'/>}>
                Block
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3} sm={6} xs={12} md={6}>
          <Box className={classes.main}  >
            <Box className={classes.imageBox}>
              <Avatar className={classes.avatar} sx={{ height: 120, width: 120 }} variant='rounded' alt='image' src='https://source.unsplash.com/random?wallpapers' />
              <Box className={classes.nameBOx}>
                <Typography variant="h2" color="initial" fontWeight='bold'>Jojnes Paul</Typography>
                <Typography variant="h5" color="slateblue" m="8px 0px 4px 0px"> Content-Writer</Typography>
                <Typography variant="h5" component="span" color="slateblue" m="10px 0px"> Co Content-Writer</Typography>
                <Divider variant='fullWidth' sx={{ mt: "10px" }} />
              </Box>
            </Box>
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
             
              <Button variant="contained" size='small' color='error'  sx={{ color:  grey[900], borderRadius:"25px"}} startIcon={<Block fontSize='small'/>}>
                Block
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3} sm={6} xs={12} md={6}>
          <Box className={classes.main}  >
            <Box className={classes.imageBox}>
              <Avatar className={classes.avatar} sx={{ height: 120, width: 120 }} variant='rounded' alt='image' src='https://source.unsplash.com/random?wallpapers' />
              <Box className={classes.nameBOx}>
                <Typography variant="h2" color="initial" fontWeight='bold'>Jojnes Paul</Typography>
                <Typography variant="h5" color="slateblue" m="8px 0px 4px 0px"> Content-Writer</Typography>
                <Typography variant="h5" component="span" color="slateblue" m="10px 0px"> Co Content-Writer</Typography>
                <Divider variant='fullWidth' sx={{ mt: "10px" }} />
              </Box>
            </Box>
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
             
              <Button variant="contained" size='small' color='error'  sx={{ color:  grey[900], borderRadius:"25px"}} startIcon={<Block fontSize='small'/>}>
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
