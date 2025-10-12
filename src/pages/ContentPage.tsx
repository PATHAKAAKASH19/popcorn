
import { useParams } from "react-router-dom"


export default function ContentPage() {

    const {movieSlug} = useParams()

   
  return (
      <div>{ movieSlug}</div>
  )
}
