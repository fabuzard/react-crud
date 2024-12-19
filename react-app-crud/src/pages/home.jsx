import { Link } from "react-router-dom";
import Popup from "../components/Popup"
import { useState } from "react";
function Home() {
    const [popupVisible,setPopupVisible] = useState(false);
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Website!</h1>
        <p className="text-lg text-gray-700 mb-6">Join us today for exclusive access to amazing features. Register now!</p>
        <Link
          to="/register"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-500 transition duration-300"
        >
          Register Now
        </Link>

        <button onClick={()=>{setPopupVisible(true)}}>Testing</button>
        {popupVisible && (
        <Popup
          title="Testing if this works"
          content="Ahahahhaa"
          onClose={() => setPopupVisible(false)} // Close popup on "Close"
        />
      )}
        
      </div>
    );
  }
  
  export default Home;
  