import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom'


const AdminRoute = (Component) => {
    return class extends React.Component {
        render() {
            const isAuthenticated = Cookies.get('Token')
            return isAuthenticated ? (
                <Component {...this.props} />
            ) : (
                <Navigate to={{ pathname: '/login' }} />
            );
        }
    };
}

export default AdminRoute