import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cart: cid } = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setIsLoading(true);

    fetch(`http://localhost:8080/api/carts/${cid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.payload);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Error al intentar obtener el carrito");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cid]);

  const handleDeleteProduct = async (pid) => {
    const { cart: cid } = JSON.parse(localStorage.getItem("user"));
    await fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetch(`http://localhost:8080/api/carts/${cid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleContinueShopping = () => {
    window.location.href = "/products";
  };

  const handlePayment = (cart) => {
    const userCart = cart.products;
    console.log(userCart);
    window.location.href = `/stripe/${cid}`;
  };

  return (
    <Container className="d-flex">
      {isLoading ? (
        <p>Cargando...</p>
      ) : cart ? (
        <div className="w-50 mt-4">
          <h2 className="w-50">Carrito</h2>
          {cart.products.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col-2">Producto</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">P.Unitario</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product, index) => (
                  <tr key={product._id}>
                    <th className="" scope="row">
                      {index + 1}
                    </th>
                    <td>
                      <img
                        className="img-fluid w-50"
                        src={product.product.thumbnail}
                        alt={product.product.title}
                      />
                    </td>
                    <td>{product.product.title}</td>
                    <td>{product.quantity}</td>
                    <td>${product.product.price}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteProduct(product.product._id)}
                      >
                        <BiTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="column mt-5">
              <h3>Su carrito se encuentra vacio</h3>
              <Button
                className="w-25"
                variant="secondary"
                onClick={handleContinueShopping}
              >
                Buscar Productos
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p>No se pudo cargar el carrito</p>
      )}
      <div className="w-25 mt-5 ms-5 justify-content-center align-items-center">
        <Card className="d-flex align-items-center">
          <Card.Body>
            <Card.Title>RESUMEN DE LA COMPRA</Card.Title>
            <Card.Title className="d-flex justify-content-between bd-highlight mt-3">
              Total: ${cart?.totalPrice}
            </Card.Title>
            <div className="d-flex mt-3">
              <Button
                className="mx-2 w-50"
                variant="success"
                onClick={() => handlePayment(cart)}
                disabled={cart?.products.length === 0}
              >
                Finalizar Compra
              </Button>
              <Button
                className="mx-2 w-50 "
                variant="secondary"
                onClick={handleContinueShopping}
              >
                Seguir Comprando
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Cart;
