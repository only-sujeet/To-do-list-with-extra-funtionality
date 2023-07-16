
import { Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Tooltip, TextField, Toolbar, InputAdornment, Divider, Avatar, } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockPeople, } from '../../api/Admin'
import { getPeople } from '../../Redux/Action/Admin'
import Header from '../Global/Header'
import NewPeopledet from '../Global/NewPeopledet'
import AddPeople from './AddPeople'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../Global/Topbar'
import AdminRoute from '../../Protected Route/AdminRoute'
import { AlternateEmail, Block, DateRangeTwoTone, Phone, SearchSharp } from '@mui/icons-material'
import { blue, grey, red } from '@mui/material/colors'
import { makeStyles, styled } from '@material-ui/core'
import AdminTopbar from '../Global/AdminTopbar'
import dayjs from 'dayjs'

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));


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
        flexDirection: "row",
        marginTop: "5px"
    },
    avatar: {
        marginTop: "10px",
        marginLeft: "5px"
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

const AddProfile = () => {

    const dispatch = useDispatch();
    const { people, loading } = useSelector(state => state.admin)

    useEffect(() => {
        dispatch(getPeople())

    }, [dispatch])


    const handleSearch = (e) => {
        dispatch(getPeople(e.target.value))
    }

    const blockpeople = async (id) => {
        const res = await blockPeople(id)
        if (res.success === true) {
            dispatch(getPeople())
            toast.success(res.message)
        }
        if (res.success === false) {
            toast.error(res.message)
        }
    }
    const classes = useStyles()
    return (
        <>
            <AdminTopbar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Box mt='10px' mb="15px">
                    <Box display='flex' justifyContent='space-between' alignItems="center"  >
                        <Header title="Add Employee" subtitle="Welcome to Add Employee page" />
                        <Box display='flex' m="10px">

                            <AddPeople />
                        </Box>
                    </Box>
                    <form style={{ display: "flex", alignItems: "end", justifyContent: "end", marginRight: "10px" }} >
                        <TextField
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px", maxHeight: "34px" } }}
                            placeholder='Search Emloyees By Name & Department'

                            onChange={handleSearch}
                            size='small'
                            type='search'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchSharp color='primary' fontSize='small' />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </form>
                    {loading ? <Typography variant="h1" m="2rem" align="center" color="initial">Loading...</Typography> :
                        <Grid container spacing={2}>
                            {!loading &&
                                people <= 0 ? <Typography variant="h2" color="initial" m='20px auto'  >Employee not Added</Typography> : people?.map((data) => (
                                    <Grid item lg={3} sm={6} xs={12} md={6}>

                                        {/* <Card sx={{ maxWidth: 300, backgroundColor: "#8AAAE5", borderRadius: "10px", border: "1px solid black", boxShadow: "2px 2px 6px", margin: "2rem 0" }} elevation={3} variant="elevation"  >
                                            <CardMedia
                                                sx={{ width: 300, }}
                                                style={{ cursor: "pointer", height: "220px", width: "100%", objectFit: "contain" }}
                                                image={`http://localhost:5000/Image/${data.Image}`}
                                            />
                                            <CardContent sx={{ maxHeight: 100 }}>
                                                <Typography variant="h5" textTransform='capitalize'   >{data.firstName} {data.middleName} {data.lastName}</Typography>
                                                <Typography variant="h5"  >Company : {data.company}</Typography>
                                                <Typography variant="h5" >Department : {data.department}</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <NewPeopledet Image={data.Image} com={data.company} dept={data.department} dob={data.dob} firstName={data.firstName} lastName={data.lastName} middleName={data.middleName} age={data.age} email={data.email} mobileno={data.mobileno} altmobileno={data.altmobileno} address1={data.address1} address2={data.address2} id={data._id} />

                                                <Tooltip title="Block Profile" >
                                                    <Button aria-label="block" color='warning' onClick={() => blockpeople(data._id)}>
                                                        Block
                                                    </Button>
                                                </Tooltip>
                                            </CardActions>
                                        </Card> */}
                                        <Box className={classes.main}  >
                                            <Grid container className={classes.imageBox}>

                                                <Grid item lg={5} sm={5} xs={5} md={5}>
                                                    <Avatar className={classes.avatar} sx={{ height: { lg: 120, md: 95, sm: 100, xs: 90 }, width: { lg: 120, md: 95, sm: 100, xs: 90 }, mr: "15px" }} variant='rounded' alt='image' src={`http://localhost:5000/Image/${data.Image}`} />
                                                </Grid>
                                                <Grid item lg={7} sm={7} xs={7} md={7} mt="10px" >
                                                    <Typography variant="h3" color="initial" component='div' fontWeight='bold'>{data.firstName} {data.middleName} {data.lastName}</Typography>
                                                    <Typography variant="h5" color="slateblue" component="span" m="8px 0px 4px 0px"> {data.department}</Typography>
                                                    <Typography variant="h5" color="slateblue" m="8px 0px"> {data.subDept}</Typography>
                                                    <Divider variant='fullWidth' sx={{ mt: "10px" }} />
                                                </Grid>
                                            </Grid>
                                            <Box className={classes.constactBox}>
                                                <Typography variant="h5" component='span' >   <DateRangeTwoTone sx={{ color: "blueviolet" }} />  : {dayjs(data.doj).format('DD/MM/YYYY')}</Typography>
                                                <Typography variant="h4" component='span' color="initial"><AlternateEmail color='secondary' />   :  {data.email}</Typography>
                                                <Typography variant="h5" component='span' >   <Phone sx={{ color: blue[900] }} />  : {data.mobileno}</Typography>

                                            </Box>
                                            <Divider variant='fullWidth' />
                                            <Box className={classes.Action}>
                                            <NewPeopledet Image={data.Image} com={data.company} dept={data.department} dob={data.dob} firstName={data.firstName} lastName={data.lastName} middleName={data.middleName} age={data.age} email={data.email} mobileno={data.mobileno} altmobileno={data.altmobileno} address1={data.address1} address2={data.address2} id={data._id} />

                                                <Button variant="contained" size='small' sx={{ color: grey[700], borderRadius: "25px", bgcolor: red['A700'] }} startIcon={<Block fontSize='small' />} onClick={() => blockpeople(data._id)}>
                                                    Block
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    }
                
                </Box>

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
        </>
    )
}

export default AdminRoute(AddProfile)