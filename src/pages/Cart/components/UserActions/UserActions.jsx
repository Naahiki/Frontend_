import PropTypes from "prop-types";
import "./UserActions.css";
import { BsPerson } from "react-icons/bs";  

export const UserActions = ({ setView }) => {
  return (
    <div className="user-actions-container">
      <div className="user-icon">
        
        <BsPerson size={32} />
      </div>
      <button onClick={() => setView("cart")}>Ver Carrito</button>
      <button onClick={() => setView("orders")}>Ver Historial de Pedidos</button>
      
    </div>
  );
};

UserActions.propTypes = {
  setView: PropTypes.func.isRequired,
};
