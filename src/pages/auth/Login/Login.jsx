// import { useState, useContext } from "react";
// import { AuthContext } from "../../../context/AuthContext";  // Importar el contexto de autenticación
// import "./Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import { BsEyeSlash, BsEye } from "react-icons/bs";
// import axios from 'axios'; 

// export const Login = () => {
//   const [hidePassword, setHidePassword] = useState(true);
//   const [loginCredential, setLoginCredential] = useState({
//     email: "",
//     password: ""
//   });
  
//   const { login } = useContext(AuthContext);  // Usar el contexto de autenticación
//   const navigate = useNavigate();

//   // Aquí haces la llamada al backend en el loginHandler
//   const loginHandler = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post("http://localhost:5000/login", {
//         email: loginCredential.email,
//         password: loginCredential.password
//       });
  
//       const data = response.data;
  
//       if (data.user) {
//         login(data.user);  // Llamar a la función de login del contexto
//         navigate("/cart");  // Redirigir al carrito después del login exitoso
//       } else {
//         console.error("Login failed: ", data.error);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={loginHandler} className="login-body">
//         <div className="email-container">
//           <label htmlFor="email">Email</label>
//           <input
//             value={loginCredential.email}
//             required
//             onChange={(e) =>
//               setLoginCredential({
//                 ...loginCredential,
//                 email: e.target.value,
//               })
//             }
//             id="email"
//             placeholder="Email Address"
//             type="email"
//           />
//         </div>

//         <div className="password-container">
//           <label htmlFor="password">Password</label>
//           <div className="input-container">
//             <input
//               value={loginCredential.password}
//               required
//               onChange={(e) =>
//                 setLoginCredential({
//                   ...loginCredential,
//                   password: e.target.value,
//                 })
//               }
//               id="password"
//               placeholder="Password"
//               type={hidePassword ? "password" : "text"}
//             />
//             {hidePassword ? (
//               <BsEyeSlash
//                 className="hide-show-password-eye"
//                 onClick={() => setHidePassword(!hidePassword)}
//               />
//             ) : (
//               <BsEye
//                 className="hide-show-password-eye"
//                 onClick={() => setHidePassword(!hidePassword)}
//               />
//             )}
//           </div>
//         </div>

//         <div className="login-btn-container">
//           <input value="Login" type="submit" />
//         </div>

//         <Link className="new-account" to="/signup">
//           Create a new account?
//         </Link>
//       </form>
//     </div>
//   );
// };


import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";  // Importar el contexto de autenticación
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import axios from 'axios'; 

export const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");  // Nuevo estado para mensajes de error
  
  const { login } = useContext(AuthContext);  // Usar el contexto de autenticación
  const navigate = useNavigate();

  // Aquí haces la llamada al backend en el loginHandler
  const loginHandler = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`, 
        {
          email: loginCredential.email,
          password: loginCredential.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,  // Si el backend utiliza cookies o sesión
        }
      );
  
      const data = response.data;
  
      if (data.user) {
        login(data.user);  // Llamar a la función de login del contexto
        navigate("/cart");  // Redirigir al carrito después del login exitoso
      } else {
        setErrorMessage("Email o contraseña incorrectos.");
      }
    } catch {
      setErrorMessage("Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo.");
    }
  };
  
  
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={loginHandler} className="login-body">
        
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error */}
        
        <div className="email-container">
          <label htmlFor="email">Email</label>
          <input
            value={loginCredential.email}
            required
            onChange={(e) =>
              setLoginCredential({
                ...loginCredential,
                email: e.target.value,
              })
            }
            id="email"
            placeholder="Email Address"
            type="email"
          />
        </div>

        <div className="password-container">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <input
              value={loginCredential.password}
              required
              onChange={(e) =>
                setLoginCredential({
                  ...loginCredential,
                  password: e.target.value,
                })
              }
              id="password"
              placeholder="Password"
              type={hidePassword ? "password" : "text"}
            />
            {hidePassword ? (
              <BsEyeSlash
                className="hide-show-password-eye"
                onClick={() => setHidePassword(!hidePassword)}
              />
            ) : (
              <BsEye
                className="hide-show-password-eye"
                onClick={() => setHidePassword(!hidePassword)}
              />
            )}
          </div>
        </div>

        <div className="login-btn-container">
          <input value="Login" type="submit" />
        </div>

        <Link className="new-account" to="/signup">
          Create a new account?
        </Link>
      </form>
    </div>
  );
};
