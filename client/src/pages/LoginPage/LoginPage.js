import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Logo from '../../components/Logo/Logo';

import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = ({currentUser}) => {
    if(currentUser) return <Redirect to="/"/>
    return (
        <div className="login">
            <div className="login__wrapper">
                <Logo />
                <LoginForm />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(LoginPage);
