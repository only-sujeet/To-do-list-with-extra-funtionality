
import { Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Tooltip, TextField, Toolbar, InputAdornment, } from '@mui/material'
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
import { SearchSharp } from '@mui/icons-material'

const drawerWidth = 240;

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
    return (
        <>
            <Topbar />
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
                    <form style={{ display: "flex", alignItems: "end", justifyContent: "end", marginRight:"10px" }} >
                        <TextField
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px" , maxHeight:"34px" } }}
                            placeholder='Search Emloyees By Name & Department'
                           
                            onChange={handleSearch}
                            size='small'
                            type='search'
                            InputProps={{
                            startAdornment:(
                              <InputAdornment position="start">
                                <SearchSharp color='primary' fontSize='small'/>
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

                                        <Card sx={{ maxWidth: 300, backgroundColor: "#8AAAE5", borderRadius: "10px", border: "1px solid black", boxShadow: "2px 2px 6px", margin: "2rem 0" }} elevation={3} variant="elevation"  >
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
                                        </Card>
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