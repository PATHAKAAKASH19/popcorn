import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { IconBookmark, IconEye } from "@tabler/icons-react";
import { useState } from "react";
import type {
  MovieProps,
  CompanyProps,
  GenerProps,
  CrewProps,
  CastProps,
  AddMovieProps,
} from "@/types/movies";
import axios from "axios";
import VerticalCard from "@/components/movie/VerticalCard";
import Player from "@/components/movie/Player";
import Banner from "@/components/movie/Banner";
import useUser from "@/stores/userStore";
import { toast } from "sonner";
import Loading from "@/components/movie/Loading";
import { SEOHead } from "@/components/SEO";
import { extractIdFromSlug } from "@/utils/slugify";

const fetchMovieDetails = (mediaType: string, movieId: string) => {
  return axios.get(
    `${import.meta.env.VITE_BASE_URL
    }/${mediaType}/${movieId}?language=en-US&append_to_response=videos,credits,similar`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
      },
    }
  );
};

const fetchMovieTrailer = (mediaType: string, movieId: string) => {
  return axios.get(
    `${import.meta.env.VITE_BASE_URL}/${mediaType}/${movieId}/videos?api_key=${import.meta.env.VITE_API_KEY
    }`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
      },
    }
  );
};

export default function ContentPage() {
  const { mediaType, movieId: slugParam } = useParams();

  // Extract the actual ID from the slug
  const movieId = slugParam ? extractIdFromSlug(slugParam) : null;

  const { data: movieDetails, isLoading, error } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => fetchMovieDetails(mediaType!, movieId!),
    enabled: !!movieId,
    gcTime: 60 * 60 * 1000,
  });

  const { data: movieTrailer } = useQuery({
    queryKey: ["movie-trailer", movieId],
    queryFn: () => fetchMovieTrailer(mediaType!, movieId!),
    enabled: !!movieId,
  });

  const [playTrailer, setPlayTrailer] = useState(false);
  const { addMovie, userMovieList } = useUser((state) => state);

  const togglePlay = () => {
    setPlayTrailer((prev) => !prev);
  };


  const handleAddMovie = (type: "watched" | "bookmark", data: AddMovieProps) => {

    if (type === "bookmark" && userMovieList.bookmark.filter((obj) => obj.id === data.id).length) {
      toast.error("Alredy added to the bookmark list ")
      return
    } else if (type === "watched" && userMovieList.watched.filter((obj) => obj.id === data.id).length) {
      toast.error("Already added to the watched list")
      return
    }

    addMovie(data, type)
    toast.success(`Show Added to ${type} list`)
  }

  const movieTitle = movieDetails?.data.title || movieDetails?.data.name || "";
  const movieDescription = movieDetails?.data.overview || "Discover movies and TV shows";
  const posterImage = movieDetails?.data.poster_path
    ? `https://image.tmdb.org/t/p/w780/${movieDetails.data.poster_path}`
    : "";

  return (
    <>
      <SEOHead
        title={movieTitle ? `${movieTitle} - MovieSite` : "MovieSite"}
        description={movieDescription}
        image={posterImage}
        type="video.movie"
      />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="w-full h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-white text-2xl mb-4">Error loading content</h1>
            <p className="text-gray-400">Unable to load movie details. Please try again later.</p>
          </div>
        </div>
      ) : (
        <div
          className={`w-full  flex flex-col bg-black overflow-y-hidden transition-all duration-500 ease-in-out `}
        >
          <Banner
            backdrop_path={movieDetails?.data.backdrop_path}
            isTrailerArrayEmpty={!!movieTrailer?.data.results.length}
            togglePlay={togglePlay}
          />

          <div className=" w-full  relative bottom-65 px-80  flex flex-col justify-between items-center max-lg:bottom-45 max-sm:px-2 max-sm:bottom-16  max-md:px-10 max-sm:w-full  transition-all duration-500 ease-in-out">
            <div
              className="grid grid-cols-4 w-6xl mb-6 gap-10 max-xl:w-4xl max-lg:grid-cols-3  
        max-lg:w-2xl max-md:w-xl max-md:gap-x-30  max-sm:w-fit max-sm:gap-x-18 max-sm:gap-y-7 max-sm:mb-0
        
        "
            >
              <div className="w-50 h-full rounded-2xl justify-self-end max-xl:justify-self-start max-md:w-43 max-sm:w-30 ">
                {movieDetails?.data.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w780/${movieDetails?.data.poster_path}`}
                    alt={`${movieDetails?.data.original_title}`}
                    className="rounded-2xl "
                  ></img>
                ) : (
                  <div className="w-45 h-60 bg-gray-800 rounded-2xl"></div>
                )}
              </div>

              <div className="col-span-2 self-end ">
                <div>
                  <h3 className="text-gray-400 pb-1 max-md:text-[14px] max-sm:text-[12px]">
                    {movieDetails?.data.release_date
                      ? movieDetails?.data.release_date
                      : movieDetails?.data.first_air_date}
                  </h3>
                  <h1 className="text-white text-3xl line-clamp-1 font-medium max-sm:text-[18px]">
                    {movieDetails?.data.title
                      ? movieDetails?.data.title
                      : movieDetails?.data.name}
                  </h1>
                </div>
                <div className="grid-cols-5 grid  mt-10 gap-4  max-md:mt-8 max-sm:grid-cols-2 max-sm:gap-x-5 max-sm:gap-y-3 max-xl:gap-15 max-sm:mt-5  max-lg:grid-cols-4">
                  <div className="justify-self-start">
                    <h3 className="text-gray-400 text-[13px] pb-1 line-clamp-1 max-sm:text-[11px]">
                      Directed by
                    </h3>
                    <h3 className="text-white  whitespace-normal line-clamp-2 font-medium max-md:text-[14px] max-sm:text-[11px]">
                      {
                        movieDetails?.data.credits.crew.find(
                          (obj: CrewProps) =>
                            obj.job.toLowerCase() === "director"
                        )?.name
                      }
                    </h3>
                  </div>
                  <div className="justify-self-start">
                    <h3 className="text-gray-400 text-[13px] pb-1 line-clamp-1 max-sm:text-[11px]">
                      Country
                    </h3>
                    <h3 className="text-white whitespace-normal line-clamp-2 font-medium max-md:text-[14px] max-sm:text-[11px]">
                      {movieDetails?.data.origin_country[0] &&
                        new Intl.DisplayNames(["en"], { type: "region" }).of(
                          movieDetails?.data.origin_country[0]
                        )}
                    </h3>
                  </div>
                  <div className="justify-self-start">
                    <h3 className="text-gray-400 text-[13px] pb-1 line-clamp-1 max-sm:text-[11px]">
                      Language
                    </h3>
                    <h3 className="text-white whitespace-normal line-clamp-2 font-medium max-md:text-[14px] max-sm:text-[11px]">
                      {movieDetails?.data.original_language &&
                        new Intl.DisplayNames(["en"], { type: "language" }).of(
                          movieDetails?.data.original_language
                        )}
                    </h3>
                  </div>

                  {movieDetails?.data.adult !== undefined && (
                    <div className="justify-self-start">
                      <h3 className="text-gray-400 text-[13px] pb-1 line-clamp-1 max-sm:text-[11px] ">
                        Age Rating
                      </h3>
                      <h3 className="text-white whitespace-normal line-clamp-2 font-medium max-md:text-[14px] max-sm:text-[11px]">
                        {movieDetails?.data.adult ? "18+" : "PG"}
                      </h3>
                    </div>
                  )}
                </div>
              </div>

              <div className="self-end max-lg:col-span-3 ">
                <button
                  className={`w-full px-5 py-2.5 bg-purple-800 text-white rounded-[2em] cursor-pointer  mb-4 
                max-sm:py-3 max-sm:text-[12px]  relative z-100 hover:scale-110 transition-transform duration-300 
                ease-in-out`}
                  onClick={() => handleAddMovie("watched", {
                    id: movieId!,
                    poster_path: movieDetails?.data.poster_path,
                    mediaType: mediaType!,
                    name: movieDetails?.data.name
                      ? movieDetails?.data.name
                      : movieDetails?.data.title,
                  })}
                  aria-label="Mark this content as watched"
                >
                  <div
                    className="flex justify-center items-center gap-1"

                  >
                    <IconEye className="size-5  max-sm:size-4"></IconEye>
                    <h1> Mark as Watched</h1>
                  </div>
                </button>
                <button
                  className={`w-full px-5 py-2.5 bg-gray-900 text-white rounded-[2em] cursor-pointer mb-4
                   max-sm:py-3 max-sm:text-[12px] relative z-100  hover:scale-110 transition-transform duration-300 ease-in-out `}
                  onClick={() => handleAddMovie("bookmark", {
                    id: movieId!,
                    poster_path: movieDetails?.data.poster_path,
                    mediaType: mediaType!,
                    name: movieDetails?.data.name
                      ? movieDetails?.data.name
                      : movieDetails?.data.title,
                  })}
                  aria-label="Bookmark this content"
                >

                  <div
                    className="flex justify-center items-center gap-1"

                  >
                    <IconBookmark className={`size-5  max-sm:size-4 fill-blue-700 `}></IconBookmark>
                    <h1>BookMark</h1>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-10  w-5xl max-xl:w-4xl max-lg:w-2xl max-md:w-xl max-sm:w-full max-sm:gap-6 max-sm:px-2">
              {movieDetails?.data.overview && (
                <div>
                  <h1 className="text-white text-2xl font-medium pt-8 pb-4 max-sm:text-[17px] max-sm:py-3">
                    Overview
                  </h1>
                  <p className="text-gray-400 text-[16px] pb-5 max-sm:text-[13px]">
                    {movieDetails?.data.overview}
                  </p>

                  <div className="flex gap-4 max-sm:gap-2">
                    {movieDetails?.data.genres.map((gener: GenerProps) => {
                      return (
                        <h1
                          className="text-white text-center px-4 py-2 rounded-xl bg-gray-800 text-[14px] max-sm:text-[11px]"
                          key={`${gener.name}`}
                        >
                          {gener.name}
                        </h1>
                      );
                    })}
                  </div>
                  <div className="w-full border-b border-gray-800 pb-8"></div>
                </div>
              )}
              {movieDetails?.data.credits.cast.length && (
                <>
                  <div>
                    <h1 className="text-white text-2xl pb-5 font-medium  max-sm:text-[18px]">
                      Cast
                    </h1>
                    <div className="flex gap-7 max-lg:overflow-x-auto  scrollbar-hide scroll-smooth max-sm:gap-0">
                      {movieDetails?.data.credits.cast
                        .slice(0, 5)
                        .map((c: CastProps) => {
                          return (
                            <div
                              className="flex flex-col items-center gap-3 "
                              key={`${c.name}`}
                            >
                              <div className="w-30 h-30 rounded-[50%] max-sm:size-22">
                                {c.profile_path ? (
                                  <img
                                    src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
                                    alt={`${c.name}`}
                                    className="h-full w-full rounded-[50%] object-cover object-top"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="h-full w-full rounded-[50%] object-cover border-gray-800 bg-gray-900 flex justify-center items-center">
                                    <h1 className="text-white text-[11px] line-clamp-1 text-center max-sm:text-[10px]">
                                      {c.name}
                                    </h1>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h2 className="text-white text-[15px] text-center line-clamp-1  w-30 max-sm:text-[11px] pb-1">
                                  {c?.name}
                                </h2>
                                <h3 className="text-white text-[13px] font-light text-center line-clamp-1 w-30  max-sm:text-[10px]">
                                  {c?.character}
                                </h3>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="w-full border-b border-gray-800 pb-8"></div>
                  </div>
                </>
              )}
              {movieDetails?.data.credits.crew.length && (
                <>
                  <div>
                    <h1 className="text-white  text-2xl pb-5 font-medium max-sm:text-[18px]">
                      Crew
                    </h1>
                    <div className="flex gap-7 max-lg:overflow-x-auto  scrollbar-hide scroll-smooth max-sm:gap-0">
                      {movieDetails?.data.credits.crew
                        .slice(0, 5)
                        .map((c: CrewProps) => {
                          return (
                            <div
                              className="flex flex-col items-center gap-3"
                              key={`${c.job}-${c.name}`}
                            >
                              <div className="w-30 h-30 rounded-[50%] max-sm:size-22">
                                {c.profile_path ? (
                                  <img
                                    src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
                                    alt={`${c.name}`}
                                    className="h-full w-full rounded-[50%] object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div
                                    className="h-full w-full rounded-[50%] object-cover
                           border-gray-800 bg-gray-900 flex justify-center items-center"
                                  >
                                    <h1 className="text-white text-[11px] line-clamp-1 text-center max-sm:text-[10px]">
                                      {c.name}
                                    </h1>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h2 className="text-white text-[15px] text-center w-30 line-clamp-1 max-sm:text-[11px] pb-1">
                                  {c.name}
                                </h2>
                                <h3 className="text-white text-[13px] font-light text-center w-30 line-clamp-1  max-sm:text-[10px]">
                                  {c.job}
                                </h3>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="w-full border-b border-gray-800 pb-8"></div>
                  </div>
                </>
              )}
              {movieDetails?.data.production_companies.length && (
                <div>
                  <h1 className="text-white text-2xl font-medium pb-5 max-sm:text-[17px]">
                    Production House
                  </h1>

                  <div className="flex gap-2 flex-wrap">
                    {movieDetails?.data.production_companies.map(
                      (c: CompanyProps) => {
                        return (
                          <div
                            className="py-2 px-4  bg-gray-800 rounded-2xl"
                            key={c.name}
                          >
                            <h2 className="text-white text-[14px] max-sm:text-[11px]">
                              {c.name}
                            </h2>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="w-full border-b border-gray-800 pb-8"></div>
                </div>
              )}
              {movieDetails?.data.similar.results.length && (
                <div className=" h-80  ">
                  <h1 className="text-white text-2xl font-medium pb-5 max-sm:text-[17px]">
                    Recommendation
                  </h1>

                  <div
                    className="flex pt-5 gap-5 justify-between overflow-x-auto  scrollbar-hide scroll-smooth 
               max-sm:pt-1 overflow-y-hidden transition-all duration-500 ease-in-out"
                  >
                    {movieDetails?.data.similar.results
                      .slice(0, 5)
                      .map((movie: MovieProps) => {
                        return (
                          <VerticalCard
                            movie={{ ...movie, media_type: mediaType! }}
                            key={`${movie.title ? movie.title : movie.name}`}
                            mediaType={mediaType}
                          ></VerticalCard>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {playTrailer && (
            <Player
              trailerId={`${movieTrailer?.data.results[0].key}`}
              title={movieDetails?.data.title}
              togglePlay={togglePlay}
            />
          )}
        </div>
      )}
    </>
  );
}
