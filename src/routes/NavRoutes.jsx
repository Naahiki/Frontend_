import { Home } from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { Login } from "../pages/auth/Login/Login";
import { Signup } from "../pages/auth/Signup/Signup";
import ProductListing from "../pages/ProductListing/ProductListing";
import { Cart } from "../pages/Cart/Cart";
import { Wishlist } from "../pages/Wishlist/Wishlist";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"; 



export const NavRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/packs-listing" element={<ProductListing />} />
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <Cart /> 
          </ProtectedRoute>
        } 
      />      <Route path="/wishlist" element={<Wishlist />} />

    </Routes>
  );
};
