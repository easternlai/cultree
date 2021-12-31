import React, { useReducer } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Link } from "react-router-dom";
import LayoutFlat from "../../layouts/LayoutFlat";

const AdminRoute = ({ children, token, admin, ...props }) => {
  if (!token && !admin) {
    return <Redirect to="/" />;
  }
  return (
    <LayoutFlat>
      <Route {...props}>{children}</Route>
    </LayoutFlat>
  );
};

const mapStateToProps = (state) => ({
  admin: state.user.currentUser.admin,
  token: state.user.token,
});

export default connect(mapStateToProps)(AdminRoute);
