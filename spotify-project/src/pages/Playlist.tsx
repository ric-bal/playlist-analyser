import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { getPlaylist } from "../api/getPlaylist";
import Result from "./Result";

function Playlist() {
  // requesting playlist data
  const { status, data, error, isError } = useQuery({
    queryKey: ["playlistDataQueryKey"],
    queryFn: getPlaylist,
    retry: false,
  });

  const [playlistData, setPlaylistData] = useState<{
    status: string;
    errorMessage: string;
    title: string;
    creator: string;
    desc: string;
    coverURL: string;
    songCoverURLs: string[];
  }>({
    status: status,
    errorMessage: "",
    title: "",
    creator: "",
    desc: "",
    coverURL: "",
    songCoverURLs: [],
  });

  // error message handling
  useEffect(() => {
    let errorMessage = "";
    if (isError && axios.isAxiosError(error)) {
      const statusNumber = error.response?.status;
      if (statusNumber === 400) {
        errorMessage = "Playlist not found";
      } else if (statusNumber === 401) {
        errorMessage = "Bad token";
      } else if (statusNumber === 429) {
        errorMessage = "Exceeded rate limit";
      } else {
        errorMessage = "Unexpected error";
      }
    }

    setPlaylistData((prev) => ({
      ...prev,
      status,
      errorMessage,
    }));
  }, [isError, status, error]);

  // songs
  const songCoverURLArray = new Array();
  useEffect(() => {
    for (let i = 0; i < 36; i++) {
      if (data?.data.tracks.total > i) {
        songCoverURLArray.push(
          data?.data.tracks.items[i].track.album.images[0].url
        );
      } else {
        songCoverURLArray.push("placeholder");
      }
    }
  }, [data]);

  // setting playlist data
  useEffect(() => {
    if (status === "success" && data) {
      setPlaylistData({
        status,
        errorMessage: "",
        title: data.data.name,
        creator: data.data.owner.display_name,
        desc: data.data.description,
        coverURL: data.data.images[0].url,
        songCoverURLs: songCoverURLArray,
      });
    }
  }, [status, data]);

  return <Result playlistData={playlistData} />;
}

export default Playlist;
