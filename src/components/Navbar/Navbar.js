import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const handleLogout = () => {
    const token = localStorage.getItem("user");
    if (token) {
      fetch("http://localhost:8080/api/session/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      })
        .then((res) => {
          if (res.ok) {
            console.log("Logout exitoso");
            localStorage.removeItem("user");
            window.location.href = "/";
          } else {
            throw new Error("Error al cerrar sesión");
          }
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    }
  };

  const handleInicio = () => {
    const token = localStorage.getItem("user");
    if (token) {
      window.location.href = "/products"; // Redireccionar si el usuario está logueado
    } else {
      window.location.href = "/"; // Redireccionar si el usuario no está logueado
    }
  };

  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <NavLink className="navbar-brand" onClick={handleInicio}>
      Inicio
    </NavLink>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <button className="nav-link btn btn-link mt-1 " onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </li>
      <li className="nav-item ml-auto">
        <NavLink className="nav-link" to="/cart">
          <FaShoppingCart size={30} className="me-2" />
        </NavLink>
      </li>
    </ul>
  </div>
</nav>
  );
};

export default Navbar;
