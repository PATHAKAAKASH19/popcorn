import ScheduleSection from "@/components/layout/ScheduleSection";
import { useState, useEffect } from "react";
import type { UrlProps } from "@/types/movies";

 const today = new Date().toISOString().split("T")[0];

const urlObj = [
  {
    type: "today-released",
    movieUrl: `${import.meta.env.VITE_BASE_URL}/discover/movie?api_key=${
      import.meta.env.VITE_API_KEY
    }&region=IN&primary_release_date.gte=${today}&primary_release_date.lte=${today}&sort_by=popularity.desc`,
    showUrl: `${import.meta.env.VITE_BASE_URL}/discover/tv?api_key=${
      import.meta.env.VITE_API_KEY
    }&region=IN&first_air_date.gte=${today}&first_air_date.lte=${today}&sort_by=popularity.desc`,
  },
  {
    type: "upcoming",
    movieUrl: `${
      import.meta.env.VITE_BASE_URL
    }/movie/upcoming?language=en-IN&region=IN&page=1`,
    showUrl: `${
      import.meta.env.VITE_BASE_URL
    }/tv/on_the_air?language=en-IN&region=IN&page=1`,
  },

  {
    type: "released",
    movieUrl: `${import.meta.env.VITE_BASE_URL}/discover/movie?region=IN&release_date.lte=${today}&sort_by=release_date.desc&with_release_type=3`,
    showUrl: `${import.meta.env.VITE_BASE_URL}/discover/tv?region=IN&first_air_date.lte=${today}&sort_by=first_air_date.desc`,
  },
];

export default function SchedulePage() {
  const [filter, setFilter] = useState("today-released");
  const [url, setUrl] = useState<UrlProps>();

 

  useEffect(() => {
    const obj = urlObj.filter((u) => u.type === filter);
    if (obj) {
      setUrl(obj[0]);
    }
  }, [filter]);

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  return (
    <div className="pt-30 flex justify-center max-md:pt-15 w-screen h-screen ">
      <div className="flex justify-center w-full  gap-4  max-md:flex-col max-md:items-center px-2 max-sm:gap-0  relative ">
        <div
          className="w-70 flex flex-col justify-evenly items-center bg-gray-500/20  
        rounded-[1em] h-40 max-lg:w-60 max-md:flex-row max-md:h-13 max-md:w-full transition-all duration-500 ease-in-out max-sm:h-12 mb-5  max-sm:top-15 max-sm:mb-5 sticky top-20"
        >
          <h1
            className={` cursor-pointer  py-0  text-[16px]  w-full h-full
            flex justify-center items-center  ${
              filter === "released"
                ? "bg-white text-black rounded-[0.5em]"
                : "text-white bg-gray-500/20"
            } max-sm:text-[13px] max-md:py-2`}
            onClick={() => handleFilter("released")}
          >
            Released
          </h1>
          <h1
            className={` py-0 text-[16px] w-full flex  cursor-pointer justify-center items-center  h-full ${
              filter === "today-released"
                ? "bg-white text-black rounded-[0.5em]"
                : "text-white bg-gray-500/20"
            } max-sm:text-[13px]  max-md:py-2`}
            onClick={() => handleFilter("today-released")}
          >
            Today Released
          </h1>
          <h1
            className={` py-0 text-[16px] w-full flex justify-center items-center h-full  cursor-pointer ${
              filter === "upcoming"
                ? "bg-white text-black rounded-[0.5em]"
                : "text-white bg-gray-500/20"
            } max-sm:text-[13px]  max-md:py-2`}
            onClick={() => handleFilter("upcoming")}
          >
            upcoming
          </h1>
        </div>
        {url && (
          <div
            className="overflow-y-scroll scrollbar-hide w-fit max-md:w-fit  max-md:h-fit max-sm:sticky 
          max-sm:top-70"
          >
            <ScheduleSection urlObj={url} />
          </div>
        )}
      </div>
    </div>
  );
}
