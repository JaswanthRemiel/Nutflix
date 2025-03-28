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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
// ✅ Appwrite Function (Fixes `res.status is not a function`)
export default async ({ req, res }) => {
    const url = new URL(req.url, 'http://localhost');
    const title = url.searchParams.get('title');
    const { status, body } = await fetchMovie(title);

    return res.json(body, status);  // ✅ Correct usage for Appwrite functions
};
