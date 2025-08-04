import axios from "axios";
import { getAllVideogames, getVideogameById } from "../slices/videogamesSlice";

const baseURL = 'http://localhost:3001'

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
