import 'dotenv/config';
import axios from 'axios';

const OMDB_API_KEY = process.env.API_KEY;
const OMDB_API_URL = 'http://www.omdbapi.com/';

// ✅ Function to fetch movie details
async function fetchMovie(title) {
    if (!title) {
        return { status: 400, body: { error: "Title query parameter is required" } };
    }
    try {
        const response = await axios.get(`${OMDB_API_URL}?t=${title}&apikey=${OMDB_API_KEY}`);

        if (response.data.Response === "False") {
            return { status: 404, body: { error: "Movie not found in the database" } };
        }
        return { status: 200, body: response.data };
    } catch (error) {
        console.error("Error fetching data from API:", error);
        return { status: 500, body: { error: "Internal Server Error" } };
    }
}

// ✅ Appwrite Function with CORS Fix
export default async ({ req, res }) => {
    const url = new URL(req.url, 'http://localhost');
    const title = url.searchParams.get('title');
    const { status, body } = await fetchMovie(title);

    res.setHeader('Access-Control-Allow-Origin', '*'); // ✅ Fix CORS
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.send("", 204); // ✅ Handle preflight request
    }

    return res.json(body, status);
};
