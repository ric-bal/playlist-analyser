import Title from "../components/Title";
import BodyText from "../components/SubText";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

function Home() {
  const [fadeout, setFadeout] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-b from-gray-100 to-gray-300">
        {/* bg-gradient-to-tl from-lime-200 via-sky-500 to-violet-500 */}
        <div
          className={`${
            !fadeout ? "animate-appear" : "animate-disappear"
          } w-full h-screen flex flex-col items-center justify-center space-y-5`}
        >
          <Title>Test Text</Title>
          <BodyText>Flavor text below header</BodyText>
          <SearchBar setFadeout={setFadeout}></SearchBar>
        </div>
      </div>
    </>
  );
}

export default Home;
