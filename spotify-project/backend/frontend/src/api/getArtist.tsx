import axios from "axios";

export async function getArtist(endpoint: string) {
  const response = await axios.get("/api/get_artist", {
    params: { endpoint },
  });

  return response;
}
