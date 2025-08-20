import Error from "../components/Error";
import Return from "../components/Return";
import PlaylistTitle from "../components/PlaylistTitle";
import BodyText from "../components/BodyText";
import EmphasisSubText from "../components/EmphasisSubText";
import placeholder from "../imgs/placeholder2.jpg";
import Refresh from "../components/Refresh";
import SubTitle from "../components/SubTitle";
import { Link } from "react-router-dom";
import Break from "../components/Break";
import { FaAngleDown } from "react-icons/fa";
import Carousel from "../components/Carousel";
import PopularityChart from "../components/PopularityChart";
import ChartTitle from "@/components/ChartTitle";
import ArtistChart from "@/components/ArtistChart";
import GenreChart from "@/components/GenreChart";
import { useState } from "react";
import SubText from "@/components/SubText";

type Props = {
  playlistData: {
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
    genreArray: { genre: string; count: number }[];
  };
};

function Result({ playlistData }: Props) {
  const {
    status,
    errorMessage,
    title,
    creator,
    desc,
    coverURL,
    songCoverURLs,
    totalSongs,
    playlistLength,
    longestSong,
    shortestSong,
    popularityArray,
    averagePopularity,
    mostPopularSong,
    leastPopularSong,
    artistArray,
    genreArray,
  } = playlistData;

  const [fadeout, setFadeout] = useState(false);

  return (
    <div className="max-h-screen snap-y snap-mandatory overflow-y-scroll">
      <div className="w-full h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        {(status === "error" && (
          <div className="w-full h-screen flex flex-col items-center justify-center space-y-5 snap-center">
            <Error>{errorMessage}</Error>
            <div className="flex w-100">
              <div className="flex w-50 justify-center">
                <Return setFadeout={setFadeout} delay={false} />
              </div>
              <div className="flex w-50 justify-center">
                <Refresh />
              </div>
            </div>
          </div>
        )) ||
          (status === "success" && (
            <div
              className={`${
                !fadeout ? "animate-appear" : "animate-disappear"
              } w-full h-screen flex flex-col items-center justify-center space-y-5 snap-center`}
            >
              <div className="w-9/10 h-8/10 m-auto items-center py-10 pl-30 flex">
                {/* image */}
                <div className="w-2/5 h-full flex items-center justify-center pr-20">
                  <img
                    src={coverURL || undefined}
                    alt="Playlist cover"
                    className="h-66/100 w-85/100 drop-shadow-lg/25"
                  ></img>
                </div>

                {/* text */}
                <div className="w-1/2 h-min max-h-screen overflow-y-scroll flex flex-col justify-center p-20 bg-gray-300/30 rounded-2xl">
                  <PlaylistTitle>{title}</PlaylistTitle>
                  <Return setFadeout={setFadeout} delay={true} />

                  <hr className="my-12 rounded-lg h-0.5 border-1 border-gray-500"></hr>

                  <BodyText>
                    Made by <span className="italic">{creator}</span>
                  </BodyText>
                  <div className="pt-2">
                    <SubText>
                      {desc === "" ? "This playlist has no description" : desc}
                    </SubText>
                  </div>

                  <div className="flex pt-10">
                    {/* <SlArrowDownCircle className="relative top-1.5 pr-2.5 h-7 w-7" /> */}
                    <FaAngleDown className="relative top-2 pr-2.5 size-6 fill-gray-600" />

                    <EmphasisSubText>
                      Scroll for more information
                    </EmphasisSubText>

                    <FaAngleDown className="relative top-2 pl-2.5 size-6 fill-gray-600" />
                    {/* <SlArrowDownCircle className="relative top-1.5 pl-2.5 h-7 w-7" /> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {status === "success" && (
        <>
          {/* BASIC INFO */}

          <div className="w-full h-screen flex flex-col items-center justify-center space-y-5 bg-gray-300 snap-center">
            <div className="w-9/10 h-9/10 py-5 flex">
              <div
                className="w-1/2 h-full mx-10 flex flex-col p-10"
                data-aos="fade-in"
              >
                <div className="w-min h-min whitespace-nowrap">
                  <SubTitle>Basic Info</SubTitle>
                </div>
                <div className="bg-gray-400/10 w-full h-full rounded-2xl p-5 overflow-y-scroll">
                  <BodyText>
                    There are <span className="font-bold">{totalSongs}</span>{" "}
                    songs in this playlist, lasting{" "}
                    <span className="font-bold">{playlistLength}</span>
                  </BodyText>

                  <Break />

                  <div className="border-l-2 border-gray-500 ml-8 pl-5">
                    <BodyText>
                      The longest song is{" "}
                      <span className="font-bold">{longestSong[0]}</span>, at{" "}
                      <span className="font-bold">{longestSong[1]}</span>
                    </BodyText>

                    <BodyText>
                      The shortest song is{" "}
                      <span className="font-bold">{shortestSong[0]}</span>, at{" "}
                      <span className="font-bold">{shortestSong[1]}</span>
                    </BodyText>
                  </div>

                  <Break />

                  <BodyText>
                    The average popularity of all songs in the playlist is{" "}
                    <span className="font-bold">{averagePopularity}</span> out
                    of <span className="font-bold">100</span>
                    <br></br>
                    <span className="text-xl">
                      For more information on popularity, visit the{" "}
                      <span className="underline">
                        <Link to="https://developer.spotify.com/documentation/web-api/reference/get-track">
                          Spotify Web Api Reference
                        </Link>
                      </span>{" "}
                      page
                    </span>
                  </BodyText>

                  <Break />

                  <div className="border-l-2 border-gray-500 ml-8 pl-5">
                    <BodyText>
                      The most popular song is{" "}
                      <span className="font-bold">{mostPopularSong[0]}</span>,
                      at <span className="font-bold">{mostPopularSong[1]}</span>
                    </BodyText>

                    <BodyText>
                      The least popular song is{" "}
                      <span className="font-bold">{leastPopularSong[0]}</span>,
                      at{" "}
                      <span className="font-bold">{leastPopularSong[1]}</span>
                    </BodyText>
                  </div>

                  <Break />

                  {artistArray[0] && (
                    <div className="border-l-2 border-gray-500 ml-8 pl-5">
                      <BodyText>
                        The artist that features the most is{" "}
                        <span className="font-bold">{artistArray[0].name}</span>
                        , appearing on{" "}
                        <span className="font-bold">
                          {artistArray[0].count}
                        </span>{" "}
                        songs
                      </BodyText>

                      <BodyText>
                        The artist that features the least is{" "}
                        <span className="font-bold">
                          {artistArray[artistArray.length - 1].name}
                        </span>
                        , appearing on{" "}
                        <span className="font-bold">
                          {artistArray[artistArray.length - 1].count}
                        </span>{" "}
                        songs
                      </BodyText>
                    </div>
                  )}

                  <Break />

                  <BodyText>
                    This playlist contains{" "}
                    <span className="font-bold">{genreArray.length}</span>{" "}
                    unique genres
                  </BodyText>

                  <Break />

                  {genreArray[0] && (
                    <div className="border-l-2 border-gray-500 ml-8 pl-5">
                      <BodyText>
                        The most prominent genre is{" "}
                        <span className="font-bold">{genreArray[0].genre}</span>
                        , listed on{" "}
                        <span className="font-bold">{genreArray[0].count}</span>{" "}
                        songs
                      </BodyText>

                      <BodyText>
                        The least prominent genre is{" "}
                        <span className="font-bold">
                          {genreArray[genreArray.length - 1].genre}
                        </span>
                        , listed on{" "}
                        <span className="font-bold">
                          {genreArray[genreArray.length - 1].count}
                        </span>{" "}
                        songs
                      </BodyText>
                    </div>
                  )}

                  <div className="flex justify-center pt-3">
                    <FaAngleDown className="size-7 fill-gray-600" />
                  </div>
                </div>
              </div>

              <div className="w-1/2 h-9/10 mx-10 my-auto flex flex-wrap content-start overflow-hidden">
                {songCoverURLs.map((url, i) => (
                  <img
                    src={url === "placeholder" ? placeholder : url}
                    alt="Playlist cover"
                    key={i}
                    className={
                      url === "placeholder"
                        ? "h-15/100 w-15/100 m-2 drop-shadow-lg/25 opacity-7"
                        : "h-15/100 w-15/100 m-2 drop-shadow-lg/25 relative hover:border-2 border-transparent"
                    }
                  ></img>
                ))}
              </div>
            </div>
          </div>

          {/* CHARTS */}

          <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-300 to-gray-100 snap-center">
            <div className="h-min w-min pb-0 whitespace-nowrap">
              <SubTitle>Charts</SubTitle>
            </div>
            <div className="bg-gray-400/20 rounded-2xl h-8/10 w-8/10 mt-5">
              <Carousel>
                <div className="min-w-full flex justify-center items-center">
                  <div className="size-full flex flex-col justify-center items-center">
                    <ChartTitle>Top Artists</ChartTitle>

                    {artistArray[0] && (
                      <ArtistChart chartData={artistArray}></ArtistChart>
                    )}
                  </div>
                </div>

                <div className="min-w-full flex justify-center items-center">
                  <div className="size-full flex flex-col justify-center items-center">
                    <ChartTitle>Top Genres</ChartTitle>

                    {genreArray[0] && (
                      <GenreChart chartData={genreArray}></GenreChart>
                    )}
                  </div>
                </div>

                <div className="min-w-full flex justify-center items-center">
                  <div className="size-full flex flex-col justify-center items-center">
                    <ChartTitle>Song Popularity Count</ChartTitle>

                    {popularityArray[0] && (
                      <PopularityChart
                        chartData={popularityArray}
                      ></PopularityChart>
                    )}
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Result;
