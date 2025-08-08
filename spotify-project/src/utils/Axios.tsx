import axios from "axios";

// managing token
const tokenKey = "token_key";
const tokenKeyExpiry = "token_expiry";
const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // TEMPORARY, IMPLEMENT BACKEND
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const axiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

const getTokenExpiry = () => {
  return localStorage.getItem(tokenKeyExpiry);
};

const setTokenExpiry = (expiry: number) => {
  localStorage.setItem(tokenKeyExpiry, String(Date.now() + expiry * 1000));
};

const isTokenExpired = () => {
  const expiry = getTokenExpiry();

  if (!expiry) return true;
  return Date.now() >= Number(expiry);
};

const refreshToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
      },
    }
  );

  setToken(response.data.access_token);
  setTokenExpiry(response.data.expires_in);
};

// interceptor
axiosInstance.interceptors.request.use(async (req) => {
  if (isTokenExpired()) {
    await refreshToken();
  }

  return req;
});

export default axiosInstance;
