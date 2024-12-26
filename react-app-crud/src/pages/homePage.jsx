import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({ name }) {
  const token = localStorage.getItem(`token`);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error,setError] = useState("");
  const Navigate = useNavigate();

  const redirect = ()=>{
    setTimeout(() => {
      Navigate('/login')
    }, 2000);
  }

  useEffect(() => {
    const fetchProtectedData = async () => {
  if (token) {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/validatetoken",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status == 200) {
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error("Token validation failed",error);
      setIsLoggedIn(false)
      setError("Session expired, please log in again.")

    }
  } else {
    setIsLoggedIn(false)
  }
    };

    fetchProtectedData(); // Add this to call the function
  }, []); // Closing useEffect hook with the correct empty dependency array
  if(!isLoggedIn){
    return (<div className="min-h-screen flex items-center justify-center bg-green-100 text-3xl font-bold text-gray-800 mb-4">{error || 'Please log in to access this page.'}{redirect()}</div>)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Our Website, {name}!
        </h1>
        <p className="text-lg text-gray-700">
          We're glad to have you here. Explore and enjoy our features!
        </p>
      </div>
    </div>
  );
}

export default HomePage;
