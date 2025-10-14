import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ExplorePage from "@/pages/ExplorePage";
import SchedulePage from "@/pages/SchedulePage";
import SearchPage from "@/pages/SearchPage";
import ContentPage from "@/pages/ContentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
        path: "content",
        children: [
          {
            path: ":movieId",
            element: <ContentPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
