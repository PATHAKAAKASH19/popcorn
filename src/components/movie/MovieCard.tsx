import { Link } from "react-router-dom";
import createSlug from "@/utils/createSlug";
import type { MovieProps } from "@/types/movies";



type MovieCardProp = {
  movie:MovieProps
}


export default function MovieCard({movie} : MovieCardProp) {
  return (
    <Link
      to={`/content/${movie.id}`}
      className="rounded-xl w-42 flex flex-col gap-3   pb-4 backdrop-blur "
      key={movie.title ? movie.title : movie?.name}
    >
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
            alt="movie-poster"
            className="rounded-xl"
          />
        </div>

        <div>
          <h1 className="line-clamp-1 pl-2  pb-1 text-gray-300">
            {movie.title ? movie.title : movie.name}
          </h1>
          <h1 className="pl-2 text-[12px] tracking-wider text-gray-300 ">{movie.media_type}</h1>
        </div>
     
    </Link>
  );
}
