import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  interface Movie {
    Title: string;
    Year: string;
    Genre: string;
    imdbRating: string;
    Plot: string;
    Poster: string;
  }

  const fetchData = async () => {
    if (!query) return;
    setLoading(true);
    setData(null);

    try {
      const response = await fetch(
        `https://67e52ac03d09f16db0e1.appwrite.global/api/movies?title=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl font-semibold mb-6">Search for a Movie</h1>
        <div className="w-full flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Enter movie title..."
            className="w-full px-4 py-2 text-black rounded-lg outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={fetchData}
            className="w-full px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      <div className="mt-8 w-full max-w-2xl text-center">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : data ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <img
              src={data.Poster}
              alt={data.Title}
              className="w-40 mx-auto mb-4 rounded-lg"
            />
            <h2 className="text-2xl font-bold">
              {data.Title} ({data.Year})
            </h2>
            <p className="text-gray-400">{data.Genre}</p>
            <p className="text-yellow-500 font-semibold">
              IMDb Rating:{" "}
              {data.imdbRating !== "N/A" ? data.imdbRating : "Not Available"}
            </p>
            <p className="text-sm text-gray-400 mt-2">{data.Plot}</p>
          </div>
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
}
