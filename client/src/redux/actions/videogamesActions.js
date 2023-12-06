import axios from "axios";
import { getAllVideogames, getVideogameById } from "../slices/videogamesSlice";

const baseURL = 'https://ztreamgames-backend-dev-bfgm.1.us-1.fl0.io'

export const getVideogames = () => (dispatch) => {
  axios(`${baseURL}/games`)
    .then((res) => dispatch(getAllVideogames(res.data)))
    .catch((e) => console.log(e));
};

export const getById = (id) => (dispatch) => {
  axios(`${baseURL}/games/${id}`)
    .then((res) => dispatch(getVideogameById(res.data)))
    .catch((e) => console.log(e));
};
