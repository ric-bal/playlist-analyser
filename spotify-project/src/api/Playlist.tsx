import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { getPlaylist } from "./getPlaylist";
import Result from "../pages/Result";
import { getArtist } from "./getArtist";
import { useLocation } from "react-router-dom";

function msToTime(duration: any, options: { showHours: boolean }) {
  let seconds = Math.floor((duration / 1000) % 60);

  let minutes: number;
  if (options.showHours) {
    minutes = Math.floor((duration / (1000 * 60)) % 60);
  } else {
    minutes = Math.floor(duration / (1000 * 60));
  }

  if (options.showHours) {
    let hours = Math.floor(duration / (1000 * 60 * 60));

    return hours + "h " + minutes + "m " + seconds + "s ";
  } else {
    return minutes + "m " + seconds + "s ";
  }
}

function errorMessageHandler(isError: boolean, error: Error | null) {
  let errorMessage = "";

  if (isError) {
    if (axios.isAxiosError(error)) {
      const statusNumber = error.response?.status;

      if (statusNumber === 400) {
        errorMessage = "Playlist data not found";
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

  return errorMessage;
}

function Playlist() {
  const [artistEndpoint, setArtistEndpoint] = useState("");
  const { state } = useLocation(); // data from SearchBar.tsx

  // ===== EXTRACTING SURFACE LEVEL PLAYLIST DATA =====

  // requesting playlist data
  const { status, data, error, isError } = useQuery({
    queryKey: ["playlistDataQueryKey"],
    queryFn: () => getPlaylist(state),
    retry: false,
    gcTime: 0,
  });

  const [playlistData, setPlaylistData] = useState<{
    status: string;
    errorMessage: string;
    title: string;
    creator: string;
    desc: string;
    coverURL: string;
    songCoverURLs: string[];
    totalSongs: string;
    playlistLength: string;
    longestSong: (string | number)[];
    shortestSong: (string | number)[];
    popularityArray: { pop: string; count: number }[];
    averagePopularity: string;
    mostPopularSong: (string | number)[];
    leastPopularSong: (string | number)[];
    artistArray: { name: string; count: number }[];
    genreArray: { genre: string; count: number; fill: string }[];
  }>({
    status: status,
    errorMessage: "",
    title: "",
    creator: "",
    desc: "",
    coverURL: "",
    songCoverURLs: [],
    totalSongs: "",
    playlistLength: "",
    longestSong: [],
    shortestSong: [],
    popularityArray: [],
    averagePopularity: "",
    mostPopularSong: [],
    leastPopularSong: [],
    artistArray: [],
    genreArray: [],
  });

  // error message handling
  useEffect(() => {
    let errorMessage = errorMessageHandler(isError, error);
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
      let playlistLengthMillis = 0;
      let longestSongTemp = ["", -Infinity];
      let shortestSongTemp = ["", Infinity];

      let popularityArrayTemp: { pop: string; count: number }[] = [];
      for (let i = 0; i <= 100; i = i + 10) {
        popularityArrayTemp.push({ pop: i.toString(), count: 0 });
      }

      let popularityCounter = 0;
      let mostPopularSongTemp = ["", -Infinity];
      let leastPopularSongTemp = ["", Infinity];

      let artistArrayTemp: { name: string; count: number }[] = [];

      const totalTracks = data?.data.tracks.total;

      for (let i = 0; i < Math.min(100, totalTracks); i++) {
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
        playlistLengthMillis += trackData.duration_ms;

        // longest and shortest songs
        if (trackData.duration_ms > longestSongTemp[1]) {
          longestSongTemp[0] = trackData.name;
          longestSongTemp[1] = trackData.duration_ms;
        }
        if (trackData.duration_ms < shortestSongTemp[1]) {
          shortestSongTemp[0] = trackData.name;
          shortestSongTemp[1] = trackData.duration_ms;
        }

        // song popularity counters (popularity is 0 - 100)
        popularityCounter += trackData.popularity;

        let index = Math.round(trackData.popularity / 10);
        popularityArrayTemp[index].count += 1;

        // most and least popular songs
        if (trackData.popularity > mostPopularSongTemp[1]) {
          mostPopularSongTemp[0] = trackData.name;
          mostPopularSongTemp[1] = trackData.popularity.toFixed(2);
        }
        if (trackData.popularity < leastPopularSongTemp[1]) {
          leastPopularSongTemp[0] = trackData.name;
          leastPopularSongTemp[1] = trackData.popularity.toFixed(2);
        }

        // counting artists and constructing IDArray
        for (let artist of trackData.artists) {
          let artistName = artist.name;
          let foundEntry = artistArrayTemp.find(
            (entry) => entry.name === artistName
          );

          if (foundEntry) {
            foundEntry.count += 1;
          } else {
            artistArrayTemp.push({ name: artistName, count: 1 });

            if (IDArray.length < 50) {
              IDArray.push(artist.id);
            }
          }
        }
      }

      // convert shortest and longest times to m:s format
      longestSongTemp[1] = msToTime(longestSongTemp[1], {
        showHours: false,
      });

      shortestSongTemp[1] = msToTime(shortestSongTemp[1], {
        showHours: false,
      });

      // calculate average popularity
      let averagePopularityTemp = (popularityCounter / totalTracks).toFixed(2);

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
        playlistLength: msToTime(playlistLengthMillis, {
          showHours: true,
        }),
        longestSong: longestSongTemp,
        shortestSong: shortestSongTemp,
        popularityArray: popularityArrayTemp,
        averagePopularity: averagePopularityTemp,
        mostPopularSong: mostPopularSongTemp,
        leastPopularSong: leastPopularSongTemp,
        artistArray: artistArrayTemp.sort((a, b) => b.count - a.count),
        genreArray: [],
      });
    }
  }, [status, data]);

  // ===== EXTRACTING GENRES FROM ARTISTS =====

  // requesting artist data
  const artistQuery = useQuery({
    queryKey: ["artistDataQueryKey", artistEndpoint],
    queryFn: () => getArtist(artistEndpoint),
    enabled: !!artistEndpoint,
    retry: false,
  });

  // error message handling
  useEffect(() => {
    let errorMessage = errorMessageHandler(
      artistQuery.isError,
      artistQuery.error
    );
    setPlaylistData((prev) => ({
      ...prev,
      status,
      errorMessage,
    }));
  }, [artistQuery.isError, artistQuery.status, artistQuery.error]);

  // extracting data
  useEffect(() => {
    let genreArrayTemp: { genre: string; count: number; fill: string }[] = [];

    if (!artistQuery.isError && artistQuery.data) {
      // counting genres
      for (let artist of artistQuery.data?.data.artists) {
        for (let genre of artist.genres) {
          let foundEntry = genreArrayTemp.find(
            (entry) => entry.genre === genre
          );

          if (foundEntry) {
            foundEntry.count += 1;
          } else {
            genreArrayTemp.push({
              genre: genre,
              count: 1,
              fill: "",
            });
          }
        }
      }

      genreArrayTemp = genreArrayTemp.sort((a, b) => b.count - a.count);

      let i = 0;
      genreArrayTemp.forEach((array) => {
        (array.fill = "var(--color-" + i.toString() + ")"), (i = (i + 1) % 5);
      });

      setPlaylistData((prev) => ({
        ...prev,
        genreArray: genreArrayTemp.sort((a, b) => b.count - a.count),
      }));
    }
  }, [status, data, artistQuery.status, artistQuery.data]);

  return <Result playlistData={playlistData} />;
}

export default Playlist;
