import MainLayout from "../../layouts/MainLayout/MainLayout";
import TeamList from "../../views/Dashboard/TeamList";

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "team-list",
      element: <TeamList />,
    },
  ],
};

export default MainRoutes;
