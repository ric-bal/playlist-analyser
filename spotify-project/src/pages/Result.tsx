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
import BarChartTest from "../components/BarChartTest";

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
    artistCounter: [string, number][];
    genreCounter: [string, number][];
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
    artistCounter,
    genreCounter,
  } = playlistData;

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center space-y-5 bg-gradient-to-b from-gray-100 to-gray-300">
        {(status === "error" && (
          <>
            <Error>{errorMessage}</Error>
            <div className="flex w-100">
              <div className="flex w-50 justify-center">
                <Return />
              </div>
              <div className="flex w-50 justify-center">
                <Refresh />
              </div>
            </div>
          </>
        )) ||
          (status === "success" && (
            <>
              <div className="w-9/10 h-8/10 m-auto items-center py-10 pl-30 flex">
                {/* image */}
                <div className="w-2/5 h-full flex items-center justify-center pr-20">
                  <img
                    src={coverURL}
                    alt="Playlist cover"
                    className="h-66/100 w-85/100 drop-shadow-lg/25"
                  ></img>
                </div>

                {/* text */}
                <div className="w-1/2 h-min flex flex-col justify-center p-20 bg-gray-300/30 rounded-2xl">
                  <PlaylistTitle>{title}</PlaylistTitle>
                  <Return />

                  <hr className="my-12 rounded-lg h-0.5 border-1 border-gray-500"></hr>

                  <BodyText>
                    Made by <span className="italic">{creator}</span>
                  </BodyText>
                  <BodyText>
                    {desc === "" && "This playlist has no description"}
                  </BodyText>

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
            </>
          ))}
      </div>

      {status === "success" && (
        <>
          {/* BASIC INFO */}

          <div className="w-full h-screen flex flex-col items-center justify-center space-y-5 bg-gray-300">
            <div className="w-9/10 h-9/10 py-5 flex">
              <div className="w-1/2 h-full mx-10 flex flex-col p-10">
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

                  {artistCounter[0] && (
                    <div className="border-l-2 border-gray-500 ml-8 pl-5">
                      <BodyText>
                        The artist that features the most is{" "}
                        <span className="font-bold">{artistCounter[0][0]}</span>
                        , appearing on{" "}
                        <span className="font-bold">{artistCounter[0][1]}</span>{" "}
                        songs
                      </BodyText>

                      <BodyText>
                        The artist that features the least is{" "}
                        <span className="font-bold">
                          {artistCounter[artistCounter.length - 1][0]}
                        </span>
                        , appearing on{" "}
                        <span className="font-bold">
                          {artistCounter[artistCounter.length - 1][1]}
                        </span>{" "}
                        songs
                      </BodyText>
                    </div>
                  )}

                  <Break />

                  <BodyText>
                    This playlist contains{" "}
                    <span className="font-bold">{genreCounter.length}</span>{" "}
                    unique genres
                  </BodyText>

                  <Break />

                  {genreCounter[0] && (
                    <div className="border-l-2 border-gray-500 ml-8 pl-5">
                      <BodyText>
                        The most prominent genre is{" "}
                        <span className="font-bold">{genreCounter[0][0]}</span>,
                        listed on{" "}
                        <span className="font-bold">{genreCounter[0][1]}</span>{" "}
                        songs
                      </BodyText>

                      <BodyText>
                        The least prominent genre is{" "}
                        <span className="font-bold">
                          {genreCounter[genreCounter.length - 1][0]}
                        </span>
                        , listed on{" "}
                        <span className="font-bold">
                          {genreCounter[genreCounter.length - 1][1]}
                        </span>{" "}
                        songs
                      </BodyText>
                    </div>
                  )}

                  <div className="flex justify-center pt-10">
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

          <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b from-gray-300 to-gray-100">
            <div className="h-min w-min mt-10 px-12  whitespace-nowrap border-b-2 border-gray-400">
              <SubTitle>Charts</SubTitle>
            </div>
            <div className="bg-gray-400/10 rounded-2xl h-full w-9/10 m-10 p-2">
              <Carousel>
                <div className="min-w-full flex justify-center items-center">
                  <div className="size-9/10 bg-pink-300/10 flex justify-center items-center">
                    <BarChartTest chartData={popularityArray}></BarChartTest>
                  </div>
                </div>
                <div className="min-w-full">
                  <p>hello 2</p>
                </div>
                <div className="min-w-full">
                  <p>hello 3</p>
                </div>
              </Carousel>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Result;
