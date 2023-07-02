import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/session/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert(data.message);
        console.log(data);
      })
      .catch((error) => {
        window.alert("Error al enviar correo");
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

