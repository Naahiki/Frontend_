import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { NavRoutes } from "./routes/NavRoutes";  
import { AuthProvider } from "./context/AuthContext"; 

function App() {
  return (
    <div className="App">
      <AuthProvider> 
        <Router>
          <Header />
          <NavRoutes />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

