import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = ({currentUser}) => {
    if(currentUser) return <Redirect to="/"/>
    return (
        <div className="login">
            <div className="login__wrapper">
                <div className="login__signin heading-1">Sign in to beZoo</div>
                <LoginForm />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(LoginPage);
