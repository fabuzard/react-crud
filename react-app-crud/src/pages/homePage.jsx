import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../app";

function HomePage({ name }) {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useContext(Context);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/api/validatetoken", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          setIsLoggedIn(false);
          setError("Session expired, please log in again.");
        }
      } else {
        setIsLoggedIn(false);
        setError("No token provided. Please log in.");
      }

      setLoading(false);
    };

    fetchProtectedData();
  }, [token]);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isLoggedIn, navigate, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100 text-3xl font-bold text-gray-800 mb-4">
        {error || "Please log in to access this page."}
      </div>
    );
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
