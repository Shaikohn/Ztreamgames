import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogames } from "../../redux/slices/videogamesSlice";

import './index.css'

function Filtro() {
  //Declaro el dispatch para aplicar filtros.
  const dispatch = useDispatch();
  //Necesito videogames de la store porque necesito saber que tipo de plataformas y generos existen
  //Se podria escribir manualmente y ahorrarse traer estos datos de la store, pero no seria escalable. En cambio de esta forma
  //si el dueño de la pagina agrega un producto en una nueva plataforma que no existia al momento de codear, la opcion se agrega automaticamente
  const videogames = useSelector((state) => state.videogames.videogames);
  //Aqui solamente paso a generar los arrays de generos y plataformas, que se usaran en el renderizado para mostrar las distintas opciones
  //Siendo que siempre todas deben estar visibles y no tienen porque mutar las declaro de forma basica.
  var generos = [];
  var plataforma = [];
  
  videogames.forEach((x) => {
    x.genres.forEach((d) => {
      if (!generos.includes(d)) {
        generos.push(d);
      }
    });
  });

  videogames.forEach((x) => {
    x.platforms.forEach((d) => {
      if (!plataforma.includes(d)) {
        plataforma.push(d);
      }
    });
  });

  //Este es mi objeto filtro, que tiene las distintas opciones que se le pueden aplicar al array principal de videojuegos.
  //Cada item en el objeto representa un filtro que se le aplicara al array anteriormente mencionado.
  //Exceptuando el de order, que solamente es el tipo de ordenamiento que se le dara.
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

  //Uso un use effect, para unicamente despatchar cuando el Filtro sea actualizado y no antes.
  useEffect(() => {
    dispatch(filterVideogames(filtro));
  }, [dispatch, filtro]);

  //A continuacion declaro todas las funciones con las que el usuario interactua

  //Esta es para buscar por palabra/s clave
  function handleName(e) {
    setFiltro({ ...filtro, name: e.target.value });
  }

  //Esta es para ver si la fecha de lanzamiento del videojuego todavia no fue anunciada o si el usuario quiere limpiar el filtro y volver a ver
  //todas las fechas.
  function handleReleased(e) {
    let p = e.target.value === "tba" ? "tba" : "";
    setFiltro({ ...filtro, released: [p, p] });

    //Borrar los valores de los inputs de fecha, ya que tocaron el boton de tba o clear
    document.getElementById("fecha_min").value = "";
    document.getElementById("fecha_max").value = "";
  }
  //Esta seria la maxima fecha que el usuario indica para la fecha de lanzamiento
  function handleReleasedMax(e) {
    let p = filtro.released;
    p[1] = e.target.value;
    setFiltro({ ...filtro, released: p });
  }
  //Mismo que la anterior pero minima.
  function handleReleasedMin(e) {
    let p = filtro.released;
    p[0] = e.target.value;
    setFiltro({ ...filtro, released: p });
  }

  //Esta funcion se encarga de verificar cuales plataformas el usuario quiere filtrar y si le volvio a hacer click a alguna
  //en particular, removerla.
  function handlePlatforms(e) {
    let newPlataforms = [...filtro.plataforms];
    if (newPlataforms.includes(e.target.value)) {
      let indice = newPlataforms.indexOf(e.target.value);
      newPlataforms.splice(indice, 1);
    } else {
      newPlataforms.push(e.target.value);
    }
    setFiltro({ ...filtro, plataforms: newPlataforms });
  }

  function handlePlatformDelete(e) {
    setFiltro({...filtro, plataforms: filtro.plataforms.filter(t => t !== e.target.value)})
}

  //Lo mismo que la anterior pero con generos
  function handleGenres(e) {
    let newGenre = [...filtro.genres];
    if (newGenre.includes(e.target.value)) {
      let indice = newGenre.indexOf(e.target.value);
      newGenre.splice(indice, 1);
    } else {
      newGenre.push(e.target.value);
    }
    setFiltro({ ...filtro, genres: newGenre });
  }

  function handleGenreDelete(e) {
    setFiltro({...filtro, genres: filtro.genres.filter(t => t !== e.target.value)})
}

  //
  function handlePrecio(e) {
    let p =
      e.target.id === "precioMin"
        ? { ...filtro.precio, min: e.target.value }
        : e.target.id === "precioMax"
        ? { ...filtro.precio, max: e.target.value }
        : e.target.value === "sinmaximo"
        ? { ...filtro.precio, max: null }
        : { ...filtro.precio, min: null };

    if (e.target.value === "sinmaximo")
      document.getElementById("precioMax").value = 0;
    if (e.target.value === "sinminimo")
      document.getElementById("precioMin").value = 0;

    setFiltro({ ...filtro, precio: p });
  }
  //Las siguientes 3 funciones son para que el usuario cambie la variable que determina el orden de nuestro array filtrado
  //el primer click sera de mayor a menor, el segundo de menor a mayor, y asi rotando.
  function handleOrderAlphabet(e) {
    if (filtro.order !== "+Alphabet-") {
      setFiltro({ ...filtro, order: "+Alphabet-" });
    } else {
      setFiltro({ ...filtro, order: "-Alphabet+" });
    }
  }
  function handleOrderRating(e) {
    if (filtro.order !== "+Rating-") {
      setFiltro({ ...filtro, order: "+Rating-" });
    } else {
      setFiltro({ ...filtro, order: "-Rating+" });
    }
  }
  function handleOrderReleasedDate(e) {
    if (filtro.order !== "+RDate-") {
      setFiltro({ ...filtro, order: "+RDate-" });
    } else {
      setFiltro({ ...filtro, order: "-RDate+" });
    }
  }
  function handleOrderPrecio(e) {
    if (filtro.order !== "+Precio-") {
      setFiltro({ ...filtro, order: "+Precio-" });
    } else {
      setFiltro({ ...filtro, order: "-Precio+" });
    }
  }

  // Creo que el html es self-explanatory...
  return (
    <div id="filtrobox" className="filtroContainer">
      <div className="container_search">
        <h3>Search by keyword</h3>

        <label htmlFor="buscarfiltro">
        Enter keywords here to search for matches!{" "}
        </label><br/><br/>
        <div className="search">
        <input
          type="text"
          id="buscarfiltro"
          placeholder="Search"
          className="buscar"
          onChange={(e) => handleName(e)}
        ></input></div>
      </div>

      <div>
        <h3>Release date:</h3>
        <label htmlFor="fecha_min">From: </label>
        <input
          type="date"
          id="fecha_min"
          name="trip-start"
          onChange={(e) => handleReleasedMin(e)}
        ></input><br/>
        <label htmlFor="fecha_max">To: </label>
        <input
          type="date"
          id="fecha_max"
          name="trip-start"
          onChange={(e) => handleReleasedMax(e)}
        ></input><br/>
        <button onClick={(e) => handleReleased(e)} value="tba">
         Hasn't been announced yet?
        </button>
        <button onClick={(e) => handleReleased(e)} value="">
          All
        </button>
      </div>

      <div>
        <h4>Genre</h4>
        <select
          id="select_genre"
          defaultValue={generos}
          multiple={true}
          onClick={(e) => handleGenres(e)}
        >
          <option disabled>All</option>
          {generos.map((x, i) => (
            <option key={i} value={x}>
              {x}
            </option>
          ))}
        </select>

          {filtro.genres.map((e, i) => {
            return (
              <li key={i}>
                {e}
                <button type='button' value={e} onClick={handleGenreDelete}>x</button>
              </li>
            )
          })}

      </div>

      <div>
        <h4>Platform</h4>
        <select
          id="select_plataforma"
          multiple={true}
          defaultValue={plataforma}
          onClick={(e) => handlePlatforms(e)}
        >
          <option disabled>All</option>
          {plataforma.map((x, i) => (
            <option key={i} value={x}>
              {x}
            </option>
          ))}
        </select>
        {filtro.plataforms.map((e, i) => {
            return (
              <li key={i}>
                {e}
                <button type='button' value={e} onClick={handlePlatformDelete}>x</button>
              </li>
            )
          })}
      </div>

      <div>
        <div>
          <h3>Price</h3>
          <label htmlFor="precioMin">Price minimum</label><br/>
          <input
            id="precioMin"
            type="number"
            onChange={(e) => handlePrecio(e)}
          ></input>
          <button onClick={(e) => handlePrecio(e)} value="sinminimo">
            No minimum?
          </button><br/>
          <label htmlFor="precioMax">Price maximum</label><br/>
          <input
            id="precioMax"
            type="number"
            onChange={(e) => handlePrecio(e)}
          ></input>
          <button onClick={(e) => handlePrecio(e)} value="sinmaximo">
            No maximum?
          </button>
        </div>
      </div>

      <div>
        <h3>Sort by:</h3>
        <div className='sortBy'>

        <button className='button-64' onClick={(e) => handleOrderAlphabet(e)}><span className="text">Alphabet</span></button>

        <button className='button-64'  onClick={(e) => handleOrderRating(e)}><span className="text">Rating</span></button>

        <button className='button-64'  onClick={(e) => handleOrderReleasedDate(e)}>
        <span className="text">Released date</span>
        </button>
        <button className='button-64' onClick={(e) => handleOrderPrecio(e)}><span className="text">Price</span></button></div>
      </div>
    </div>
  );
}

export default Filtro;