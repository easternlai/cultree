import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom';

const AdminRoute = ({ children, user, ...props }) => {
    return (
        <Route {...props}>{user.currentUser.admin ? children : <Redirect to="/" />}</Route>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(AdminRoute);