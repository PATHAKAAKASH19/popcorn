import Section from "@/components/layout/Section";

import Carousel from "@/components/layout/Carousel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = (endpoint: string, params?: string) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/${endpoint}?${params}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
    },
  });
};

type categoriesProps = {
  queryKey: string;
  endpoint: string;
  heading: string;
  params: string;
  mediaType: string;
  width?: string;
};

export default function ExplorePage() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["trendind-Banner"],
    queryFn: () => fetchData("trending/all/week", "language=en-US"),
  });

  // const categories = [
  //   {
  //     queryKey: "trending-movies",
  //     endpoint: "trending/movie/day",
  //     heading: "Trending Movies",
  //     params: "language=en-US",
  //     mediaType: "movie",
  //   },
  //   {
  //     queryKey: "trending-shows",
  //     endpoint: "trending/tv/day",
  //     heading: "Trending Shows",
  //     params: "language=en-US",
  //     mediaType: "tv",
  //   },

  //   {
  //     queryKey: "netflix-show",
  //     endpoint: "/discover/movie",
  //     heading: "Popular on Netflix",
  //     params: "with_watch_providers=8&watch_region=IN&sort_by=popularity.desc",
  //     mediaType: "movie",
  //   },

  //   {
  //     queryKey: "amazon-show",
  //     endpoint: "/discover/movie",
  //     heading: "Popular on Amazon",
  //     params:
  //       "with_watch_providers=119&watch_region=IN&sort_by=popularity.desc",
  //     mediaType: "movie",
  //   },

  //   {
  //     queryKey: "upcoming-show",
  //     endpoint: "/movie/upcoming",
  //     heading: "Upcoming Movie",
  //     params: "region=IN",
  //     mediaType: "movie",
  //   },
  // ];

  const genreSections = [
    {
      queryKey: "trending-series",
      endpoint: "/trending/tv/week",
      params: "",
      heading: "Trending Series",
      mediaType: "tv",
      width: "w-45",
    },

    {
      queryKey: "top-rated-series",
      endpoint: "/tv/top_rated",
      params: "",
      heading: "Top Rated TV Series",
      mediaType: "tv",
    },
    {
      queryKey: "action",
      endpoint: "/discover/movie",
      params: "with_genres=28",
      heading: "Action Movies",
      mediaType: "movie",
      width: "w-35",
    },
    {
      queryKey: "trending-movies",
      endpoint: "trending/movie/day",
      heading: "Trending Movies",
      params: "language=en-US",
      mediaType: "movie",
      width: "w-45",
    },

    {
      queryKey: "popular-series",
      endpoint: "/tv/popular",
      params: "",
      heading: "Popular Series",
      mediaType: "tv",
    },
    {
      queryKey: "adventure",
      endpoint: "/discover/movie",
      params: "with_genres=12",
      heading: "Adventure Movies",
      mediaType: "movie",
      width: "w-75",
    },

    {
      queryKey: "hindi-series",
      endpoint: "/discover/tv",
      params: "with_original_language=hi&sort_by=popularity.desc",
      heading: "Hindi Series",
      mediaType: "tv",
      width: "w-45",
    },
    {
      queryKey: "animation",
      endpoint: "/discover/movie",
      params: "with_genres=16",
      heading: "Animation Movies",
      mediaType: "movie",
      width: "w-65",
    },
    {
      queryKey: "comedy",
      endpoint: "/discover/movie",
      params: "with_genres=35",
      heading: "Comedy Movies",
      mediaType: "movie",
      width: "w-35",
    },

    {
      queryKey: "documentary",
      endpoint: "/discover/movie",
      params: "with_genres=99",
      heading: "Documentary Movies",
      mediaType: "movie",
    },
    {
      queryKey: "drama",
      endpoint: "/discover/movie",
      params: "with_genres=18",
      heading: "Drama Movies",
      mediaType: "movie",
      width: "w-45",
    },
    {
      queryKey: "family",
      endpoint: "/discover/movie",
      params: "with_genres=10751",
      heading: "Family Movies",
      mediaType: "movie",
      width: "w-65",
    },
    {
      queryKey: "fantasy",
      endpoint: "/discover/movie",
      params: "with_genres=14",
      heading: "Fantasy Movies",
      mediaType: "movie",
      width: "w-40",
    },
    {
      queryKey: "history",
      endpoint: "/discover/movie",
      params: "with_genres=36",
      heading: "History Movies",
      mediaType: "movie",
    },
    {
      queryKey: "horror",
      endpoint: "/discover/movie",
      params: "with_genres=27",
      heading: "Horror Movies",
      mediaType: "movie",
      width: "w-35",
    },

    {
      queryKey: "mystery",
      endpoint: "/discover/movie",
      params: "with_genres=9648",
      heading: "Mystery Movies",
      mediaType: "movie",
    },

    {
      queryKey: "science-fiction",
      endpoint: "/discover/movie",
      params: "with_genres=878",
      heading: "Science Fiction Movies",
      mediaType: "movie",
      width: "w-65",
    },
    {
      queryKey: "thriller",
      endpoint: "/discover/movie",
      params: "with_genres=53",
      heading: "Thriller & Suspense Movies",
      mediaType: "movie",
      width: "w-45",
    },
    {
      queryKey: "war",
      endpoint: "/discover/movie",
      params: "with_genres=10752",
      heading: "War Movies",
      mediaType: "movie",
      width: "w-75",
    },
    {
      queryKey: "western",
      endpoint: "/discover/movie",
      params: "with_genres=37",
      heading: "Western Movies",
      mediaType: "movie",
    },
  ];

  return (
    <div className="flex  flex-col  items-center justify-evenly overflow-hidden  ">
      {!isLoading ? (
        <>
          <Carousel
            movieData={movies?.data.results}
            autoSlide={true}
            slideButtons={true}
            autoSlideInterval={6000}
          ></Carousel>

          <div className="w-screen px-8  max-sm:px-4  ">
            {genreSections.map((ctg: categoriesProps) => (
              <Section
                queryKey={ctg.queryKey}
                endpoint={ctg.endpoint}
                heading={ctg.heading}
                params={ctg.params}
                mediaType={ctg.mediaType}
                key={ctg.queryKey}
                width={ctg?.width}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
