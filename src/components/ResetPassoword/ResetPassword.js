import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ResetPassword = () => {

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");


  const handleResetPassword = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/session/forgotrecovery/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: e.target.password.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status === "error"){
          Swal.fire({
            icon: 'error',
            title: `${data.message}`,
          });
        } else{
          Swal.fire({
            icon: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
          });
          setTimeout(function () {
            window.location.replace('/')
          }, 2000)
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Restablecer el formulario
    e.target.reset();
  };

  const handleLoginButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <header>
        <div>
          <h1>Recupera tu contraseña</h1>
        </div>
      </header>
      <main>
        <Form id="forgotRecoveryForm" className="mt-4" onSubmit={handleResetPassword}>
          <div className="mb-3">
            <Form.Label>Nueva contraseña</Form.Label>
            <Form.Control type="password" name="password" id="password" />
          </div>
          <Button type="submit">Restablecer</Button>
        </Form>
        <div className="switch mt-3">
          <Button id="loginButton" onClick={handleLoginButtonClick}>
            Iniciar Sesión
          </Button>
        </div>
      </main>
    </Container>
  );
};

export default ResetPassword;
