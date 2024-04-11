import { useContext } from "react";
import { AuthContext, contextType } from "../context/AuthProvider";

const useAuth = (): contextType => {
  return useContext<contextType>(AuthContext);
};

export default useAuth;
