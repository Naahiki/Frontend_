import  { useState } from 'react';
import PropTypes from 'prop-types';
import './Address.css';
import axios from 'axios';

export const Address = ({ orderId, address, postalCode, city, status, closeModal, onUpdate }) => {
  const [editable, setEditable] = useState(false); // Estado para activar/desactivar edición
  const [editableAddress, setEditableAddress] = useState(address);
  const [editablePostalCode, setEditablePostalCode] = useState(postalCode);
  const [editableCity, setEditableCity] = useState(city);

  const handleUpdateAddress = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/update-address`,
        {
          address: editableAddress,
          postalCode: editablePostalCode,
          city: editableCity
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          //withCredentials: true, // Si el backend utiliza cookies o sesión
        }
      );
  
      if (response.status === 200) {
        onUpdate();
        alert('Dirección actualizada con éxito.');
        closeModal();
      }
    } catch (error) {
      console.error('Error al actualizar la dirección:', error);
      alert('Hubo un problema al actualizar la dirección.');
    }
  };
  
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Dirección de Envío</h3>
        <p><strong>Estado del Pedido:</strong> {status === 0 ? "Pendiente" : "Procesado"}</p>

        {/* Campos de la dirección */}
        <div className="address-fields">
          <label>Dirección:</label>
          <input
            type="text"
            value={editableAddress}
            onChange={(e) => setEditableAddress(e.target.value)}
            disabled={!editable} 
          />

          <label>Código Postal:</label>
          <input
            type="text"
            value={editablePostalCode}
            onChange={(e) => setEditablePostalCode(e.target.value)}
            disabled={!editable} 
          />

          <label>Ciudad:</label>
          <input
            type="text"
            value={editableCity}
            onChange={(e) => setEditableCity(e.target.value)}
            disabled={!editable} 
          />
        </div>

        {/* Botón "Modificar", habilitado solo si el pedido está pendiente */}
        <button
          onClick={() => setEditable(true)}
          className="edit-address-btn"
          disabled={status !== 0}
        >
          Modificar Dirección
        </button>

        {/* Botón "Guardar" solo visible si los campos son editables */}
        {editable && (
          <button onClick={handleUpdateAddress} className="update-address-btn">
            Guardar Dirección
          </button>
        )}

        <button className="close-modal-btn" onClick={closeModal}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

Address.propTypes = {
  orderId: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired, // 0 = Pendiente, 1 = Procesado
  closeModal: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired 
};
