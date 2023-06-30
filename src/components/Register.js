import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const Register = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registrationData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      age: age,
    };

    fetch("http://localhost:8080/api/session/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Registro exitoso:", data);
        window.location.href = '/';
      })
      .catch((err) => {
        console.log("Error en el registro:", err);
        // Manejar el error de registro
      });

    // Restablece los campos del formulario
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setAge("");
  };

  return (
    <Container className="bg-dark text-center py-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="firstName" className="text-light">
            Nombre:
          </Form.Label>
          <Form.Control
            type="text"
            id="firstName"
            value={first_name}
            onChange={handleFirstNameChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="lastName" className="text-light">
            Apellido:
          </Form.Label>
          <Form.Control
            type="text"
            id="lastName"
            value={last_name}
            onChange={handleLastNameChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="age" className="text-light">
            Edad:
          </Form.Label>
          <Form.Control
            type="number"
            id="age"
            value={age}
            onChange={handleAgeChange}
          />
        </Form.Group>
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
        <Button type="submit" variant="primary">
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
