import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Comprobar si el usuario ya está autenticado en localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // Obtener carrito del localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Desactivar el estado de carga después de cargar los datos
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData)); // Guardar en localStorage
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCartItems([]); // Vaciar el carrito al hacer logout
    localStorage.removeItem("user");
    localStorage.removeItem("cart"); // Vaciar el carrito del localStorage
  };

  const addToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guardar carrito en localStorage
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, cartItems, addToCart, removeFromCart, setCartItems, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Definir los propTypes para children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};
