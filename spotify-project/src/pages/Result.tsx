import Error from "../components/Error";
import Return from "../components/Return";
import PlaylistTitle from "../components/PlaylistTitle";
import BodyText from "../components/BodyText";
import EmphasisSubText from "../components/EmphasisSubText";
import { SlArrowDownCircle } from "react-icons/sl";
import placeholder from "../imgs/placeholder2.jpg";
import Refresh from "../components/Refresh";
import SubTitle from "../components/SubTitle";

type Props = {
  playlistData: {
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
    playlistLengthMillis,
    longestSong,
    shortestSong,
    popularityArray,
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

                  <hr className="my-15 rounded-lg h-0.5 border-1 border-gray-500"></hr>

                  <BodyText>{"Made by " + creator}</BodyText>
                  <BodyText>{desc}</BodyText>

                  <div className="my-1"></div>

                  <div className="flex">
                    <SlArrowDownCircle className="relative top-1.5 pr-2.5 h-7 w-7" />

                    <EmphasisSubText>
                      Scroll for more information
                    </EmphasisSubText>

                    <SlArrowDownCircle className="relative top-1.5 pl-2.5 h-7 w-7" />
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>

      {status === "success" && (
        <div className="w-full h-screen flex flex-col items-center justify-center space-y-5 bg-gray-300">
          <div className="w-9/10 h-9/10 py-5 flex">
            <div className="w-1/2 h-full mx-10 flex flex-col p-10">
              <div className="w-full h-min">
                <SubTitle>Basic Info</SubTitle>
              </div>
              <div className="bg-gray-400/10 w-full h-full rounded-2xl p-5">
                <p>{totalSongs}</p>
                <p>{playlistLengthMillis}</p>
                <p>{longestSong}</p>
                <p>{shortestSong}</p>
                <p>{popularityArray}</p>
                <p>{mostPopularSong}</p>
                <p>{leastPopularSong}</p>
                <p>{artistCounter}</p>
                <p>{genreCounter}</p>
              </div>
            </div>

            <div className="w-1/2 h-9/10 mx-10 my-auto flex flex-wrap content-start">
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
      )}
    </>
  );
}

export default Result;
