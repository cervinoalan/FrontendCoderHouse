import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.payload.docs);
        if (data.payload && Array.isArray(data.payload.docs)) {
          setProducts(data.payload.docs);
        } else {
          throw new Error("Los datos de los productos no son válidos.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddProductToCart = (pid, e) => {
    e.preventDefault();
    const { cart: cid } = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success('Producto agregado al carrito.', {
          position: 'top-right',
          autoClose: 3000, // Duración de la alerta en milisegundos (opcional)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className="m-4">Lista de productos</h2>
      <Row className="justify-content-center">
        {Array.isArray(products) ? (
          products.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card className="m-2">
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  alt={product.title}
                  className="img-fluid"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    <strong>${product.price}</strong>
                  </Card.Text>
                  <Button
                    variant="dark"
                    onClick={(e) => handleAddProductToCart(product._id, e)}
                  >
                    COMPRAR
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </Row>
      <ToastContainer />
    </div>
  );
};

export default Products;
