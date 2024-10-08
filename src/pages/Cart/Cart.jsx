import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserActions } from "./components/UserActions/UserActions";
import { Orders } from "./components/Orders/Orders";
import { Modal } from "./components/Modal/Modal";
import CartItems from "./components/CartItems/CartItems"; 
import "./Cart.css";
import axios from 'axios'; 

export const Cart = () => {
  const { cartItems, removeFromCart, user, setCartItems } = useContext(AuthContext); 
  const [view, setView] = useState("cart");
  const [isModalOpen, setModalOpen] = useState(false);


  const updateCartItemQuantity = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );

  
    if (newQuantity === 0) {
      removeFromCart(index);
    } else {
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems)); 
    }
  };

  const handlePaymentSubmit = async (shippingAddress, postalCode, city, paymentMethod) => {
    if (!user) {
      console.error("Usuario no autenticado.");
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-order`,
        {
          user_id: user.id,
          shippingAddress,
          postalCode,
          city,
          paymentMethod,
          cartItems,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true, // Si el backend utiliza cookies o sesión
        }
      );
  
      if (response.status === 200 && response.data.orderId) {
        console.log("Pedido procesado con éxito:", response.data);
        setModalOpen(false);
        setCartItems([]); // Vacía el carrito en el estado
        localStorage.removeItem("cart"); // Vacía el carrito en localStorage
        alert("Pedido procesado exitosamente");
      } else {
        console.error('Error al procesar el pedido:', response.data);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  

  return (
    <div className="cart-page">
      <div className="user-actions">
        <UserActions setView={setView} />
      </div>
      <div className="all-content">

        {view === "cart" && (
          <div className="cart-content">
            <CartItems
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              setModalOpen={setModalOpen}
              updateCartItemQuantity={updateCartItemQuantity} 
            />
         </div>
        )}
        
        {view === "orders" && <Orders />}
      </div>

      {/* Modal para finalizar la compra */}
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        handleSubmit={handlePaymentSubmit}
      />
    </div>
  );
};
