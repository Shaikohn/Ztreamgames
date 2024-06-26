import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { filterVideogames } from "../../redux/slices/videogamesSlice";
import { filterUserVideogames } from "../../redux/slices/profileSlice";
import "./SearchBar.scss";
import { Search } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const icon = useRef(null);

  const [filtro, setFiltro] = useState({
    name: "",
    precio: {
      min: null,
      max: null,
    },
    released: ["", ""],
    plataforms: [],
    genres: [],
    order: "none",
  });

  useEffect(() => {
    const input = document.querySelector(".finder__input");
    const finder = document.querySelector(".finder");
    const form = document.querySelector("form");

    /* if (input) {
      input.addEventListener("focus", () => {
        finder.classList.add("active");
      });
    } */

    if (input) {
      input.addEventListener("blur", () => {
        if (input.value.length === 0) {
          finder.classList.remove("active");
        }
      });
    }

    if (form) {
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        finder.classList.add("processing");
        finder.classList.remove("active");
        input.disabled = true;
        setTimeout(() => {
          finder.classList.remove("processing");
          input.disabled = false;
          if (input.value.length > 0) {
            finder.classList.add("active");
          }
        }, 1000);
      });
    }
  }, []);

  useEffect(() => {
    icon.current.focus();
  }, []);

  useEffect(() => {
    if (history.location.pathname.includes("/games/")) {
      dispatch(filterUserVideogames(filtro));
    } else {
      dispatch(filterVideogames(filtro));
    }
  }, [dispatch, filtro]);

  function handleName(e) {
    setFiltro({ ...filtro, name: e.target.value });
  }

  return (
    <>
      {/* <form class="search-box"><input type="text" placeholder="Search..." 
          id="buscarfiltro"
          onChange={(e) => handleName(e)}/><button type="reset"></button></form> */}

      <form autoComplete="off">
        <div className="finder">
          <div className="finder__outer">
            <div className="finder__inner">
              <div className="finder__icon" ref={icon}></div>
              <input
                className="finder__input"
                type="text"
                name="q"
                placeholder="Search..."
                id="buscarfiltro"
                onChange={(e) => handleName(e)}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
