// import PropTypes from "prop-types";
// import "./ProductListingSection.css"; 
// import { useContext, useState, useCallback, useMemo } from "react";
// import { AuthContext } from "../../../../context/AuthContext"; 

// export const ProductListingSection = ({ products }) => {
//   const { isAuthenticated, addToCart } = useContext(AuthContext);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [confirmationMessage, setConfirmationMessage] = useState("");

//   const handleAddToCart = useCallback((product) => {
//     if (isAuthenticated) {
//       addToCart(product);
//       setConfirmationMessage(`Producto "${product.pack_title}" añadido al carrito`);
//       setTimeout(() => setConfirmationMessage(""), 2000);
//     }
//   }, [isAuthenticated, addToCart]);

//   const handleMouseEnter = useCallback((productId) => {
//     setHoveredProduct(productId);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     setHoveredProduct(null);
//   }, []);

//   const productCards = useMemo(() => products.map((product) => (
//     <div className="product-card" key={product.pack_id}>
//       <img src={product.pack_image} alt={product.pack_title} className="product-card-image" />
//       <div className="product-card-details">
//         <h3>{product.pack_title}</h3>
//         <p>{product.pack_destination}</p>
//         <p>{product.pack_price} €</p>
//         <p>Disponible hasta: {product.pack_date}</p>

//         <button
//           onClick={() => handleAddToCart(product)}
//           onMouseEnter={() => handleMouseEnter(product.pack_id)}
//           onMouseLeave={handleMouseLeave}
//           className="add-to-cart-btn"
//         >
//           Añadir al Carrito
//         </button>

//         {hoveredProduct === product.pack_id && !isAuthenticated && (
//           <div className="hover-message">
//             Por favor, inicia sesión para añadir productos al carrito.
//           </div>
//         )}
//       </div>
//     </div>
//   )), [products, hoveredProduct, isAuthenticated, handleAddToCart, handleMouseEnter, handleMouseLeave]);

//   return (
//     <div className="product-card-container">
//       {confirmationMessage && (
//         <div className="popup-notification">
//           {confirmationMessage}
//         </div>
//       )}

//       {productCards}
//     </div>
//   );
// };

// ProductListingSection.propTypes = {
//   products: PropTypes.arrayOf(
//     PropTypes.shape({
//       pack_id: PropTypes.number.isRequired,
//       pack_title: PropTypes.string.isRequired,
//       pack_destination: PropTypes.string.isRequired,
//       pack_price: PropTypes.number.isRequired,
//       pack_date: PropTypes.string.isRequired,
//       pack_image: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };


import PropTypes from "prop-types";
import "./ProductListingSection.css";
import { useContext, useState, useCallback, useMemo } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export const ProductListingSection = ({ products }) => {
  const { isAuthenticated, addToCart } = useContext(AuthContext);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleAddToCart = useCallback((product) => {
    if (isAuthenticated && product.pack_amount > 0) {
      addToCart(product);
      setConfirmationMessage(`Producto "${product.pack_title}" añadido al carrito`);
      setTimeout(() => setConfirmationMessage(""), 2000);
    }
  }, [isAuthenticated, addToCart]);

  const handleMouseEnter = useCallback((productId) => {
    setHoveredProduct(productId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredProduct(null);
  }, []);

  const productCards = useMemo(() => products.map((product) => (
    <div
      className={`product-card ${product.pack_amount === 0 ? 'out-of-stock' : ''}`}
      key={product.pack_id}
      style={{ position: 'relative' }} // Añade esta línea para posicionar el ribbon
    >
      <img src={product.pack_image} alt={product.pack_title} className="product-card-image" />
      
      {/* Añadimos el ribbon si el stock es menor o igual a 5 */}
      {product.pack_amount > 0 && product.pack_amount <= 5 && (
        <div className="low-stock-ribbon">¡Quedan pocas unidades!</div>
      )}
      
      <div className="product-card-details">
        <h3>{product.pack_title}</h3>
        <p>{product.pack_destination}</p>
        <p>{product.pack_price} €</p>
        <p>Disponible hasta: {product.pack_date}</p>
        {/* <p>Cantidad disponible: {product.pack_amount}</p> */}

        <button
          onClick={() => handleAddToCart(product)}
          onMouseEnter={() => handleMouseEnter(product.pack_id)}
          onMouseLeave={handleMouseLeave}
          className="add-to-cart-btn"
          disabled={product.pack_amount === 0} // Desactiva el botón si no hay stock
        >
          {product.pack_amount === 0 ? 'Agotado' : 'Añadir al Carrito'}
        </button>

        {hoveredProduct === product.pack_id && !isAuthenticated && (
          <div className="hover-message">
            Por favor, inicia sesión para añadir productos al carrito.
          </div>
        )}
      </div>
    </div>
  )), [products, hoveredProduct, isAuthenticated, handleAddToCart, handleMouseEnter, handleMouseLeave]);

  return (
    <div className="product-card-container">
      {confirmationMessage && (
        <div className="popup-notification">
          {confirmationMessage}
        </div>
      )}
      {productCards}
    </div>
  );
};

ProductListingSection.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      pack_id: PropTypes.number.isRequired,
      pack_title: PropTypes.string.isRequired,
      pack_destination: PropTypes.string.isRequired,
      pack_price: PropTypes.number.isRequired,
      pack_date: PropTypes.string.isRequired,
      pack_image: PropTypes.string.isRequired,
      pack_amount: PropTypes.number.isRequired, 
    })
  ).isRequired,
};
