import Title from "../components/Title";
import BodyText from "../components/SubText";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [fadeout, setFadeout] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-b from-gray-100 to-gray-300">
        {/* bg-gradient-to-tl from-lime-200 via-sky-500 to-violet-500 */}
        <div
          className={`${
            !fadeout ? "animate-appear" : "animate-disappear"
          } w-full h-screen flex flex-col items-center justify-center space-y-5 overflow-hidden`}
        >
          <Title>Playlist Analyser</Title>
          <BodyText>Enter a Spotify public playlist URL </BodyText>
          <SearchBar setFadeout={setFadeout} />

          <div className="flex flex-col items-center justify-center absolute bottom-0">
            <div className="lg:pb-1 pb-2 sm:w-85 sm:text-center">
              Made with the Spotify Web API / React + Tailwind / Node.js +
              Express
            </div>
            <div className="lg:pb-1 pb-12 underline text-gray-600">
              <Link to="https://github.com/ric-bal/playlist-analyser">
                Github
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
