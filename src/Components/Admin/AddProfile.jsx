import { makeStyles, } from '@material-ui/core'
import { DeleteForeverTwoTone } from '@mui/icons-material'
import { Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Tooltip, IconButton,   } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePeople } from '../../api/Admin'
import { getPeople } from '../../Redux/Action/Admin'
import AdminTopbar from '../Global/AdminTopbar'
import Header from '../Global/Header'
import NewPeopledet from '../Global/NewPeopledet'
import Addcompanyd from './Addcompanyd'
import AddDepartment from './AddDepartment'
import AddPeople from './AddPeople'

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
    const { people ,loading } = useSelector(state => state.admin)


    useEffect(() => {

        dispatch(getPeople())

    }, [dispatch])
    console.log(people)

    const deletepeople = async (id) => { 
        await deletePeople(id)
        dispatch(getPeople())
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
                            <Addcompanyd />
                            <AddDepartment />
                            <AddPeople />
                        </Box>

                    </Box>
                    {loading ? <Typography variant="h1" color="initial">Loading</Typography>:
                    <Grid container spacing={2}>
                        {
                            people?.map((data) => (
                                <Grid item lg={3} sm={6} xs={12} md={3}>

                                    <Card sx={{ maxWidth: 300, backgroundColor: "#8AAAE5", borderRadius: "10px", }} elevation={3} variant="elevation"  >
                                        <CardMedia

                                            style={{ cursor: "pointer", borderRadius: "50%", height: "150px", width: "150px", margin: "10px auto 20px auto" }}
                                            image={`http://localhost:5000/Image/${data.Image}`}
                                        />
                                        <CardContent>
                                            <Typography variant="body1"  >Full Name : {data.firstName} {data.middleName} {data.lastName}</Typography>
                                            <Typography variant="h5" fontWeight="bold" >Company : {data.company}</Typography>
                                            <Typography variant="h5" fontWeight="bold" >Department : {data.field}</Typography>
                                        </CardContent>
                                        <CardActions>    
                                            <NewPeopledet Image={data.Image} com={data.company} dept={data.field} dob={data.dob} firstName={data.firstName} lastName={data.lastName} middleName={data.middleName} age={data.age} email={data.email} mobileno={data.mobileno} altmobileno={data.altmobileno} address1={data.address1} address2={data.address2} />
                                            <Tooltip title="Delete Profile" color='error' >
                                                <Button aria-label="delete" onClick={() => deletepeople(data._id)}>
                                                  Delete
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


            </div>
        </>
    )
}

export default AddProfile