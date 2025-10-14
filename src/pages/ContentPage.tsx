import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import {IconBookmark} from "@tabler/icons-react"
import { AspectRatio } from "@radix-ui/react-aspect-ratio";


const fetchMovieDatails = (movieId: string) => {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDE0ZmYxZjE2MjEwZjUzZGJjNTRjYTJhZTViMmFiOCIsIm5iZiI6MTc2MDAyOTA4OC4yMTIsInN1YiI6IjY4ZTdlOWEwNTRkOGVlMDI4YmQ4NGY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TG-aba2c1wkopB5OrNcxxz8qt7GaZ7pdCqMYoj7imPc",
      },
    })
  ;
};

const fetchMovieTrailer = (movieId:string) => {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=3d14ff1f16210f53dbc54ca2ae5b2ab8`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDE0ZmYxZjE2MjEwZjUzZGJjNTRjYTJhZTViMmFiOCIsIm5iZiI6MTc2MDAyOTA4OC4yMTIsInN1YiI6IjY4ZTdlOWEwNTRkOGVlMDI4YmQ4NGY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TG-aba2c1wkopB5OrNcxxz8qt7GaZ7pdCqMYoj7imPc",
        },
      }
    );
}

export default function ContentPage() {
  const { movieId } = useParams();

  const { data: movieDetails } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => fetchMovieDatails(movieId!),
    enabled: !!movieId,
  });

  const { data: movieTrailer } = useQuery({
    queryKey: ["movie-trailer", movieId],
    queryFn: () => fetchMovieTrailer(movieId!),
    enabled: !!movieId,
  });

  console.log("trailer", movieTrailer);
  console.log("details", movieDetails);
  return (
    <div className="w-full bg-black h-screen flex flex-col relative">
      <div className="pt-20 h-11/12 w-full">
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetails?.data.backdrop_path}`}
          className="w-full h-11/12"
        ></img>
        <div className="absolute bottom-40 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/75 to-transparent" />
      </div>

      <div className="absolute w-full  px-80 bottom-30 z-50 flex justify-between items-end">
        <div className="w-55 h-full rounded-2xl">
          <img
            src={`https://image.tmdb.org/t/p/w780/${movieDetails?.data.poster_path}`}
            alt=""
            title=""
            className="rounded-2xl"
          ></img>
        </div>

        <div>
          <div className="">{ }</div>
        </div>

        <div className="flex flex-col gap-4 w-xs ml-auto">
          <button className="w-full px-5 py-[10px] bg-purple-800 text-white rounded-[2em] cursor-pointer">
            Mark as Watched
          </button>
          <button className="w-full px-5 py-[10px] bg-gray-900 text-white rounded-[2em] cursor-pointer">
            <h1> BookMark</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /* <iframe
        src={`https://www.youtube.com/embed/${movieTrailer?.data.results[0].key}`}
        title={movieTrailer?.data.results[0].name}
        className="w-full aspect-video rounded-2xl shadow-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture controls-0"
        allowFullScreen
      ></iframe> */
}