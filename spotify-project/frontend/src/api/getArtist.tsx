import axiosInstance from "./axiosInstance";

export async function getArtist(endpoint: string) {
  const response = await axiosInstance.get(
    "https://playlist-analyser.onrender.com/api/get_artist",
    {
      params: { endpoint },
    }
  );

  return response;
}
