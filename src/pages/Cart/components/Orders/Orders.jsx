import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import "./Orders.css";
import { Address } from "../Address/Address";

export const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); 

  // Memorizar fetchOrders con useCallback
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/${user.id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true, // Si el backend utiliza cookies o sesión
        }
      );
  
      const groupedOrders = response.data.reduce((acc, item) => {
        const { order_id, order_date, status, address, postal_code, city } = item;
  
        if (!acc[order_id]) {
          acc[order_id] = {
            order_id,
            order_date,
            status,
            address,
            postal_code,
            city,
            items: [],
          };
        }
        acc[order_id].items.push(item);
        return acc;
      }, {});
  
      const sortedOrders = Object.values(groupedOrders).sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
  
      setOrders(sortedOrders); // Establecer los pedidos ordenados
    } catch (error) {
      console.error("Error al obtener el historial de pedidos:", error);
    }
  }, [user]);
  
  
  

  useEffect(() => {
    if (user) {
      fetchOrders(); // Llama a fetchOrders
    }
  }, [user, fetchOrders]); 

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este pedido?");
    if (confirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/delete-orders/${orderId}`,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true, // Si el backend utiliza cookies o sesión
          }
        );
  
        if (response.status === 200) {
          setOrders(orders.filter((order) => order.order_id !== orderId));
          alert("Pedido eliminado con éxito.");
        } else {
          alert("Hubo un problema al eliminar el pedido.");
        }
      } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        alert("Error al eliminar el pedido.");
      }
    }
  };
  
  

  const handleShowAddress = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleUpdate = () => {
    fetchOrders();
  };

  if (orders.length === 0) {
    return <p className="orders-empty">No tienes pedidos en tu historial.</p>;
  }

  return (
    <div className="orders-container">
      <h2>Historial de Pedidos</h2>

      {orders.map((order) => (
        <div key={order.order_id} className={`order-card ${order.status === 1 ? 'processed' : 'pending'}`}>
          <div className="order-card-details">
            <div className="order-card-title-row">
              <h3>Pedido #{order.order_id}</h3>
              <div className="order-actions-buttons">
                <button className="view-address-btn" onClick={() => handleShowAddress(order)}>
                  Ver Dirección de Envío
                </button>
                <button className="delete-order-btn" onClick={() => handleDeleteOrder(order.order_id)}>
                  ❌
                </button>
              </div>
            </div>

            <p className="order-date">Fecha: {new Date(order.order_date).toLocaleDateString()}</p>
            <p className={`order-status ${order.status === 1 ? 'status-processed' : 'status-pending'}`}>
              Estado: {order.status === 0 ? "Pendiente" : "Procesado"}
            </p>
          </div>

          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.order_item_id} className="order-item">
                <p>Paquete: {item.pack_title}</p>
                <p>Precio: {item.pack_price} €</p>
                <p>Cantidad: {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedOrder && (
        <Address
          orderId={selectedOrder.order_id}
          address={selectedOrder.address}
          postalCode={selectedOrder.postal_code}
          city={selectedOrder.city}
          status={selectedOrder.status}
          closeModal={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};
