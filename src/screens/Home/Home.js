import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
          Swal.fire({
            icon: 'success',
            title: `Bienvenido ${data.user.first_name + ' ' + data.user.last_name}`,
            showConfirmButton: false,
          });
          setTimeout(function () {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.replace('/products')
          }, 2000);})
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Correo o contraseña incorrecto!',
        });
      });

    setEmail("");
    setPassword("");
  };

  
  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <Container className="bg-dark text-center py-5 my-5 w-25 rounded">
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
        <Form.Label htmlFor="password" className="text-light mt-3">
          Contraseña:
        </Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <div className="mb-3">
      <Button className="mt-4" type="button" variant="secondary" onClick={handleRegister}>
        Registrarse
      </Button>
      <Button className="mt-4 mx-2" type="submit" variant="danger">
        Iniciar sesión
      </Button>
      </div>
      <Link to="/forgotpassword" className="text-light">
        Recuperar contraseña
      </Link>
    </Form>
  </Container>
  );
};

export default LoginForm;
