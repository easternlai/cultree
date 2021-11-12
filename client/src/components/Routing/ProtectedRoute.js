import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Link } from "react-router-dom";
import LayoutwSidebar from "../../layouts/LayoutwSidebar";

const ProtectedRoute = ({ token, children, ...props }) => {
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <LayoutwSidebar>
      <Route {...props}>{children}</Route>
    </LayoutwSidebar>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(ProtectedRoute);
