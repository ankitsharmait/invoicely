import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <h1 className="text-5xl font-extrabold mb-16 text-gray-800 tracking-wider animate-pulse">
        🌟  
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <button
          onClick={() => navigate('/add-item')}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-bold py-5 px-10 rounded-3xl text-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          ➕ Add New Item
        </button>

        <button
          onClick={() => navigate('/generate-bill')}
          className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold py-5 px-10 rounded-3xl text-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          🧾 Generate Bill
        </button>
      </div>

      <p className="mt-12 text-gray-600 text-center max-w-lg">
        Your smart billing assistant — track, generate, and manage shop bills with ease.
      </p>
    </div>
  );
}

export default Home;  