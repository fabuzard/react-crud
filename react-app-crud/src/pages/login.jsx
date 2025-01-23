import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT; // Assuming .env is configured
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${apiEndpoint}/api/login`, loginData);
      if (response.status === 200) {
        const { token } = response.data;
        console.log(`Received Token: `, token);

        // Store token in localStorage
        localStorage.setItem(`token`, token);

        // Reset error and navigate to the homepage
        setError('');
        navigate('/homepage');
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        setError(error.response.data.message);
      } else {
        console.error(`Error`, error);
        setError("An error has occurred");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
