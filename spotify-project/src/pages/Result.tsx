import Error from "../components/Error";
import Return from "../components/Return";
import PlaylistTitle from "../components/PlaylistTitle";
import BodyText from "../components/BodyText";
import EmphasisSubText from "../components/EmphasisSubText";
import { SlArrowDownCircle } from "react-icons/sl";
import placeholder from "../imgs/placeholder2.jpg";

type Props = {
  playlistData: {
    status: string;
    errorMessage: string;
    title: string;
    creator: string;
    desc: string;
    coverURL: string;
    songCoverURLs: string[];
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
  } = playlistData;

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center space-y-5 bg-gradient-to-b from-gray-100 to-gray-300">
        {(status === "error" && (
          <>
            <Error>{errorMessage}</Error>
            <Return />
          </>
        )) ||
          (status === "success" && (
            <>
              <div className="w-9/10 h-8/10 m-auto py-10 pl-30 flex">
                {/* image */}
                <div className="w-2/5 h-full flex items-center justify-center pr-20">
                  <img
                    src={coverURL}
                    alt="Playlist cover"
                    className="h-66/100 w-85/100 drop-shadow-lg/25"
                  ></img>
                </div>

                {/* text */}
                <div className="w-1/2 h-full flex flex-col justify-center">
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
            <div className="bg-gray-400 w-1/2 h-full mx-10 flex flex-col justify-center"></div>
            <div className="w-250 h-250 mx-10 my-auto flex flex-wrap content-start">
              {songCoverURLs.map((url, i) => (
                <img
                  src={url === "placeholder" ? placeholder : url}
                  alt="Playlist cover"
                  key={i}
                  className={
                    url === "placeholder"
                      ? "h-15/100 w-15/100 m-2 drop-shadow-lg/25 hover:border-2 border-transparent opacity-7"
                      : "h-15/100 w-15/100 m-2 drop-shadow-lg/25 hover:border-2 border-transparent"
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
