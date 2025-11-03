import {Link} from "react-router-dom"
import { IconHome, IconCalendar, IconSearch, IconUser } from "@tabler/icons-react"

export default function Navbar() {
  return (
    <nav
      className="flex fixed h-20  z-400 w-full items-center justify-center py-10 backdrop-blur bg-black/50  shadow-blue-950 shadow-xs
      max-sm:py-6 max-sm:h-14 "
    >
      <div
        className="flex w-6xl justify-between  max-xl:w-5xl  mx-10 
      max-sm:w-full max-sm:mx-5 
      "
      >
        <div className="flex  items-center gap-2 justify-between max-sm:gap-1">
          <Link to="/explore" className="size-7 max-sm:size-5">
            <img src="/logo.png" alt="site-logo" />
          </Link>
          <Link to="/explore">
            <h1 className="font-semibold text-white max-sm:text-[15px]">
              POPCORN
            </h1>
          </Link>
        </div>

        <div className="flex gap-5 items-center ">
          <Link to="/explore" className="max-sm:hidden">
            <IconHome className="text-gray-400 size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white " />
          </Link>
          <Link to="/schedule" className="max-sm:hidden">
            <IconCalendar className="text-gray-400 size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white" />
          </Link>

          <Link to="/user/watched" className="max-sm:hidden">
            <IconUser className="text-gray-400 size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white" />
          </Link>
          <Link to="/search">
            <IconSearch className="text-gray-400 size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
