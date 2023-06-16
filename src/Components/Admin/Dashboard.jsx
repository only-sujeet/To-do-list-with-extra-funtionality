import { makeStyles } from '@material-ui/core'
import React from 'react'
import AdminTopbar from '../Global/AdminTopbar'
import AdminRoute from '../../Protected Route/AdminRoute'
import { getAdminProfile } from '../../Redux/Action/Admin'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'



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
      <AdminTopbar />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sed ea laborum nam nesciunt reprehenderit laboriosam cupiditate, quasi, dignissimos delectus ex quod eum quae optio temporibus nobis. Nisi explicabo eligendi totam tempora, maxime, molestias error earum nesciunt tenetur nobis animi provident, enim nulla quisquam? Voluptatum recusandae dicta animi laboriosam aut quibusdam impedit assumenda voluptatibus distinctio quo, iure ab natus a nisi qui excepturi at culpa unde alias.
      </div>
    </>
  )
}

export default Dashboard