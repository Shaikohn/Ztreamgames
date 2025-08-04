import { logIn } from "../../redux/slices/logInSlice";
import axios from "axios";

const baseURL = 'http://localhost:3001'

export const LogInActionApi =
  (data, setloginData, loginData) => async (dispatch) => {
    return fetch(`${baseURL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((d) => {
        if (d.error) {
          setloginData({
            ...loginData,
            error: d.error,
          });
        } else {
          const logindata = {
            userData: d.userForToken,
            token: d.token,
          };
          dispatch(logIn(logindata));
        }
      });
  };

export const GoogleLogIn = (googleToken) => async (dispatch) => {
  axios({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    url: `${baseURL}/auth/google`,
    data: { id_token: googleToken },
  }).then((response) => {
    const logindata = {
      userData: response.data.userForToken,
      token: response.data.token,
    };
    dispatch(logIn(logindata));
  });
};
