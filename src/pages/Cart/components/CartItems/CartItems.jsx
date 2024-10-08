import PropTypes from "prop-types";
import "./CartItems.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
const CartItems = ({ cartItems, removeFromCart, setModalOpen, updateCartItemQuantity }) => {
  return (
    <>
      <h2>Carrito de Compras <FontAwesomeIcon icon={faShoppingBasket} /> </h2>  
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item, index) => {

              const quantity = item.quantity ? item.quantity : 1;

              return (
                <li key={index} className="cart-item">
                  <img
                    src={item.pack_image}
                    alt={item.pack_title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.pack_title}</h3>
                    <p>{item.pack_price} €</p>
                    <p>Destino: {item.pack_destination}</p>
                    {/* Botones para incrementar y disminuir la cantidad */}
                    <div className="quantity-control">
                      <button
                        className="quantity-button"
                        onClick={() => {
                          const newQuantity = quantity - 1;
                          if (newQuantity === 0) {
                            removeFromCart(index); 
                          } else {
                            updateCartItemQuantity(index, newQuantity);
                          }
                        }}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => updateCartItemQuantity(index, quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="remove-button"
                  >
                    Eliminar del Carrito
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="cart-total-section">
            <h3>
              Total:{" "}
              {cartItems
                .reduce((total, item) => total + (item.pack_price * (item.quantity || 1)), 0)
                .toFixed(2)}{" "}
              €
            </h3>
            <button
              className="checkout-button"
              onClick={() => setModalOpen(true)}
            >
              Finalizar y Procesar Pago
            </button>
          </div>
        </>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </>
  );
};

// Validar tipos con PropTypes
CartItems.propTypes = {
  cartItems: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
};

export default CartItems;
