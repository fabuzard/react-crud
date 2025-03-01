import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../app";
import TaskList from "../components/TaskList.jsx";

function HomePage({ name }) {
  const token = localStorage.getItem("token");
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

  const [isLoggedIn, setIsLoggedIn] = useContext(Context);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // For validating token and checking if the token is valid
  useEffect(() => {
    const fetchProtectedData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${apiEndpoint}/api/validatetoken`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            setIsLoggedIn(true); // Set logged in state if the token is valid
          } else {
            setIsLoggedIn(false);
            setError("Session expired, please log in again.");
          }
        } catch (error) {
          setIsLoggedIn(false);
          setError("Session expired, please log in again.");
        }
      } else {
        setIsLoggedIn(false);
        setError("No token provided. Please log in.");
      }

      setLoading(false); // Set loading to false once token validation is done
    };

    fetchProtectedData();
  }, [token, apiEndpoint, setIsLoggedIn]);

  // Second useEffect to prevent immediate redirect while loading state is true
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isLoggedIn, navigate, loading]);

  // Loading screen while waiting for token validation
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-3xl font-bold">Loading...</div>
      </div>
    );
  }

  // If the user is not logged in, show the error message
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100 text-3xl font-bold text-gray-800 mb-4">
        {error || "Please log in to access this page."}
      </div>
    );
  }

  // Render homepage if the user is logged in
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 flex-col space-y-10">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Our Website, {name}!
        </h1>

        <p className="text-lg text-gray-700">
          We're glad to have you here. Explore and enjoy our features!
        </p>
      </div>
      <TaskList /> {/* Your task list component */}
    </div>
  );
}

export default HomePage;
