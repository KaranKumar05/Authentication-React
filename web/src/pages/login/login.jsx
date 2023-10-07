import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";


import { GlobalContext } from "../../context/context";

const baseUrl = "http://localhost:4444";

const Login = () => {
  //-----Values From Input Fields-----//
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  //-----State-----//
  const [alertMessage, setAlertMessage] = useState(""); //This will be used to show Server Response "Successful Response"
  const [errorMessage, setErrorMessage] = useState(""); //This will be used to show Server Response "Unsuccessful Response"

  // useContext State 
  const {state , dispatch} = useContext(GlobalContext);

  //-----useEffect Clear out the server Respond-----//
  useEffect(() => {
    setTimeout(() => {
      setAlertMessage("");
      setErrorMessage("");
    }, 3000); //After 3 seconds the message will be cleared
  }, [alertMessage, errorMessage]);

  //-----Login up Function-----//
  const loginFunctionHandler = async (e) => {
    e.preventDefault();
    console.log("Function is Running");

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/login`,
        {
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        },
        {
          withCredentials: true, //Allows cookies at Front End
        }
      );
      dispatch({
        type:"USER_LOGIN",
        payload: response.data.data,
      })

      console.log(`Response: `, response?.data?.message);
      setAlertMessage(response?.data?.message);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data?.message);
    }
  };

  return (
    <div className="loginContainer">
      <Link to={"/home"} className="signUpLink">
        Home
      </Link>
      <form onSubmit={loginFunctionHandler}>
        <h1>Login</h1>
        <span>
          <input
            ref={emailInputRef}
            autoComplete="email"
            type="email"
            placeholder="Email"
            required
          />
        </span>
        <span>
          <input
            ref={passwordInputRef}
            autoComplete="current-password"
            type="password"
            placeholder="Password"
            required
          />
        </span>
        <button type="submit">Login</button>
        <p>
          Don't Have An Account!{" "}
          <Link to={"/signup"} className="signUpLink">
            Sing Up
          </Link>
        </p>
      </form>
      <div>
        <div className="Error">{`${errorMessage}`}</div>
        <div className="Alert">{`${alertMessage}`}</div>
      </div>
    </div>
  );
};
export default Login;
