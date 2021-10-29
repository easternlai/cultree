import React  from 'react';
import {connect} from 'react-redux';
import { FiSettings } from "react-icons/fi";

import { signout } from '../../redux/user/userActions';

const SettingsLogout = ({signout, currentUser}) => {
    return (
        <div className="settingsLogout">
        <FiSettings className="settingsLogout__settings" />
        <div className="settingsLogout__icon" onClick={signout}>
          <span className="settingsLogout__icon__initial">{currentUser.fullName[0]}</span>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

const mapDispatchtoProps = (dispatch) => ({
    signout: () => dispatch(signout()),
})

export default connect(mapStateToProps, mapDispatchtoProps)(SettingsLogout);