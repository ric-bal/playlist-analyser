import axiosInstance from "./axiosInstance";

export async function getPlaylist(id: string) {
  const response = await axiosInstance.get(
    "https://playlist-analyser.onrender.com/api/get_playlist",
    {
      params: { id },
    }
  );

  return response;
}
