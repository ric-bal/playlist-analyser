import axiosInstance from "./axiosInstance";

export async function getPlaylist(id: string) {
  const response = await axiosInstance.get("/api/get_playlist", {
    params: { id },
  });

  return response;
}
