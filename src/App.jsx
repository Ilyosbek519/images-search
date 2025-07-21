import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from './features/imageSlice';

function App() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.images);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return alert('Iltimos, rasm nomini kiriting!');
    dispatch(fetchImages(query));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white p-6">


      <div className="max-w-xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold">Unsplash Search Image</h1>
        <form onSubmit={handleSearch} className="flex gap-3">
        <input
         type="text"
         placeholder="Search image..."
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         className="w-full px-4 py-2 rounded-full border-2 border-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 text-base"
 />

          <button
            type="submit"
            className="btn btn-outline btn-primary px-5 py-1.5 rounded-full border-2 text-sm font-medium tracking-wide hover:scale-105 transition duration-200"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-6xl mx-auto">
        {loading ? (
          <span className="loading loading-spinner loading-lg mx-auto"></span>
        ) : (
          list.map((src, i) => (
            <div key={i} className="card bg-base-100 shadow-xl overflow-hidden rounded-xl">
              <img
                src={src}
                alt="unsplash"
                className="w-full h-60 object-cover rounded-xl transition hover:scale-105"
              />
              <div className="p-3 text-center">
                <a
                  href={src}
                  target="_blank"
                  download={`image-${i}.jpg`}
                  className="bg-green-400 btn btn-outline btn-primary px-5 py-1.5 rounded-full border-2 text-sm font-medium tracking-wide hover:scale-105 transition duration-200"
                  >
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
