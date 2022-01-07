import React, { useState } from "react";
import { connect } from "react-redux";
import { loginStart } from "../../redux/user/userActions";

const LoginForm = ({ loginStart, error }) => {
  const [fetching, setFetching] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async () => {
    if (!fetching && email.length > 0 && password.length > 0) {
      loginStart(email, password);

    }
  };

  console.log(error);
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        maxLength="30"
        name="email"
        placeholder="email"
        className="form__input heading-3"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        maxLength="30"
        name="password"
        placeholder="password"
        className="form__input heading-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={
          !fetching && email.length > 0 && password.length > 0
            ? "form__button heading-3"
            : "form__button form__button__disabled heading-3"
        }
      >
        Submit
      </button>

      <p className="form__help heading-4">Need help signing in?</p>
      {error && <div className="form--error"><span>{error}</span></div>}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loginStart: (email, password, token) =>
    dispatch(loginStart(email, password, token)),
});

const mapStateToProps = (state) => ({
  error: state.user.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
