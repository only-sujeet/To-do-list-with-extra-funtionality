import { makeStyles, styled } from '@material-ui/core'
import React from 'react'
import AdminTopbar from '../Global/AdminTopbar'
import { getAdminProfile } from '../../Redux/Action/Admin'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AdminRoute from '../../Protected Route/AdminRoute'
import { Toolbar, Typography } from '@mui/material'

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    marginTop:"100px",
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
  justifyContent: 'flex-end',
}));


const Dashboard = () => {
 

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAdminProfile())
  }, [dispatch]);
  return (
    <>
      <AdminTopbar/>
      <Main>
        <Toolbar/>
        <DrawerHeader/>
        <Typography variant="h4" color="initial">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem consequuntur illum ab voluptatibus facilis accusantium corrupti magni expedita incidunt cupiditate saepe dicta ipsa numquam, mollitia quos quod sequi quasi dolores neque nulla aliquam. Magni, iusto aperiam non animi temporibus ab autem culpa nobis commodi dolore rem, ipsa labore! Nam vel optio soluta doloribus molestias expedita qui, unde tempore explicabo sint consequuntur, aperiam non omnis enim? Quas, sunt nemo atque illo sequi molestias voluptatem aspernatur, doloremque tempora error officia.</Typography>
      </Main>
    </>
  )
}

export default AdminRoute(Dashboard)