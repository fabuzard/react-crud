function HomePage({ name }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Website, {name}!</h1>
          <p className="text-lg text-gray-700">We're glad to have you here. Explore and enjoy our features!</p>
        </div>
      </div>
    );
  }
  
  export default HomePage;
  