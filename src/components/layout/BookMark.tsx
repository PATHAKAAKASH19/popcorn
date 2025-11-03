import useUser from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

export default function BookMark() {
  const { watched} = useUser((state) => state.userMovieList);
  const { deleteAll, deleteMovie } = useUser((state) => state);

  const navigate = useNavigate();

  const navigateToContent = (route: string) => {
    navigate(route);
  };

    return (
      <div className="flex flex-col ">
        <div className="flex justify-end pb-3">
          <h1
            className=" text-gray-300/70 text-[15px] cursor-pointer hover:text-gray-300 
              transition-colors duration-300 ease-in-out max-sm:text-[13px]"
            onClick={() => deleteAll("bookmark")}
          >
            Clear All
          </h1>
        </div>
        <div className="grid  grid-cols-4 gap-x-4 gap-y-4 max-xl:grid-cols-2 max-md:grid-cols-1 ">
          {watched.map((movie) => (
            <div
              key={movie.id}
              className="flex  items-center px-3 py-3 rounded-[1em] gap-4 bg-[#1F1F1F]/90 
                    cursor-pointer  "
            >
              {movie.poster_path ? (
                <div className=" w-20 rounded-[0.5em]  shrink-0 h-28">
                  <img
                    src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`}
                    alt={`${movie.name}`}
                    className="w-full h-full object-cover rounded-[0.5em]"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className=" w-20 rounded-[0.5em]  shrink-0 h-28 bg-gradient-to-b from-gray-400/30 to-gray-400/10"></div>
              )}
              <div className="flex flex-col gap-5">
                <div className=" flex flex-col gap-1">
                  <h1 className="text-white text-[15px] line-clamp-1">
                    {movie.name}
                  </h1>

                  <h2 className="text-white/50 text-[13px]">
                    {movie.mediaType}
                  </h2>
                </div>
                <div className="flex gap-2 justify-start items-center">
                  <button
                    type="button"
                    className="bg-gray-500/50 text-[13px] rounded  py-1 w-15 text-white cursor-pointer hover:bg-gray-500/80 transition-colors duration-500 ease-in-out"
                    onClick={() =>
                      navigateToContent(`/${movie.mediaType}/${movie.id}`)
                    }
                  >
                    Info
                  </button>
                  <button
                    type="button"
                    className=" text-[13px] rounded  py-1 bg-blue-800/70 text-white w-15 cursor-pointer hover:bg-blue-800 transition-colors duration-500 ease-in-out"
                    onClick={() => deleteMovie(movie.id, "watched")}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
