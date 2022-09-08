import React, { useState } from "react";
/* import image from "../../images/logo.png" */
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavBarStyle";
/* import { useDispatch, useSelector } from "react-redux"; */
import { useHistory } from "react-router-dom";

export default function NavBar() {
  /* let {amount} = useSelector((state) => state.cart) */
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("email")));
  console.log(user);
  const history = useHistory();
  const logout = () => {
    localStorage.clear();

    history.push("/");
  };
  return (
    //

    <>
      {/*<nav className="navBar">
                <h2 className="logo">Logo<span>app</span></h2>
                <ul>
                    <li><a href=''>Create game</a></li>
                    <li><a href=''>Wish List</a></li>
                    <li><a href=''>Contact</a></li>
                </ul>
                <button className="boton">Login</button>
    </nav>*/}
      {/*<div className={'navContainer'}>
        <div className="left_container">
                <button className={'button'} onClick={handleClick}>{"<Go Back"}</button>
                <Link to="/" className={'linkStyle'}>Home</Link>
                <Link to="/videogame/add" className={'linkStyle'}>Create game</Link> 
            </div>
            <div>
                <img className="logo" src={image} alt="logo"/>
            </div>
            <div className="right_container">
                <Link  className={'linkStyle'}>Wish List</Link>
                <Link className={'linkStyle'}>Contact</Link>
                <Link className={'linkStyle'}>Sign In</Link>
            </div>
</div>*/}
      <Nav>
        <NavLink to="/">
          <h1>ZTEAM</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/videogame/add">Create</NavLink>
          <NavLink to="/videogame/wishList">WishList</NavLink>
        </NavMenu>
        <NavBtn>
          {user ? (
            <>
              <h4>{user.name}</h4>
              <NavBtnLink onClick={logout} to="/">
                logout
              </NavBtnLink>
            </>
          ) : (
            <NavBtnLink to="/signIn">Sign In</NavBtnLink>
          )}
        </NavBtn>
      </Nav>
    </>
  );
}