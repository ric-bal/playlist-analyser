import axiosInstance from "../utils/Axios.tsx";

export async function getPlaylist() {
  const token = localStorage.getItem("token_key");

  if (!token) {
    throw new Error("Access token is missing");
  }

  const response = await axiosInstance.get(
    "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n", // 3cEYpjA9oz9GiPac4AsH4n or 0giwPznzYlCJ9O7g8mhhmP
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}
