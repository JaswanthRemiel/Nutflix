import { Client } from 'node-appwrite';
import axios from 'axios';

const OMDB_API_KEY = process.env.API_KEY;
const OMDB_API_URL = 'http://www.omdbapi.com/';

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

// ✅ Appwrite Cloud Function
export default async ({ req, res }) => {
    const url = new URL(req.url, 'http://localhost');
    const title = url.searchParams.get('title');

    const { status, body } = await fetchMovie(title);
    return res.status(status).json(body);
};

// ✅ Local Server (for testing)
if (require.main === module) {
    const express = require('express');
    const app = express();

    app.get('/api/movies', async (req, res) => {
        const { status, body } = await fetchMovie(req.query.title);
        res.status(status).json(body);
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
