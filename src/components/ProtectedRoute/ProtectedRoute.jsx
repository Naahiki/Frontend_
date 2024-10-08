import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";  
import { AuthContext } from "../../context/AuthContext"; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

 
  if (isLoading) {
    return <div>Cargando...</div>; //Sustituir por componente Loader en un futuro 
  }


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  return children;
};


ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;


