import React, { Fragment, useEffect, Suspense } from "react";
import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";

import ProtectedRoute from "./components/Routing/ProtectedRoute";

import { loginStart } from "./redux/user/userActions";
import userTypes from "./redux/user/userTypes";
import Header from "./components/Header/Header";

export function App({ loginStart, currentUser }) {
  const token = localStorage.getItem("token");

  const {
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    //login start with just token if token exist
    if (token) {
      loginStart(null, null, token);
    }
    //if token exist connect socket
  }, [loginStart, token]);

  const renderApp = () => {
    if (!currentUser && token) {
      return <p>loading....</p>;
    }

    return (
      <Fragment>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/" component={HomePage} />
        </Switch>
      </Fragment>
    );
  };

  return (
    <div>
      <Suspense fallback={<p>Loading</p>}>{renderApp()}</Suspense>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchtoProps = (dispatch) => ({
  loginStart: (usernameOrEmail, password, token) =>
    dispatch(loginStart(usernameOrEmail, password, token)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(App);
