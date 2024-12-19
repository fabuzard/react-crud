import Navbar from "./Navbar";
import Home from './pages/home'
import Login from './pages/login'
import HomePage from "./pages/homePage";
import Register from "./pages/register"
import {Route,Routes} from "react-router-dom"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      
      </Routes>
    </div>
  );
}

export default App;
