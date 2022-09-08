import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import NavBar from "../../components/NavBar";

const Login = () => {
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
    console.log(res);
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:3001/auth/google",
      data: { id_token: res.tokenId },
    }).then((response) => {
      console.log(response);
      localStorage.setItem("email", JSON.stringify(res.profileObj));
    });
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again Later");
  };

  return (
    <>
      <NavBar />
      <h1>Google Sign In</h1>
      <hr />
      <GoogleLogin
        clientId="189786706143-f1m6squ261r1itibbv9fdtupfmb3v9cn.apps.googleusercontent.com"
        buttonText="Sign In"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default Login;