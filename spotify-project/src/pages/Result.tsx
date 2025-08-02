import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../api/getPlaylist";
import { useEffect, useState } from "react";
import axios from "axios";

import Title from "../components/Title";
import Error from "../components/Error";
import Return from "../components/Return";

function Result() {
  const [errorMessage, setErrorMessage] = useState("");

  // playlist query and error handling
  const { status, data, error, isError } = useQuery({
    queryKey: ["playlistData"],
    queryFn: getPlaylist,
    retry: false,
  });

  useEffect(() => {
    if (isError && axios.isAxiosError(error)) {
      const statusNumber = error.response?.status;

      if (statusNumber === 400) {
        setErrorMessage("Playlist not found");
      } else if (statusNumber === 401) {
        setErrorMessage("Bad token");
      } else if (statusNumber === 429) {
        setErrorMessage("Exceeded rate limit");
      }
    }
  }, [isError]);

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
              {/* <Title>data.name</Title> */}

              <div className="bg-amber-300 w-9/10 h-8/10 m-auto p-8 flex">
                <div className="bg-blue-300 w-1/2 h-full flex flex-col justify-center">
                  <Title>{data.data.name}</Title>
                  <p>{data.data.owner.display_name}</p>
                  <p>{data.data.description}</p>
                  <Return />
                </div>
                <div className="bg-lime-300 w-1/2 h-full flex items-center justify-center p-50">
                  <img
                    src={data.data.images[0].url}
                    alt="#"
                    className="w-8/10 h-9/10"
                  ></img>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export default Result;
