import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import type { MovieProps } from "@/types/movies";
import { useNavigate } from "react-router-dom";
import useHistory from "@/stores/historyStore";
import { IconX , IconSearch} from "@tabler/icons-react";

const searchAll = (query: string) => {
  return axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/search/multi?api_key=3d14ff1f16210f53dbc54ca2ae5b2ab8&query=${encodeURIComponent(
      query
    )}&language=en-US&page=1&include_adult=false`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
      },
    }
  );
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 500);
  const { searchHistory, addHistory, deleteHistory, clearHistory } = useHistory(
    (state) => state
  );
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["content", debounceQuery],
    queryFn: () => searchAll(debounceQuery),
    enabled: !!debounceQuery,
    select: (data) =>
      data?.data.results.filter(
        (m: MovieProps) => m.media_type === "tv" || m.media_type === "movie"
      ),
  });

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const navigateToContent = (route: string, movieName: string) => {
    navigate(route);
    addHistory(movieName);
  };

  console.log(data);
  return (
    <div className="w-screen h-screen bg-black p-20  flex  items-center flex-col ">
      <div className="w-6xl flex flex-col ">
        <div className=" flex  w-full   justify-center items-center  mt-8 mb-3 border  border-gray-500/40 h-fit bg-[#171717]  rounded-2xl">
          <div className="w-11 h-full flex  justify-center items-center">
            <IconSearch className="text-white size-4"></IconSearch>
          </div>
          <input
            id="search-box"
            type="text"
            value={query}
            onChange={handleQuery}
            autoComplete="off"
            placeholder="Search for Movies, Shows, Anime, Cast & Crew..."
            className=" py-2 bg-[#171717] h-16 rounded-2xl placeholder:text-gray-400 w-full border-none outline-none text-white"
          />
        </div>

        {!query && (
          <div className="w-full px-2 pb-7">
            <div className="flex  flex-col w-full gap-3">
              <div className="flex justify-between items-center">
                <h1 className="text-white">RECENT SEARCHES</h1>
                <h2
                  className="text-[13px] text-gray-400 cursor-pointer hover:text-white duration-300 transition-colors ease-in-out"
                  onClick={clearHistory}
                >
                  Clear history
                </h2>
              </div>
              <div className="flex gap-5 flex-wrap ">
                {searchHistory.length &&
                  searchHistory.map((history: string) => {
                    return (
                      <div
                        key={history}
                        className="text-white flex justify-center items-center  rounded-full w-fit px-5 py-2 gap-2 bg-[#171717]/90"
                        onClick={() => setQuery(history)}
                      >
                        <h1 className="text-white/50 text-[14px] font-medium cursor-pointer hover:text-white/70">
                          {history}
                        </h1>
                        <div
                          className="h-full flex justify-center items-center cursor-pointer "
                          onClick={() => deleteHistory(history)}
                        >
                          <IconX className="size-4 text-white/50 hover:text-white"></IconX>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
        <div className=" w-full flex justify-center  pb-5">
          <div className="w-full  border-t  border-gray-500/40 shadow-blue-400 "></div>
        </div>
        {query && (
          <div className="  flex justify-center  flex-col ">
            <div className="flex flex-col justify-start h-155 ">
              <h1 className="text-white font-bold  pb-4">SEARCH RESULTS</h1>
              {isLoading ? (
                <div>loading...</div>
              ) : (
                <div className="grid grid-cols-4 gap-4 h-   overflow-auto scrollbar-hide  border-amber-400 ">
                  {data?.map((movie: MovieProps) => {
                    return (
                      <div
                        key={movie.id}
                        className="flex  items-center px-3 py-3 rounded-[1em] gap-4 bg-[#1F1F1F]/70 
                    hover:bg-[#1F1F1F] cursor-pointer transition-colors duration-500 ease-in-out"
                        onClick={() =>
                          navigateToContent(
                            `/${movie.media_type}/${movie.id}`,
                            `${movie.title ? movie.title : movie.name}`
                          )
                        }
                      >
                        {movie.poster_path ? (
                          <div className=" w-20 rounded-[0.5em]  shrink-0 h-28">
                            <img
                              src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`}
                              alt={`${movie.title ? movie.title : movie.name}`}
                              className="w-full h-full object-cover rounded-[0.5em]"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className=" w-20 rounded-[0.5em]  shrink-0 h-28 bg-gradient-to-b from-gray-400/30 to-gray-400/10"></div>
                        )}
                        <div className="">
                          <h1 className="text-white text-[14px]">
                            {movie.title ? movie.title : movie.name}
                          </h1>
                          {/* <h2 className="text-white/50">{movie.release_date}</h2> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
