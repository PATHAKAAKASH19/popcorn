import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function UserPage() {
  const [tabName, setTabName] = useState("watched");
  const navigate = useNavigate();

  const navigateToContent = (route: "watched" | "bookmark") => {
    navigate(route);
    setTabName(route);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-x-hidden">
      <div className="flex flex-col justify-start items-center py-30 max-sm:py-18 max-md:py-25 bg-black h-fit w-full ">
        <div className="flex flex-col  w-6xl gap-2 max-xl:w-4xl max-lg:w-2xl max-md:w-md ">
          <div className="flex gap-10 border-b border-gray-400/30 py-2 max-sm:justify-evenly">
            <h1
              className={`cursor-pointer text-[18px] font-medium  ${
                tabName === "watched" ? "text-blue-400" : "text-white"
              } max-sm:text-[14px]`}
              onClick={() => navigateToContent("watched")}
            >
              Watched Movies
            </h1>
            <h2
              className={`cursor-pointer text-[18px] font-medium  ${
                tabName === "bookmark" ? "text-blue-400" : "text-white"
              } max-sm:text-[14px]`}
              onClick={() => navigateToContent("bookmark")}
            >
              Bookmark Movies
            </h2>
          </div>

          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
