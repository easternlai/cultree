import React from "react";
import { connect } from "react-redux";
import { FiSettings, FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { signout } from "../../redux/user/userActions";

const SettingsLogout = ({ signout, currentUser }) => {

  const isCart = useLocation().pathname.includes('cart');
  const isStore = useLocation().pathname.includes('store');

  return (
    <div className="settings-logout">
      { (isCart || isStore) && (
        <Link to="/cart"><FiShoppingCart className="settings-logout--settings" /></Link>
      )}
      {/* <FiSettings className="settings-logout--settings" /> */}
      <div className="settings-logout__icon" onClick={signout}>
        <span className="settings-logout__icon--initials">
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
