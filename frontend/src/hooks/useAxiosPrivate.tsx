import { useEffect } from "react";
import { axiosPrivate } from "../api/axiosPrivate";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor =axiosPrivate.interceptors.request.use(
      config=>{
       if(!config?.headers['Authorization']){
        config.headers['Authorization']= `Bearer ${auth?.accessToken}`
       }
        return config
      },
      err=>Promise.reject(err)
    )
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const rejectedRequest = err?.config;
        if (err?.response.status === 403 && !rejectedRequest.sent) {
          const newAccessToken = await refresh();
          rejectedRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          rejectedRequest.sent = true;
          return axiosPrivate(rejectedRequest);
        }
        return Promise.reject(err);
      }




    );

    return ()=>{
 axiosPrivate.interceptors.request.eject(requestInterceptor) 
 axiosPrivate.interceptors.response.eject(responseInterceptor) 
    }

  }, [refresh, auth]);
  return axiosPrivate;
};

export default useAxiosPrivate;
