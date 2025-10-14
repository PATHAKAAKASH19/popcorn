import {Link} from "react-router-dom"
import { IconHome, IconCalendar, IconSearch } from "@tabler/icons-react"
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="flex fixed h-20  z-40 w-full items-center justify-between py-10 px-80 top-0 backdrop-blur bg-black/70  shadow-blue-950 shadow-xs">
      <div className="flex  items-center gap-2 justify-between">
        <Link to="/explore" className="w-10 h-10">
          <img src="/logo.png" alt="site-logo" />
        </Link>
        <Link to="/explore">
          <h1 className="font-semibold text-white">POPCORN</h1>
        </Link>
      </div>

      <div className="flex gap-8 items-center ">
        <Link to="/explore">
          <IconHome className="text-gray-400 size-6 hover:scale-110 transition-transform duration-300 hover:cursor-pointer  hover:text-white " />
        </Link>
        <Link to="/schedule">
          <IconCalendar className="text-gray-400 size-6 hover:scale-110 transition-transform duration-300 hover:cursor-pointer  hover:text-white" />
        </Link>
        <Link to="/search">
          <IconSearch className="text-gray-400 size-6 hover:scale-110 transition-transform duration-300 hover:cursor-pointer  hover:text-white" />
        </Link>

        <DarkModeToggle></DarkModeToggle>
      </div>
    </nav>
  );
}
