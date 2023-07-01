import { makeStyles } from '@material-ui/core'
import React from 'react'
import AdminTopbar from '../Global/AdminTopbar'
import { getAdminProfile } from '../../Redux/Action/Admin'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AdminRoute from '../../Protected Route/AdminRoute'
import Topbar from '../Global/Topbar'
import { Box, Toolbar } from '@mui/material'

const drawerWidth = 240;

const usestyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}))

const Dashboard = () => {
  const classes = usestyles();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAdminProfile())
  }, [dispatch]);
  return (
    <>
      <Topbar/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar/>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sed ea laborum nam nesciunt reprehenderit laboriosam cupiditate, quasi, dignissimos delectus ex quod eum quae optio temporibus nobis. Nisi explicabo eligendi totam tempora, maxime, molestias error earum nesciunt tenetur nobis animi provident, enim nulla quisquam? Voluptatum recusandae dicta animi laboriosam aut quibusdam impedit assumenda voluptatibus distinctio quo, iure ab natus a nisi qui excepturi at culpa unde alias.
        </Box>
    </>
  )
}

export default AdminRoute(Dashboard)