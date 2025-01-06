import { Link } from "react-router-dom";
import { Context } from "./app";
import { useContext } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn,logout] = useContext(Context);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">Home</Link>
        </div>

        {isLoggedIn ? (
          <div className="text-white">
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="text-white">
            {" "}
            <div className="space-x-4">
              <Link to="/" className="text-white hover:text-gray-400">
                Home
              </Link>
              <Link to="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-400">
                register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
