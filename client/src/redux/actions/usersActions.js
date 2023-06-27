import { getAllUsers, userDetails } from "../slices/usersSlice";

const baseURL = 'https://ztreamgames-backend-production.up.railway.app'

export const getUsers = () => (dispatch) => {
  fetch(`${baseURL}/users/users`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => dispatch(getAllUsers(res)))
    .catch((e) => console.log(e));
};

export const handleAdminPrivileges = (id) => {
  return fetch(`${baseURL}/users/changeAdminStatus/${id}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
};

export const handleBlockUser = (id) => {
  return fetch(`${baseURL}/users/deleteUser/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
};

export const getUserDetails = (id) => (dispatch) => {
  fetch(`${baseURL}/users/users/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => dispatch(userDetails(res)))
    .catch((e) => console.log(e));
};