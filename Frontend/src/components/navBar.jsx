import { NavLink, Link } from "react-router-dom";
import React from "react";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand text-danger" to="#">
        Vidly
      </Link>
      <button
        className="navbar-toggler text-white "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNavAltMarkup"
        style={{ width: "100%" }}
      >
        <div className="navbar-nav ms-auto">
          <NavLink className="nav-item nav-link text-white" to="/Movies">
            Movies
          </NavLink>
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link text-white" to="/Customers">
                Customers
              </NavLink>
              <NavLink className="nav-item nav-link text-white" to="/Rental">
                Rental
              </NavLink>
            </React.Fragment>
          )}
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link text-white" to="/register">
                Register
              </NavLink>
              <NavLink
                className="nav-item nav-link text-white pt-1"
                to="/login"
              >
                <span className="btn btn-danger ps-3 pe-3 rounded-pill">
                  Login
                </span>
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link text-white" to="/profile">
                {user.name}
              </NavLink>
              <NavLink
                className="nav-item nav-link text-white pt-1"
                to="/logout"
              >
                <span className="btn btn-danger ps-3 pe-3 rounded-pill">
                  Logout
                </span>
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
