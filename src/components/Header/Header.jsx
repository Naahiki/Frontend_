import { NavLink } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { CgHeart } from "react-icons/cg";
import { SiTaichilang } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx"; 
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./Header.css";

export const Header = () => {
  const { isAuthenticated, user, logout, cartItems } = useContext(AuthContext);
  const [showHamburger, setShowHamburger] = useState(true); 

  return (
    <nav>
      <div className="nav-logo-home-button">
        <NavLink to="/">
          <SiTaichilang />
          <span className="brand-name">EasyTravel</span>
        </NavLink>
      </div>

      <div
        className={
          !showHamburger
            ? "nav-link-container-mobile nav-link-container"
            : "nav-link-container"
        }
      >


        {isAuthenticated ? (
          <>
          <span>Bienvenido, {user.firstName}</span>
            <NavLink
              to="#" 
              onClick={logout}
              style={{ cursor: "pointer" }}
              className="nav-link" 
            >
              <FiLogOut size={25} className="logout-icon" />
            </NavLink>
          </>
        ) : (
          <NavLink onClick={() => setShowHamburger(true)} to="/login">
            Login
          </NavLink>
        )}
        <NavLink onClick={() => setShowHamburger(true)} to="/packs-listing">
          Explora
        </NavLink>
        <NavLink onClick={() => setShowHamburger(true)} to="/wishlist">
          <CgHeart size={25} className="wishlist" />
        </NavLink>
        <NavLink onClick={() => setShowHamburger(true)} to="/cart" className="cart-icon">
          <CgShoppingCart size={25} className="cart" />
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </NavLink>
      </div>

      {/* Icono de hamburguesa  */}
      {showHamburger ? (
        <div className="hamburger-icon" onClick={() => setShowHamburger(false)}>
          <RxHamburgerMenu size={20} />
        </div>
      ) : (
        <div  onClick={() => setShowHamburger(true)}>
          <RxCross2 color={"rgb(106, 106, 65)"} size={25} />
        </div>
      )}
    </nav>
  );
};
