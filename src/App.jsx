import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      if (!response.ok) {
        throw new Error('Falha ao obter os dados da API.');
      }
      
      const data = await response.json();
      setPosts(data.slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Lista de Posts
          </h1>
          <button
            onClick={fetchPosts}
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 active:scale-95"
          >
            Recarregar dados
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <span className="text-lg font-medium text-slate-500 animate-pulse">
              Carregando...
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md shadow-sm">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-6">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="px-6 py-6">
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      ID: {post.id}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 capitalize leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {post.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;