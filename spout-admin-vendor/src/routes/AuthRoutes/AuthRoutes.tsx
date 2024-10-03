import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Signin from "../../views/AuthPages/Signin";

const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "signin",
      element: <Signin />,
    },
  ],
};

export default AuthRoutes;
