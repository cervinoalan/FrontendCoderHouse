import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Products from "../components/Products/Products";
import Cart from "../components/Cart/Cart";
import NavbarA from "../components/Navbar/Navbar";
import Register from "../components/Register/Register";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassoword/ResetPassword";
import Navbar from "../components/Navbar/Navbar";
import Stripe from "../components/Stripe/Stripe";

function Router() {
  return (
      <BrowserRouter>
        <NavbarA />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Navbar />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/forgotrecovery" element={<ResetPassword />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/stripe/:cid" element={<Stripe />} />
        </Routes>
      </BrowserRouter>
  );
}

export default Router;
