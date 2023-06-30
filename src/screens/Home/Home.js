import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    fetch("http://localhost:8080/api/session/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user)
        window.alert(`Bienvenido ${data.user.first_name}`);
        // Guardar el token en el almacenamiento de sesión (sessionStorage)
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = "/products";
      })
      .catch((err) => {
        console.log(err);
        window.alert("Error al iniciar sesión");
      });

    setEmail("");
    setPassword("");
  };

  
  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <Container className="bg-dark text-center py-5">
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="email" className="text-light">
          Correo electrónico:
        </Form.Label>
        <Form.Control
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password" className="text-light">
          Contraseña:
        </Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button type="button" variant="secondary" onClick={handleRegister}>
        Registrarse
      </Button>
      <Button type="submit" variant="danger">
        Iniciar sesión
      </Button>
      <Link to="/forgotpassword" className="text-light">
        Recuperar contraseña
      </Link>
    </Form>
  </Container>
  );
};

export default LoginForm;
