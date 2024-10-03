import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes/MainRoutes";
import AuthRoutes from "./AuthRoutes/AuthRoutes";

export default function Routes() {
  return useRoutes([MainRoutes, AuthRoutes]);
}
