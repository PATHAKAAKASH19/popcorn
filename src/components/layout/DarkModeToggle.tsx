import { useEffect, useState } from 'react'
import {IconSun, IconMoon} from "@tabler/icons-react"

export default function DarkModeToggle() {


    const [darkMode, setDarkMode] = useState(true)
  
    
    const toggleDarkMode = () => {
       
        setDarkMode(prev =>  !prev)
    }
  

  return (
      <div>
          {
              darkMode ? <IconSun onClick={toggleDarkMode}/>:<IconMoon onClick={toggleDarkMode}/>
          }
      </div>
  )
}
