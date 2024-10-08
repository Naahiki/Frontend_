// import { useContext, useState } from "react";
// import "./Signup.css";
// import { Link, useNavigate } from "react-router-dom";
// import { BsEyeSlash, BsEye } from "react-icons/bs";
// import axios from "axios";
// import { AuthContext } from "../../../context/AuthContext";  // Importamos el AuthContext

// export const Signup = () => {
//   const [hidePassword, setHidePassword] = useState(true);
//   const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
//   const [signupCredential, setSignupCredential] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//   });

//   const { login } = useContext(AuthContext); // Obtenemos el método login del contexto
//   const navigate = useNavigate();

//   const signupHandler = async (e) => {
//     e.preventDefault();
    
//     if (signupCredential.password === signupCredential.confirmPassword) {
//       try {
//         // Enviar los datos de registro al backend
//         const response = await axios.post('http://localhost:5000/register', {
//           user_email: signupCredential.email,
//           user_password: signupCredential.password,
//           user_first_name: signupCredential.firstName,
//           user_last_name: signupCredential.lastName,
//         });
  
//         // Si el registro es exitoso, capturamos el ID del usuario
//         if (response.status === 200) {
//           const { user_id } = response.data;  // Solo capturamos el 'user_id'
  
//           const userData = {
//             id: user_id,  // Asegurarnos de guardar el 'user_id'
//             firstName: signupCredential.firstName,  // Usamos los valores que ya están en signupCredential
//             lastName: signupCredential.lastName,
//             email: signupCredential.email,
//           };
  
//           // Guardamos el usuario en el contexto de autenticación
//           login(userData);
  
//           // Redirige al usuario tras el registro exitoso
//           navigate("/cart");
//         }
//       } catch (error) {
//         console.error("Error al registrar el usuario", error);
//       }
//     } else {
//       console.error("Passwords do not match");
//     }
//   };
  
  

//   return (
//     <div className="signup-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={signupHandler} className="signup-body">
//         {/* Email input */}
//         <div className="email-container">
//           <label htmlFor="email">Email Address</label>
//           <input
//             required
//             onChange={(e) =>
//               setSignupCredential({
//                 ...signupCredential,
//                 email: e.target.value,
//               })
//             }
//             id="email"
//             placeholder="Enter Email"
//             type="email"
//           />
//         </div>

//         {/* Password input */}
//         <div className="password-container">
//           <label htmlFor="password">Password</label>
//           <div className="input-container">
//             <input
//               required
//               onChange={(e) =>
//                 setSignupCredential({
//                   ...signupCredential,
//                   password: e.target.value,
//                 })
//               }
//               id="password"
//               minLength="8"
//               placeholder="Enter Password"
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

//         {/* Confirm Password input */}
//         <div className="confirm-password-container">
//           <label htmlFor="confirm-password">Confirm Password</label>
//           <div className="input-container">
//             <input
//               required
//               onChange={(e) =>
//                 setSignupCredential({
//                   ...signupCredential,
//                   confirmPassword: e.target.value,
//                 })
//               }
//               id="confirm-password"
//               minLength="8"
//               placeholder="Enter Password Again"
//               type={hideConfirmPassword ? "password" : "text"}
//             />
//             {hideConfirmPassword ? (
//               <BsEyeSlash
//                 className="hide-show-password-eye"
//                 onClick={() =>
//                   setHideConfirmPassword(!hideConfirmPassword)
//                 }
//               />
//             ) : (
//               <BsEye
//                 className="hide-show-password-eye"
//                 onClick={() =>
//                   setHideConfirmPassword(!hideConfirmPassword)
//                 }
//               />
//             )}
//           </div>
//         </div>

//         {/* First Name and Last Name input */}
//         <div className="name-container">
//           <label htmlFor="first-name">First Name</label>
//           <input
//             required
//             onChange={(e) =>
//               setSignupCredential({
//                 ...signupCredential,
//                 firstName: e.target.value,
//               })
//             }
//             id="first-name"
//             placeholder="Enter First Name"
//             type="text"
//           />
//         </div>

//         <div className="name-container">
//           <label htmlFor="last-name">Last Name</label>
//           <input
//             required
//             onChange={(e) =>
//               setSignupCredential({
//                 ...signupCredential,
//                 lastName: e.target.value,
//               })
//             }
//             id="last-name"
//             placeholder="Enter Last Name"
//             type="text"
//           />
//         </div>

//         {/* Accept terms */}
//         <div className="remember-me-container">
//           <div>
//             <input required name="remember-me" type="checkbox" />
//             <label htmlFor="remember-me">
//               I accept all terms and conditions
//             </label>
//           </div>
//         </div>

//         <div className="signup-btn-container">
//           <input value="Sign Up" type="submit" />
//         </div>
//         <Link to="/login">Already have an account?</Link>
//       </form>
//     </div>
//   );
// };


import { useContext, useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";  

export const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [signupCredential, setSignupCredential] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // estado para mensajes de error
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
  
    if (signupCredential.password !== signupCredential.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
  
    try {
      // Enviar los datos de registro al backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        {
          user_email: signupCredential.email,
          user_password: signupCredential.password,
          user_first_name: signupCredential.firstName,
          user_last_name: signupCredential.lastName,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,  // Si el backend utiliza cookies o sesión
        }
      );
  
      if (response.status === 200) {
        const { user_id } = response.data;
  
        const userData = {
          id: user_id,
          firstName: signupCredential.firstName,
          lastName: signupCredential.lastName,
          email: signupCredential.email,
        };
  
        login(userData); // Llamar a la función de login del contexto
        navigate("/cart"); // Redirigir al carrito tras el registro exitoso
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Error al registrar el usuario. Inténtalo de nuevo.");
    }
  };
  
  
  
  
  
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={signupHandler} className="signup-body">
        
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error */}
        
        {/* Email input */}
        <div className="email-container">
          <label htmlFor="email">Email Address</label>
          <input
            required
            onChange={(e) =>
              setSignupCredential({
                ...signupCredential,
                email: e.target.value,
              })
            }
            id="email"
            placeholder="Enter Email"
            type="email"
          />
        </div>

        {/* Password input */}
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <input
              required
              onChange={(e) =>
                setSignupCredential({
                  ...signupCredential,
                  password: e.target.value,
                })
              }
              id="password"
              minLength="8"
              placeholder="Enter Password"
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

        {/* Confirm Password input */}
        <div className="confirm-password-container">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="input-container">
            <input
              required
              onChange={(e) =>
                setSignupCredential({
                  ...signupCredential,
                  confirmPassword: e.target.value,
                })
              }
              id="confirm-password"
              minLength="8"
              placeholder="Enter Password Again"
              type={hideConfirmPassword ? "password" : "text"}
            />
            {hideConfirmPassword ? (
              <BsEyeSlash
                className="hide-show-password-eye"
                onClick={() =>
                  setHideConfirmPassword(!hideConfirmPassword)
                }
              />
            ) : (
              <BsEye
                className="hide-show-password-eye"
                onClick={() =>
                  setHideConfirmPassword(!hideConfirmPassword)
                }
              />
            )}
          </div>
        </div>

        {/* First Name and Last Name input */}
        <div className="name-container">
          <label htmlFor="first-name">First Name</label>
          <input
            required
            onChange={(e) =>
              setSignupCredential({
                ...signupCredential,
                firstName: e.target.value,
              })
            }
            id="first-name"
            placeholder="Enter First Name"
            type="text"
          />
        </div>

        <div className="name-container">
          <label htmlFor="last-name">Last Name</label>
          <input
            required
            onChange={(e) =>
              setSignupCredential({
                ...signupCredential,
                lastName: e.target.value,
              })
            }
            id="last-name"
            placeholder="Enter Last Name"
            type="text"
          />
        </div>

        {/* Accept terms */}
        <div className="remember-me-container">
          <div>
            <input required name="remember-me" type="checkbox" />
            <label htmlFor="remember-me">
              I accept all terms and conditions
            </label>
          </div>
        </div>

        <div className="signup-btn-container">
          <input value="Sign Up" type="submit" />
        </div>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
};
