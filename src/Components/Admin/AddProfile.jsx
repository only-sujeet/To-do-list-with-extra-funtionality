import { CircularProgress, makeStyles, } from '@material-ui/core'
import { Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Tooltip, TextField, } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockPeople, } from '../../api/Admin'
import { getPeople } from '../../Redux/Action/Admin'
import AdminTopbar from '../Global/AdminTopbar'
import Header from '../Global/Header'
import NewPeopledet from '../Global/NewPeopledet'
// import Addcompanyd from './Addcompanyd'
// import AddDepartment from './AddDepartment'
import AddPeople from './AddPeople'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Global/Loader'

const usestyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

    },
    toolbar: theme.mixins.toolbar,
}))



const AddProfile = () => {
    const classes = usestyles();
    const dispatch = useDispatch();
    const { people, loading } = useSelector(state => state.admin)


    useEffect(() => {
        dispatch(getPeople())

    }, [dispatch])
    console.log(people)


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
            <AdminTopbar />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Box m='15px'>
                    <Box display='flex' justifyContent='space-between' alignItems="center"  >
                        <Header title="Add Profile" subtitle="Welcome to Add Profile page" />
                        <Box display='flex'>
                            {/* <Addcompanyd />
                            <AddDepartment /> */}
                            <AddPeople />
                        </Box>
                    </Box>
                    <form>
                        <TextField
                            sx={{ my: "2rem" }}
                            placeholder='Search Emloyees By Name & Department'
                            id=""
                            label=""
                            fullWidth
                            onChange={handleSearch}
                            size='small'
                            type='search'
                        />
                    </form>
                    {loading ? <Typography variant="h1"m={"2rem"} align="center" color="initial">Loading...</Typography> :
                        <Grid container spacing={2}>

                            {!loading &&
                                people <= 0 ? <Typography variant="h2" color="initial" m='20px auto'  >No Profile Added</Typography> : people?.map((data) => (
                                    <Grid item lg={3} sm={6} xs={12} md={6}>

                                        <Card sx={{ maxWidth: 300, backgroundColor: "#8AAAE5", borderRadius: "10px", }} elevation={3} variant="elevation"  >
                                            <CardMedia

                                                style={{ cursor: "pointer", height: "180px", }}
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
            </div>
        </>
    )
}

export default AddProfile