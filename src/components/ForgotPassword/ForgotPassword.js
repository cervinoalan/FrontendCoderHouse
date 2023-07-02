import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email incorrecto',
        text: 'El correo ingresado no es válido.',
      });
      return;
    }
  
    fetch("http://localhost:8080/api/session/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: `Se envio un mail a ${email} para recuperar la contraseña`,
          showConfirmButton: false,
        });
        console.log(data);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error inesperado',
        });
        console.log(error);
      });
  
    setEmail("");
  };

  const handleLoginButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <header>
        <div></div>
        <h1>Recupera tu contraseña</h1>
        <div></div>
      </header>
      <main>
        <Form id="recoverForm" className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <Button type="submit" className="submit" variant="danger">
            Enviar
          </Button>
        </Form>
        <div className="switch mt-3">
          <Button id="loginButton" onClick={handleLoginButtonClick} variant="dark">Iniciar Sesión</Button>
        </div>
      </main>
    </Container>
  );
};

export default RecoverPassword;

