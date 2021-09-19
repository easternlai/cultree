import React from 'react';
import {connect} from 'react-redux';
import { signout } from '../../redux/user/userActions';

const Header = ({currentUser, signout}) => {

    return (
        <div className="header-container">
            <div className="header-left">
                <div className="logo heading-1">
                    beZoo
                </div>
            </div>
            <div className="header-right" onClick={signout}>
                <div className="user-icon">
                    <span className="user-icon__initials">{currentUser.fullName[0].toLowerCase()}</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

const mapDispatchtoProps = (dispatch) => ({
    signout: () => dispatch(signout()),
})

export default connect(mapStateToProps, mapDispatchtoProps)(Header);
