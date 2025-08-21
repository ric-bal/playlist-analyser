import axiosInstance from "./axiosInstance";

export async function getArtist(endpoint: string) {
  const response = await axiosInstance.get("/api/get_artist", {
    params: { endpoint },
  });

  return response;
}
