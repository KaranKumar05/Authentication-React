import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./signup.css";

import { Link } from "react-router-dom";

const baseUrl = "http://localhost:4444";
const SignUp = () => {
  //-----Values From Input Fields-----//
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  //-----State-----//
  const [passwordErrorClass, setPasswordErrorClass] = useState("hidden"); //This will be used to show the error message if the password do not match
  const [alertMessage, setAlertMessage] = useState(""); //This will be used to show Server Response "Successful Response"
  const [errorMessage, setErrorMessage] = useState(""); //This will be used to show Server Response "Unsuccessful Response"

  //-----useEffect Clear out the server Respond-----//
  useEffect(() => {
    setTimeout(() => {
      setAlertMessage("");
      setErrorMessage("");
      setPasswordErrorClass("hidden");
    }, 4000); //After 4 seconds the message will be cleared
  }, [alertMessage, errorMessage]);

  //-----Sign up Function-----//
  const signUpFunctionHandler = async (e) => {
    e.preventDefault();

    //-----Checking if the passwords and Confirm Password matched-----//
    if (
      passwordInputRef.current.value !== confirmPasswordInputRef.current.value
    ) {
      setPasswordErrorClass("");
      return;
    } else {
      setPasswordErrorClass("hidden");
    }

    try {
      const response = await axios.post(`${baseUrl}/api/v1/signup`, {
        firstName: firstNameInputRef.current.value,
        lastName: lastNameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });

      console.log(`Response: `, response.data.message);
      setAlertMessage(response.data.message);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div className="signUpContainer">
      <form onSubmit={signUpFunctionHandler}>
        <h1>Sign Up</h1>
        <span>
          <input
            autoComplete="given-name"
            ref={firstNameInputRef}
            type="text"
            placeholder="First Name"
            required
          />
        </span>
        <span>
          <input
            autoComplete="family-name"
            ref={lastNameInputRef}
            type="text"
            placeholder="Last Name"
            required
          />
        </span>
        <span>
          <input
            autoComplete="email"
            ref={emailInputRef}
            type="email"
            placeholder="Email"
            required
          />
        </span>
        <span>
          <input
            autoComplete="new-password"
            ref={passwordInputRef}
            type="password"
            placeholder="Password"
            required
          />
        </span>
        <span>
          <input
            autoComplete="new-password"
            ref={confirmPasswordInputRef}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <p className={`Error ${passwordErrorClass}`}>
            Password Do No Match!!
          </p>
        </span>
        <button type="submit">Sign Up</button>
        <p>
          Already Have an Account?{" "}
          <Link to={"/login"} className="loginLink">
            Login
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

export default SignUp;
