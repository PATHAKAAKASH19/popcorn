import { Link } from "react-router-dom";
import type { MovieProps } from "@/types/movies";



type MovieCardProp = {
  movie: MovieProps,
  mediaType?: string,
  cn?: string, 
  h?:string
}


export default function VerticalCard({ movie , mediaType, cn="w-55", h}: MovieCardProp) {
  
  console.log(movie)
  return (
    <Link
      to={`/${mediaType}/${movie.id}`}
      className={`rounded-xl  flex flex-col gap-3 pb-4 backdrop-blur hover:scale-110 transition-transform duration-300 ease-in-out 
      shrink-0 max-sm:w-33 ${cn} `}
      key={movie.title ? movie.title : movie?.name}
    >
      {movie.poster_path ? (
        <div className={`${h}`}>
          <img
            src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`}
            alt="movie-poster"
            className="rounded-xl h-full w-full"
            loading="lazy"
          />
        </div>
      ) : (
          <div className={`w-full h-50 bg-gray-800 rounded-[1em] flex justify-center items-center  text-gray-300 ${h}`}>
          <h1 className="p-2 text-center">{movie.title ? movie.title : movie.name}</h1>
        </div>
      )}

      <div>
        <h1 className="line-clamp-1 pl-2  pb-1 text-gray-300 max-sm:text-[13px]">
          {movie.title ? movie.title : movie.name}
        </h1>
        <h1 className="pl-2 text-[12px] tracking-wider text-gray-300 max-sm:text-[11px]">
          {mediaType}
        </h1>
      </div>
    </Link>
  );
}
