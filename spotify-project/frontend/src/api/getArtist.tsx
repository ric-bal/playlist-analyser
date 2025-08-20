import axiosInstance from "./axiosInstance";

export async function getArtist(endpoint: string) {
  const response = await axiosInstance.get(
    "http://localhost:4000/api/get_artist",
    {
      params: { endpoint },
    }
  );

  return response;
}
