import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { loginStart } from "../../redux/user/userActions";

const LoginForm = ({ loginStart, error }) => {
  const [fetching, setFetching] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {demoEmail, demoPassword} =  useParams();

  useEffect(() => {
    if(demoEmail) {
      setEmail(demoEmail);
    }
  
    if(demoPassword){
      setPassword(demoPassword);
    }
    
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      loginStart(email, password);

    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        maxLength="30"
        name="email"
        placeholder="email"
        value={email}
        className="form__input heading-3"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        maxLength="30"
        name="password"
        placeholder="password"
        className="form__input heading-3"
        value={password}
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
