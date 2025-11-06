import { useQueries } from "@tanstack/react-query";
import VerticalCard from "../movie/VerticalCard";
import type { MovieProps } from "@/types/movies";
import { Skeleton } from "../ui/skeleton";
import getDate from "@/utils/getDate";
import axios from "axios";
import type { UrlProps } from "@/types/movies";

const fetchScheduleMovie = (url: string) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
    },
  });
};

type ScheduleSectionProps = {
  urlObj: UrlProps;
};

export default function ScheduleSection({ urlObj }: ScheduleSectionProps) {
  const { data, isLoading } = useQueries({
    queries: [
      {
        queryKey: [`${urlObj?.type}-movies`],
        queryFn: () => fetchScheduleMovie(urlObj.movieUrl),
      },
      {
        queryKey: [`${urlObj?.type}-shows`],
        queryFn: () => fetchScheduleMovie(urlObj.showUrl),
      },
    ],
    combine: (results) => {
      const [movieResults, showResults] = results.map(
        (result) => result.data?.data.results || []
      );

      const moviesWithType = movieResults.map((m: MovieProps) => ({
        ...m,
        media_type: "movie",
      }));

      const showWithType = showResults.map((t: MovieProps) => ({
        ...t,
        media_type: "tv",
      }));

      const combinedData = [...moviesWithType, ...showWithType];

      const groupedByDate = combinedData.reduce(
        (acc: Record<string, any[]>, item: any) => {
          const date = item.release_date;
              if (!acc[date] && date) acc[date] = [];
              
              if (date) { acc[date].push(item) };
          return acc;
        },
        {}
      );

      const groupedArray = Object.entries(groupedByDate)
        .map(([date, data]) => ({
          date,
          data,
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );


      return {
        data: groupedArray,
        isLoading: results.some((r) => r.isLoading),
      };
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-4 w-4xl gap-x-4 gap-y-8  transition-all duration-500 ease-in-out max-xl:w-2xl max-xl:grid-cols-3 max-lg:grid-cols-2 max-lg:w-lg max-md:grid-cols-3 max-md:w-full max-sm:grid-cols-2 ">
          {Array.from({ length: 12 }).map((_, index: number) => (
            <div className="flex flex-col gap-3 max-sm:gap-2" key={index}>
              <Skeleton className="w-50 h-60 bg-gray-500/50  rounded-[1em] max-sm:w-40 max-sm:h-50" />
              <Skeleton className="w-48 h-5 bg-gray-500/50 max-sm:w-37 max-sm:h-3" />
              <Skeleton className="w-40 h-5 bg-gray-500/50 max-sm:w-30 max-sm:h-3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-3 flex-col items-center   transition-all duration-500 ease-in-out max-md:w-full max-md:px-2">
          {data.map((obj) => (
            <div className="flex  gap-1 mb-8  max-sm:w-full max-sm:mb-0" key={obj.date}>
              <div
                className="w-15 h-fit flex flex-col justify-center items-center py-2 px-2 rounded-xl bg-gray-500/20 
              border-gray-500/70  max-sm:w-12"
              >
                {getDate(obj.date).map((data) => {
                  return (
                    <h1 className="text-gray-400/90 text-[14px] max-sm:text-[12px]" key={data}>{data}</h1>
                  );
                })}
              </div>
              <div
                className="grid grid-cols-4 w-3xl gap-x-4 gap-y-8 max-xl:w-xl max-xl:grid-cols-3 
                max-md:gap-x-4 max-lg:w-full max-lg:grid-cols-2  max-md:grid-cols-3 max-sm:grid-cols-2 
                transition-all duration-500 ease-in-out max-sm:gap-y-3 max-sm:gap-x-2 "
              >
                {obj.data.map((movie: MovieProps) => (
                  <VerticalCard
                   
                    movie={movie}
                    mediaType={movie.media_type}
                    key={`${movie.id}`}
                    cn="w-45 "
                    h="h-65 max-sm:h-50 max-lg:h-55"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
