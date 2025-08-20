import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Props {
  setFadeout: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBar({ setFadeout }: Props) {
  const [playlistURL, setPlaylistURL] = useState("");
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let id = "";
    try {
      id = new URL(playlistURL).pathname.split("/").pop()!;
    } catch (_) {
      setFailed(true);
      return;
    }

    if (playlistURL.trim()) {
      // id is not empty
      setFadeout(true);

      setTimeout(() => {
        navigate("/result", { state: id });
      }, 1200);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-[440px] relative">
        <div className="relative">
          <input
            type="search"
            name="playlistID"
            placeholder="enter url"
            className="w-full p-4 rounded-full bg-gray-300 text-xl focus:ring-2 focus:ring-gray-400 focus:outline-none"
            value={playlistURL}
            onChange={(e) => setPlaylistURL(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-4 rounded-full"
          >
            <AiOutlineSearch />
          </button>
        </div>
      </form>

      <p className="text-xl h-5">{failed && "Invalid URL"}</p>
    </>
  );
}

export default SearchBar;
