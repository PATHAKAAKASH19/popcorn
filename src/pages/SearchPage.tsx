import { useCallback, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import type { MovieProps } from "@/types/movies";
import { useNavigate } from "react-router-dom";
import useHistory from "@/stores/historyStore";
import { IconX, IconSearch } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEO";
import { createContentSlug } from "@/utils/slugify";

const searchAll = (query: string) => {
  return axios.get(
    `${import.meta.env.VITE_BASE_URL
    }/search/multi?api_key=${import.meta.env.VITE_SECRET_KEY}&query=${encodeURIComponent(
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["content", debounceQuery],
    queryFn: () => searchAll(debounceQuery),
    enabled: !!debounceQuery,
    select: (data) =>
      data?.data.results.filter(
        (m: MovieProps) => m.media_type === "tv" || m.media_type === "movie"
      ),
  });

  const handleQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const navigateToContent = (mediaType: string, movieId: number, movieName: string) => {
    const slug = createContentSlug(movieName, movieId);
    navigate(`/${mediaType}/${slug}`);
    addHistory(movieName);
  };


  return (
    <div className="w-full h-screen bg-black p-20  flex  items-center flex-col max-sm:px-10 max-sm:py-17 ">
      <SEOHead
        title="Search Movies & TV Shows - MovieSite"
        description="Search for your favorite movies, TV shows, anime, cast and crew. Discover new content and add to your watchlist."
      />
      <div className="w-6xl flex flex-col max-xl:w-4xl max-lg:w-2xl  max-md:w-md max-sm:w-85 h-full transition-all duration-500 ease-in-out">
        <div className="pointer-events-auto flex  w-full justify-center items-center  mt-8 border  border-gray-500/30 h-fit bg-[#171717]  rounded-2xl max-md:mt-2  max-sm:rounded-[0.5em]">
          <div className="w-11 h-full flex  justify-center items-center">
            <IconSearch className="text-white size-4"></IconSearch>
          </div>
          <label htmlFor="search-box" className="sr-only">Search for movies and shows</label>
          <input
            id="search-box"
            type="text"
            value={query}
            onChange={handleQuery}
            autoComplete="off"
            placeholder="Search for Movies, Shows, Anime, Cast & Crew..."
            className=" py-2 bg-[#171717] h-16 rounded-2xl placeholder:text-gray-400 w-full border-none outline-none
             text-white max-md:h-13  max-sm:h-11 max-sm:rounded-[0.5em] max-md:text-[13px]"
            aria-label="Search for movies, shows, anime, cast and crew"
          />
        </div>

        {searchHistory.length && !query && (
          <div className="w-full px-2 pb-4 mt-3">
            <div className="flex  flex-col w-full gap-3">
              <div className="flex justify-between items-center">
                <h1 className="text-white text-[15px] max-sm:text-[12px]">
                  RECENT SEARCHES
                </h1>
                <h2
                  className="text-[13px] text-gray-400 cursor-pointer hover:text-white duration-300 transition-colors 
                  ease-in-out max-sm:text-[10px]"
                  onClick={clearHistory}
                >
                  Clear history
                </h2>
              </div>
              <div className="flex gap-5 flex-wrap ">
                {searchHistory.map((history: string) => {
                  return (
                    <div
                      key={history}
                      className="text-white flex justify-center items-center  rounded-full w-fit px-5 py-2 gap-2 bg-[#171717]/90
                      max-sm:px-3 "
                    >
                      <h1
                        className="text-white/50 text-[14px] font-medium cursor-pointer hover:text-white/70  
                        max-sm:text-[10px] "
                        onClick={() => setQuery(history)}
                      >
                        {history}
                      </h1>
                      <div
                        className="h-full flex justify-center items-center cursor-pointer "
                        onClick={() => deleteHistory(history)}
                      >
                        <IconX className="size-4 text-white/50 hover:text-white max-sm:size-3"></IconX>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex border-b border-gray-500/30 items-center mb-5 relative mt-3 max-sm:mt-2 max-sm:mb-4">
          <h1 className="text-white border-b-3 font-medium text-[14px] pb-1 max-sm:text-[12px] max-sm:border-b-2">
            Content
          </h1>
        </div>
        {query && (
          <div className="  flex   flex-col h-full overflow-auto scrollbar-hide">
            <div className="flex flex-col justify-start   ">
              <h1 className="text-gray-400 font-medium  pb-4 text-[15px] max-sm:text-[13px]">
                SEARCH RESULTS
              </h1>
              {isLoading ? (
                <div className="grid grid-cols-4 gap-4 overflow-auto scrollbar-hide max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                  {Array.from({ length: 12 }).map((_, i: number) => {
                    return (
                      <div
                        key={i}
                        className="flex  items-center px-3 py-3 rounded-[1em] gap-4 bg-[#1F1F1F]/70 
                    hover:bg-[#1F1F1F] cursor-pointer transition-colors duration-500 ease-in-out"
                      >
                        <div className=" w-20 rounded-[0.5em]  shrink-0 h-28">
                          <Skeleton className="h-28 w-20 rounded-[0.5em] bg-gray-500/50 " />
                        </div>

                        <div className="space-y-2">
                          <Skeleton className="h-4 w-35 bg-gray-500/50" />
                          <Skeleton className="h-4 w-25 bg-gray-500/50" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <h2 className="text-white text-xl mb-2">Search Error</h2>
                  <p className="text-gray-400 text-sm">Unable to search. Please try again.</p>
                </div>
              ) : data && data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <h2 className="text-white text-xl mb-2">No Results Found</h2>
                  <p className="text-gray-400 text-sm">Try searching with different keywords</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4 overflow-auto scrollbar-hide max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                  {data?.map((movie: MovieProps) => {
                    return (
                      <div
                        key={movie.id}
                        className="flex  items-center px-3 py-3 rounded-[1em] gap-4 bg-[#1F1F1F]/70 
                    hover:bg-[#1F1F1F] cursor-pointer transition-colors duration-500 ease-in-out"
                        onClick={() =>
                          navigateToContent(
                            movie.media_type,
                            movie.id,
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
                          <div className=" w-20 rounded-[0.5em]  shrink-0 h-28 bg-linear-to-b from-gray-400/30 to-gray-400/10"></div>
                        )}
                        <div className="flex flex-col gap-1">
                          <h1 className="text-white text-[15px]">
                            {movie.title ? movie.title : movie.name}
                          </h1>
                          <h2 className="text-white/50 text-[13px]">
                            {movie.media_type}
                          </h2>
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
