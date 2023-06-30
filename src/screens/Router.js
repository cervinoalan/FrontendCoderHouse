import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import NavbarA from "../components/Navbar/Navbar";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import Navbar from "../components/Navbar/Navbar";

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
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default Router;
