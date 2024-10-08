import PropTypes from "prop-types";
import "./Modal.css"; // Estilos para el modal

export const Modal = ({ isOpen, closeModal, handleSubmit }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const shippingAddress = e.target.shippingAddress.value;
    const postalCode = e.target.postalCode.value;
    const city = e.target.city.value;
    const paymentMethod = e.target.paymentMethod.value;

    // Llama a la función de submit con los datos del formulario
    handleSubmit(shippingAddress, postalCode, city, paymentMethod);
  };

  if (!isOpen) return null; // Si el modal no está abierto, no renderizamos nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Finalizar Compra</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="shippingAddress">Dirección de Envío</label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              placeholder="Ingrese su dirección"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Código Postal</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="Ingrese su código postal"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Ingrese su ciudad"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Método de Pago</label>
            <select id="paymentMethod" name="paymentMethod" required>
              <option value="">Seleccione un método de pago</option>
              <option value="credit-card">Tarjeta de Crédito</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Transferencia Bancaria</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="submit" className="submit-btn">
              Procesar Pago
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
