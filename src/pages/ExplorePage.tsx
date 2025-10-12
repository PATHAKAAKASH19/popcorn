import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import createSlug from "../utils/createSlug"


export type MovieProps = {
  id: number;
  title: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  media_type: string;
};

const fetchMoviesData = () => {
  return axios.get(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDE0ZmYxZjE2MjEwZjUzZGJjNTRjYTJhZTViMmFiOCIsIm5iZiI6MTc2MDAyOTA4OC4yMTIsInN1YiI6IjY4ZTdlOWEwNTRkOGVlMDI4YmQ4NGY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TG-aba2c1wkopB5OrNcxxz8qt7GaZ7pdCqMYoj7imPc",
      },
    }
  );
};



export default function ExplorePage() {
  const { data } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: fetchMoviesData,
   
  });


  console.log(data)

  return (
    <div className="flex  flex-col border-2 border-amber-200 pt-20 px-80 ">
      <h1 className="pt-8 pb-5 text-2xl font-open-sans font-medium">
        Trending
      </h1>
      <div className="grid grid-cols-5 w-4xl gap-6 auto-cols-fr">
        {data?.data.results.map((movie: MovieProps) => (
          <Link
            to={`/content/${createSlug(movie?.title)}`}
            className="rounded-xl w-42 flex flex-col gap-2"
            key={movie.title ? movie.title : movie.name}
          >
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                alt="movie-poster"
                className="rounded-xl"
              />
            </div>

            <h1 className="line-clamp-1 pl-2">
              {movie.title ? movie.title : movie.name}
            </h1>
            <h1>{movie.media_type}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
