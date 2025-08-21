import axios from "axios";

export async function getPlaylist(id: string) {
  const response = await axios.get("/api/get_playlist", {
    params: { id },
  });

  return response;
}
