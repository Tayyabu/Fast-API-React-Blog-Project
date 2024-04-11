import api from "../api/posts";
import { AuthType } from "../context/AuthProvider";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const response = await api.get("/refresh", {
      withCredentials: true,
      });
      const accessToken: string | undefined = response.data?.accessToken;

      setAuth((pre):AuthType => {
        

          return { ...pre, accessToken: accessToken };
        
      });
   return accessToken

    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
