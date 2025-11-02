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
    <div className="py-30 flex justify-center ">
      <div className="flex justify-center w-full  gap-4 relative max-md:flex-col max-md:items-center">
        <div
          className="w-70 flex flex-col justify-evenly items-center bg-gray-500/20  
        rounded-[1em] h-45 sticky top-30 max-lg:w-60 max-md:flex-row max-md:h-15 max-md:w-full max-md:top-20 z-10 "
        >
          <h1
            className={`text-white cursor-pointer  py-2  text-[16px]  w-full h-full
            flex justify-center items-center rounded-[1em] ${
              filter === "released" ? "border-gray-500/50 border" : ""
            }`}
            onClick={() => handleFilter("released")}
          >
            Released
          </h1>
          <h1
            className={`text-white py-2 text-[16px] w-full flex  cursor-pointer justify-center items-center rounded-[1em] h-full ${
              filter === "today-released" ? "border-gray-500/50 border" : ""
            }`}
            onClick={() => handleFilter("today-released")}
          >
            Today Released
          </h1>
          <h1
            className={`text-white py-2 text-[16px] w-full flex justify-center items-center rounded-[1em] h-full  cursor-pointer ${
              filter === "upcoming" ? "border-gray-500/50 border" : ""
            }`}
            onClick={() => handleFilter("upcoming")}
          >
            upcoming
          </h1>
        </div>
        {url && <ScheduleSection urlObj={url} />}
      </div>
    </div>
  );
}
