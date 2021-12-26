import React, { Fragment, useEffect, Suspense } from "react";
import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";

import ProtectedRoute from "./components/Routing/ProtectedRoute";

import { loginStart } from "./redux/user/userActions";
import { connectSocket } from "./redux/socket/socketActions";
import EventPage from "./pages/EventPage/EventPage";
import AdminRoute from "./components/Routing/AdminRoute";
import AdminPortal from "./pages/AdminPortal/AdminPortal";
import CreateUser from "./pages/AdminPortal/CreateUser";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage";
import StorePage from "./pages/StorePage/StorePage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import CreateStoreItemPage from "./pages/CreateStoreItemPage/CreateStoreItemPage";
import ViewOrdersPage from "./pages/VewOrdersPage/ViewOrdersPage";
import AlbumsPage from "./pages/AlbumsPage/AlbumsPage";
import CreateAlbumPage from "./pages/CreateAlbumPage/CreateAlbumPage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";

export function App({ loginStart, connectSocket, currentUser, authToken }) {
  const localToken = localStorage.getItem("token");

  const {
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    if (localToken) {
      loginStart(null, null, localToken);
   
    }
    if(authToken){
      connectSocket();
    }
    
  }, [loginStart, connectSocket, localToken, authToken]);

  const renderApp = () => {
    if (!currentUser && localToken) {
      return <p>loading....</p>;
    }

    return (
      <Fragment>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute path="/event/:eventId" component={EventPage} />
          <AdminRoute exact path="/admin" component={AdminPortal} />
          <AdminRoute exact path="/admin/createuser" component={CreateUser} />
          <ProtectedRoute exact path="/store" component={StorePage} />
          <AdminRoute exact path="/store/createitem" component={CreateStoreItemPage} />
          <ProtectedRoute exact path="/createevent" component={CreateEventPage} />
          <ProtectedRoute exact path="/cart" component={ShoppingCartPage} />
          <ProtectedRoute exact path="/vieworders" component={ViewOrdersPage} />
          <ProtectedRoute exact path="/albums" component={AlbumsPage} />
          <ProtectedRoute exact path="/createalbum" component={CreateAlbumPage} />
          <ProtectedRoute path="/albums/:albumId" component={AlbumPage} />
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
  authToken: state.user.token,
});

const mapDispatchtoProps = (dispatch) => ({
  loginStart: (usernameOrEmail, password, token) =>
    dispatch(loginStart(usernameOrEmail, password, token)),
  connectSocket: () => dispatch(connectSocket())
});

export default connect(mapStateToProps, mapDispatchtoProps)(App);
