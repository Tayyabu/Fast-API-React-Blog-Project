import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireLogin = () => {
  const locaton = useLocation();

  const { auth } = useAuth();

  return (
    <>
      {auth?.accessToken ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} state={{ from: locaton }} replace />
      )}
    </>
  );
};

export default RequireLogin;
