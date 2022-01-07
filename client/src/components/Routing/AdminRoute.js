import React, { useReducer } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Link } from "react-router-dom";
import LayoutFlat from "../../layouts/LayoutFlat";

const AdminRoute = ({ children, token, currentUser, ...props }) => {
  if (!token || !currentUser.admin) {
    return <Redirect to="/" />;
  }
  return (
    <LayoutFlat>
      <Route {...props}>{children}</Route>
    </LayoutFlat>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  token: state.user.token,
});

export default connect(mapStateToProps)(AdminRoute);
