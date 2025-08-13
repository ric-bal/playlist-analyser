import { isTokenExpired, refreshToken } from "./Token";
import axiosInstance from "./axiosInstance";

export async function getPlaylist() {
  var token = localStorage.getItem("token_key");

  if (isTokenExpired()) {
    await refreshToken();
    token = localStorage.getItem("token_key");
  }

  const response = await axiosInstance.get(
    "https://api.spotify.com/v1/playlists/0giwPznzYlCJ9O7g8mhhmP", // 3cEYpjA9oz9GiPac4AsH4n or 0giwPznzYlCJ9O7g8mhhmP
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}
