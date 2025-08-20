require('dotenv-safe').config();

const storage = new Map();

const axios = require('axios');
const axiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const express = require('express');
const router = express.Router()

// managing token
const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const setToken = (token, expiry) => {
    storage.set("token", token);
    storage.set("expiry", String(Date.now() + expiry * 1000))
};

const getTokenExpiry = (token) => {
    return storage.get("expiry");
};

const isTokenExpired = () => {
    const expiry = getTokenExpiry();

    if (!expiry) return true;
    return Date.now() >= Number(expiry);
};

const refreshToken = async () => {
    let retryCount = 3;
    let lastError = 0;

    for (let i = 0; i < retryCount; i++) {
        try {
            const response = await axios.post(
                "https://accounts.spotify.com/api/token",
                "grant_type=client_credentials",
                {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + Buffer.from(clientID + ":" + clientSecret).toString('base64'),
                },
                }
            );

            if (response.status <= 400) {
                setToken(response.data.access_token, response.data.expires_in);
                return;
            } else {
                lastError = new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (e) {
            lastError = e;
        }

        throw new Error("Failed to refresh access token: " + lastError);
    }
};

// ROUTES

// playlist
router.get('/api/get_playlist', async (req, res) => {
    const params = new URLSearchParams(req.query);

    if (isTokenExpired()) {
        await refreshToken();
    }

    let token = storage.get("token");
    
    const response = await axiosInstance.get(
        "https://api.spotify.com/v1/playlists/" + params.get("id"), // 3cEYpjA9oz9GiPac4AsH4n or 0giwPznzYlCJ9O7g8mhhmP
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );

    res.send(response.data)
})

// artist
router.get('/api/get_artist', async (req, res) => {
    const params = new URLSearchParams(req.query);

    if (isTokenExpired()) {
        await refreshToken();
    }

    let token = storage.get("token");

    const response = await axiosInstance.get(params.get("endpoint"), {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    
    res.send(response.data)
})


module.exports = router