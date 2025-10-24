import { Link } from "react-router-dom";
import type { MovieProps } from "@/types/movies";



type MovieCardProp = {
  movie:MovieProps
}


export default function MovieCard({ movie }: MovieCardProp) {
  
  return (
    <Link
      to={`/${movie.media_type}/${movie.id}`}
      className="rounded-xl w-45 flex flex-col gap-3 pb-4 backdrop-blur hover:scale-110 transition-transform duration-300 max-lg:w-45  
      shrink-0 max-sm:w-33 "
      key={movie.title ? movie.title : movie?.name}
    >
      {movie.poster_path ? (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`}
            alt="movie-poster"
            className="rounded-xl"
          />
        </div>
      ) : (
        <div className="w-full bg-gray-800 h-full rounded-[1em] flex justify-center items-center  text-gray-300">
          <h1 className="p-2 text-center">{movie.title ? movie.title : movie.name}</h1>
        </div>
      )}

      <div>
        <h1 className="line-clamp-1 pl-2  pb-1 text-gray-300 max-sm:text-[13px]">
          {movie.title ? movie.title : movie.name}
        </h1>
        <h1 className="pl-2 text-[12px] tracking-wider text-gray-300 max-sm:text-[11px]">
          {movie?.media_type}
        </h1>
      </div>
    </Link>
  );
}
