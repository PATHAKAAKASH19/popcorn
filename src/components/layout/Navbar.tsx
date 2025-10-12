import {Link} from "react-router-dom"
import { IconHome, IconCalendar, IconSearch } from "@tabler/icons-react"
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="flex fixed h-20 border-2 border-amber-200 z-40 w-full bg-white items-center justify-between py-10 px-80 top-0">
      <div className="flex  items-center gap-2 justify-between">
        <Link to="/explore" className="w-10 h-10">
          <img src="/logo.png" alt="site-logo" />
        </Link>
        <Link to="/explore">
          <h1 className="font-semibold">POPCORN</h1>
        </Link>
      </div>

      <div className="flex gap-8 items-center ">
        <Link to="/explore">
          <IconHome />
        </Link>
        <Link to="/schedule">
          <IconCalendar />
        </Link>
        <Link to="/search">
          <IconSearch />
        </Link>

        <DarkModeToggle></DarkModeToggle>
      </div>
    </nav>
  );
}
