import { isTokenExpired, refreshToken } from "./Token";
import axiosInstance from "./axiosInstance";

export async function getArtist(endpoint: string) {
  var token = localStorage.getItem("token_key");

  if (isTokenExpired()) {
    await refreshToken();
    token = localStorage.getItem("token_key");
  }

  const response = await axiosInstance.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
