import { useState, type ChangeEventHandler } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import type { MovieProps } from "@/types/movies";
import { useNavigate } from "react-router-dom";

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
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const navigate = useNavigate()



  const { data, isLoading } = useQuery({
    queryKey: ["content", debounceQuery],
    queryFn: () => searchAll(debounceQuery),
    enabled: !!debounceQuery,
    select: (data) => data?.data.results.filter((m:MovieProps) => m.media_type === "tv" || m.media_type === "movie")
    
  });

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const navigateToContent = (route:string) => {
    navigate(route)
    
  }

  console.log(data);
  return (
    <div className="w-screen h-screen bg-black p-20  flex  items-center flex-col ">
      <div className="w-6xl flex flex-col  items-center  ">
        <div className=" flex flex-col w-full px-4 py-6">
          <input
            id="search-box"
            type="text"
            value={query}
            onChange={handleQuery}
            placeholder="Search for Movies, Shows, Anime, Cast & Crew"
            className="px-5 py-2 bg-[#171717] h-18 rounded-2xl text-gray-400 border-none w-full shadow-blue-400 shadow-xs outline-none"
          />
        </div>

        <div className=" w-full flex justify-center ">
          <div className="w-full  border mx-10 border-gray-500 shadow-blue-400 "></div>
        </div>
        <div className="  flex justify-center h-155 overflow-auto scrollbar-hide flex-col">
          {isLoading ? (
            <div>loading...</div>
          ) : (
            <div className="grid grid-cols-4 gap-4 p-5  h-fit">
              {data?.map((movie: MovieProps) => {
                return (
                  <div
                    key={movie.id}
                    className="flex  items-center px-3 py-3 rounded-[1em] gap-4 bg-[#1F1F1F]/70 
                    hover:bg-[#1F1F1F] cursor-pointer transition-colors duration-500 ease-in-out"
                    onClick={() =>
                      navigateToContent(`/${movie.media_type}/${movie.id}`)
                    }
                  >
                    {movie.poster_path ? (
                      <div className=" w-20 rounded-[0.5em]  shrink-0 h-28">
                        <img
                          src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`}
                          alt={`${movie.title ? movie.title : movie.name}`}
                          className="w-full h-full object-cover rounded-[0.5em]"
                        />
                      </div>
                    ) : (
                      <div className=" w-20 rounded-[0.5em]  shrink-0 h-28 bg-gradient-to-b from-gray-400/30 to-gray-400/10"></div>
                    )}
                    <div className="">
                      <h1 className="text-white text-[14px]">
                        {movie.title ? movie.title : movie.name}
                      </h1>
                      <h2 className="text-white/50">{movie.genre}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
