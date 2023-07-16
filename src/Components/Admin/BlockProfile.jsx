import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Global/Header'
import { getBlockPeople } from '../../Redux/Action/Admin'
import NewPeopledet from '../Global/NewPeopledet'
import { unBlockPeople } from '../../api/Admin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../Global/Topbar'
import AdminRoute from '../../Protected Route/AdminRoute'
import AdminTopbar from '../Global/AdminTopbar'

const drawerWidth = 240;



const BlockProfile = () => {
   
    const dispatch = useDispatch();
    const { loading, blkpeople } = useSelector(state => state.admin)

    useEffect(() => {
        dispatch(getBlockPeople())
    }, [dispatch])

    const unblock = async (id) => {
        const res = await unBlockPeople(id)
        if (res.success === true) {
            toast.success(res.message)
            dispatch(getBlockPeople())
        }
        if (res.success === false) {
            toast.error(res.message)
        }
    }
    return (
        <>
            <AdminTopbar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Box mt='15px' mb="10px">
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Header title='Block Profile' subtitle='Welcome to Block Profile Page' />
                    </Box>
                </Box>
                {loading ? <Typography variant="h1" color="initial">Loading</Typography> :
                    <Grid container spacing={2}>
                        {
                            blkpeople <= 0 ?
                                <Typography variant="h2" color="initial" m='20px auto'  >No Profile Blocked</Typography> : blkpeople?.map((data) => (

                                    <Grid item lg={3} sm={6} xs={12} md={6}>

                                        <Card sx={{ maxWidth: 300, backgroundColor: "#8AAAE5", borderRadius: "10px", }} elevation={3} variant="elevation"  >
                                            <CardMedia

                                                style={{ cursor: "pointer", height: "180px", }}
                                                image={`http://localhost:5000/Image/${data.Image}`}
                                            />
                                            <CardContent sx={{ maxHeight: 100 }}>
                                                <Typography variant="h5" textTransform='capitalize'   >{data.firstName} {data.middleName} {data.lastName}</Typography>
                                                <Typography variant="h5"  >Company : {data.company}</Typography>
                                                <Typography variant="h5" >Department : {data.field}</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <NewPeopledet Image={data.Image} com={data.company} dept={data.field} dob={data.dob} firstName={data.firstName} lastName={data.lastName} middleName={data.middleName} age={data.age} email={data.email} mobileno={data.mobileno} altmobileno={data.altmobileno} address1={data.address1} address2={data.address2} id={data._id} />

                                                <Button variant="text" color="success" onClick={() => unblock(data._id)}>
                                                    Unblock
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                        }


                    </Grid>
                }
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

export default   AdminRoute(BlockProfile)