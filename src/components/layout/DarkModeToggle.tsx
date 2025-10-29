import { useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div>
      {darkMode ? (
        <IconSun
          onClick={toggleDarkMode}
          className="text-gray-400 size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white"
        />
      ) : (
        <IconMoon
          onClick={toggleDarkMode}
          className="text-gray-400 size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white "
        />
      )}
    </div>
  );
}
