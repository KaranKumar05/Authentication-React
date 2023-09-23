import React from "react";
import { Link } from "react-router-dom";
import './login.css'
const Login = () => {
  return (
    <div className="loginContainer">
      <form>
        <h1>Login</h1>
        <span>
          <input
            type="email"
            placeholder="Email"
            required
          />
        </span>
        <span>
          <input
            type="password"
            placeholder="Password"
            required
          />
        </span>
        <button type="submit">Sign Up</button>
        <p>
          Don't Have An Account! <Link to={"/signup"} className="signUpLink">Sing Up</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
