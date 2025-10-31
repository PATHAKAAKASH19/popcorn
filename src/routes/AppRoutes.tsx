import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ExplorePage from "@/pages/ExplorePage";
import SchedulePage from "@/pages/SchedulePage";
import SearchPage from "@/pages/SearchPage";
import ContentPage from "@/pages/ContentPage";
// import UserPage from "@/pages/UserPage";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // default route when path is '/'
        element: <Navigate to="explore" replace />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },

      {
        path: "schedule",
        element: <SchedulePage />,
      },

      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: ":mediaType",
        children: [
          {
            path: ":movieId",
            element: <ContentPage />,
          },
        ],
      },
      // {
      //   path: "user",
      //   element:<UserPage></UserPage>
      // },
    ],
  },
]);

export default router;
