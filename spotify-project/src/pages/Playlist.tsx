import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { getPlaylist } from "../api/getPlaylist";
import Result from "./Result";
import { getArtist } from "../api/getArtist";

function msToTime(duration: number, options: { showHours: boolean }) {
  let milliseconds = Math.floor((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);

  let minutes: number;
  if (options.showHours) {
    minutes = Math.floor((duration / (1000 * 60)) % 60);
  } else {
    minutes = Math.floor(duration / (1000 * 60));
  }

  let minutesString = minutes < 10 ? "0" + minutes : minutes;
  let secondsString = seconds < 10 ? "0" + seconds : seconds;

  if (options.showHours) {
    let hours = Math.floor(duration / (1000 * 60 * 60));
    let hoursString = hours < 10 ? "0" + hours : hours;
    return (
      hoursString +
      ":" +
      minutesString +
      ":" +
      secondsString +
      "." +
      milliseconds
    );
  } else {
    return minutesString + ":" + secondsString + "." + milliseconds;
  }
}

function Playlist() {
  console.log(msToTime(8507713, { showHours: true }));

  const [artistEndpoint, setArtistEndpoint] = useState("");

  // ===== EXTRACTING SURFACE LEVEL PLAYLIST DATA =====

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
    totalSongs: number;
    playlistLengthMillis: number;
    longestSong: (string | number)[];
    shortestSong: (string | number)[];
    popularityArray: number[];
    mostPopularSong: (string | number)[];
    leastPopularSong: (string | number)[];
    artistCounter: [string, number][];
    genreCounter: [string, number][];
  }>({
    status: status,
    errorMessage: "",
    title: "",
    creator: "",
    desc: "",
    coverURL: "",
    songCoverURLs: [],
    totalSongs: 0,
    playlistLengthMillis: 0,
    longestSong: [],
    shortestSong: [],
    popularityArray: [],
    mostPopularSong: [],
    leastPopularSong: [],
    artistCounter: [],
    genreCounter: [],
  });

  // error message handling
  useEffect(() => {
    let errorMessage = "";
    if (isError) {
      if (axios.isAxiosError(error)) {
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
      } else {
        errorMessage = "Access token missing";
      }
    }

    setPlaylistData((prev) => ({
      ...prev,
      status,
      errorMessage,
    }));
  }, [isError, status, error]);

  // extracting data
  useEffect(() => {
    var IDArray = new Array();

    if (status === "success" && data) {
      const songCoverURLArray = new Array();
      let playlistLengthMillisTemp = 0;
      let longestSongTemp = ["", -Infinity];
      let shortestSongTemp = ["", Infinity];
      let popularityArrayTemp = Array(10).fill(0);
      let mostPopularSongTemp = ["", -Infinity];
      let leastPopularSongTemp = ["", Infinity];
      let artistCounterTemp: { [name: string]: number } = {};

      const totalTracks = data?.data.tracks.total;

      for (let i = 0; i < totalTracks; i++) {
        // individual song data
        const trackData = data?.data.tracks.items[i].track;

        // playlist covers
        if (i < 36 && i < totalTracks) {
          songCoverURLArray.push(trackData.album.images[0].url);
        }

        if (i === totalTracks - 1 && songCoverURLArray.length < 36) {
          const fixedArraySize = songCoverURLArray.length;
          for (let i = 0; i < 36 - fixedArraySize; i++) {
            songCoverURLArray.push("placeholder");
          }
        }

        // total playlist length
        playlistLengthMillisTemp += trackData.duration_ms;

        // longest and shortest songs
        if (trackData.duration_ms > longestSongTemp[1]) {
          longestSongTemp[0] = trackData.name;
          longestSongTemp[1] = trackData.duration_ms;
        }
        if (trackData.duration_ms < shortestSongTemp[1]) {
          shortestSongTemp[0] = trackData.name;
          shortestSongTemp[1] = trackData.duration_ms;
        }

        // song popularity counters (0 - 10)
        let index = Math.round(trackData.popularity / 10);
        popularityArrayTemp[index] += 1;

        // most and least popular songs
        if (trackData.popularity > mostPopularSongTemp[1]) {
          mostPopularSongTemp[0] = trackData.name;
          mostPopularSongTemp[1] = trackData.popularity;
        }
        if (trackData.popularity < leastPopularSongTemp[1]) {
          leastPopularSongTemp[0] = trackData.name;
          leastPopularSongTemp[1] = trackData.popularity;
        }

        // counting artists and constructing IDArray
        trackData.artists.forEach((artist: any) => {
          let artistName = artist.name;
          if (artistName in artistCounterTemp) {
            artistCounterTemp[artistName] += 1;
          } else {
            artistCounterTemp[artistName] = 1;

            if (IDArray.length < 50) {
              IDArray.push(artist.id);
            }
          }
        });
      }

      // most to least popular artists, object to array
      let artistCounterTempArray = Object.entries(artistCounterTemp).sort(
        ([, a], [, b]) => b - a
      );

      setArtistEndpoint(
        "https://api.spotify.com/v1/artists?ids=" + IDArray.join(",")
      );

      setPlaylistData({
        status,
        errorMessage: "",
        title: data.data.name,
        creator: data.data.owner.display_name,
        desc: data.data.description,
        coverURL: data.data.images[0].url,
        songCoverURLs: songCoverURLArray,
        totalSongs: totalTracks,
        playlistLengthMillis: playlistLengthMillisTemp,
        longestSong: longestSongTemp,
        shortestSong: shortestSongTemp,
        popularityArray: popularityArrayTemp,
        mostPopularSong: mostPopularSongTemp,
        leastPopularSong: leastPopularSongTemp,
        artistCounter: artistCounterTempArray,
        genreCounter: [],
      });
    }
  }, [status, data]);

  // ===== EXTRACTING SURFACE LEVEL PLAYLIST DATA =====

  // requesting artist data
  const artistQuery = useQuery({
    queryKey: ["artistDataQueryKey", artistEndpoint],
    queryFn: () => getArtist(artistEndpoint),
    enabled: !!artistEndpoint,
    retry: false,
  });

  // extracting data
  useEffect(() => {
    let genreCounterTemp: { [name: string]: number } = {};

    if (!artistQuery.isError) {
      // counting genres
      artistQuery.data?.data.artists.forEach((artist: any) => {
        artist.genres.forEach((genre: string) => {
          if (genre in genreCounterTemp) {
            genreCounterTemp[genre] += 1;
          } else {
            genreCounterTemp[genre] = 1;
          }
        });
      });

      // most to least popular genres, object to array
      let genreCounterTempArray = Object.entries(genreCounterTemp).sort(
        ([, a], [, b]) => b - a
      );

      setPlaylistData((prev) => ({
        ...prev,
        genreCounter: genreCounterTempArray,
      }));
    }
  }, [data, artistQuery.isError, artistQuery.data]);

  return <Result playlistData={playlistData} />;
}

export default Playlist;
