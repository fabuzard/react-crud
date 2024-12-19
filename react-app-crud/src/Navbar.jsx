import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">Home</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
          <Link to="/register" className="text-white hover:text-gray-400">register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
