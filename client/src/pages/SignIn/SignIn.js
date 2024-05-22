/* import NavBar from "../../components/NavBar";
import Login from "../../components/Login/Login";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { GoogleLogIn } from "../../redux/actions/LogInActions";

export default function SignIn() {
  const dispatch = useDispatch();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "189786706143-f1m6squ261r1itibbv9fdtupfmb3v9cn.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const googleSuccess = async (res) => {
    const googleToken = res.credential
    dispatch(GoogleLogIn(googleToken));
  };

  return (
    <div>
      <NavBar />
      <div>
        <Login />

        <h1>Google Sign In</h1>
        <hr />
        <GoogleLogin
            client_id="95092504145-q0djc8dh6lt71ornud3c2dtdn2nd1a43.apps.googleusercontent.com"
            onSuccess={googleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        <p>
          Or
          <Link to="/register" className={"linkStyle"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
} */

import NavBar from "../../components/NavBar";
import Login from "../../components/Login/Login";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { GoogleLogIn } from "../../redux/actions/LogInActions";
import "./SignIn.css";

export default function Register() {
  const dispatch = useDispatch();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "95092504145-q0djc8dh6lt71ornud3c2dtdn2nd1a43.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const googleSuccess = async (res) => {
    const googleToken = res.credential
    dispatch(GoogleLogIn(googleToken));
  };

  return (
    <div className="register-boty">
      <NavBar />
      <div className="logIn_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Log In Form</h2>
          </div>
          <Login />
        {/* <hr style={{marginTop: '30px'}} /> */}
        {/* <h1>Google Sign In</h1> */}
        <div style={{marginBottom:'20px', marginTop: '20px', marginLeft: '10px'}}>
        <GoogleLogin
            client_id="95092504145-q0djc8dh6lt71ornud3c2dtdn2nd1a43.apps.googleusercontent.com"
            onSuccess={googleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            
          />
          </div>
          <div>
            <p>
              Or{" "}
              <Link to="/register" className="linkstyleregister">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

