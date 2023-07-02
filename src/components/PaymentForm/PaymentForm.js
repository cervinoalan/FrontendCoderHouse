import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createAlert, createAlertWithCallback } from "../../utils/alerts";

import { Button } from "react-bootstrap";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handlerPurchase = async () => {
    const { cart: cid } = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:8080/api/carts/${cid}/purchase`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          console.log("La solicitud GET se completó con éxito.");
        } else {
          console.error("Error al realizar la solicitud GET.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud GET:", error);
      });
  };

  const handlerCleanCart = async () => {
    const { cart: cid } = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:8080/api/carts/${cid}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("La solicitud DELETE se completó con éxito.");
        } else {
          console.error("Error al realizar la solicitud DELETE.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud DELETE:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (!error) {
      createAlertWithCallback(
        "success",
        "¡Pago completado!",
        "El pago ha sido procesado con éxito",
        () => window.location.replace('/products'),
        handlerPurchase(),
        handlerCleanCart(),
      );
    } else {
      console.log(error);
      createAlert("error", "Error al procesar el pago", error.message);
    }
  };
  
  return (
    <>
      <form>
        <PaymentElement />
        <div className="d-flex justify-content-center ">
          <Button
            className="mt-5 w-25"
            onClick={handleSubmit}
            variant="success"
          >
            Pagar
          </Button>
        </div>
      </form>
    </>
  );
};
export default PaymentForm;
