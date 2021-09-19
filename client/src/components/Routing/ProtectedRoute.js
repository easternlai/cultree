import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom';

const ProtectedRoute = ({token, children, ...props}) => {
    return (
        <Route {...props}>{token ? children : <Redirect to="/login" />}</Route>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.token
})

export default connect(mapStateToProps)(ProtectedRoute);
