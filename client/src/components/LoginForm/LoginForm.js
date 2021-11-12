import React, { useState } from "react";
import { connect } from "react-redux";
import { loginStart } from "../../redux/user/userActions";

const LoginForm = ({loginStart, fetching}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    loginStart(usernameOrEmail, password);
  };
  return (
    <form onSubmit={handleSubmit} className="app__form">
      <input
        type="text"
        maxLength="30"
        name="username"
        placeholder="username or email"
        className="app__input"
        onChange={(e) => setUsernameOrEmail(e.target.value)}
      />
      <input
        type="password"
        maxLength="30"
        name="password"
        placeholder="password"
        className="app__input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type={!fetching ? 'submit': 'disabled'} className={!fetching ? "app__button": "app__button app__button__disabled"} />

      <p className="login__signin__help">Need help signing in?</p>
    </form>
  );
};

const mapStateToProps = (state) => ({
  fetching: state.user.fetching
});

const mapDispatchToProps = (dispatch) => ({
  loginStart: (usernameOrEmail, password, token) =>
    dispatch(loginStart(usernameOrEmail, password, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
