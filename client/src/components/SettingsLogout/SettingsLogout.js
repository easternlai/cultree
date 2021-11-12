import React from "react";
import { connect } from "react-redux";
import { FiSettings } from "react-icons/fi";

import { signout } from "../../redux/user/userActions";

const SettingsLogout = ({ signout, currentUser }) => {
  return (
    <div className="settings-logout">
      <FiSettings className="settings-logout--settings" />
      <div className="settings-logout__icon" onClick={signout}>
        <span className="ettings-logout__icon--initials">
          {currentUser.fullName[0]}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchtoProps = (dispatch) => ({
  signout: () => dispatch(signout()),
});

export default connect(mapStateToProps, mapDispatchtoProps)(SettingsLogout);
