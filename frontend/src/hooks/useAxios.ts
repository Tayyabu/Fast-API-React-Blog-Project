import { useState, useEffect } from "react";
import { PostType } from "../context/Store";
import { AxiosResponse } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";
const useAxios = (url: string) => {
  const [err, setErr] = useState<string>("");
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState<PostType[]>([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async (url: string) => {
      try {
        const response: AxiosResponse = await axiosPrivate.get(url, {
          signal: controller.signal,
        });

        setData(response.data);
        setErr("");
      } catch (err: any) {
        setErr(err?.message);
        console.log(err);
      } finally {
        setTimeout(() => {
          setIsloading(false);
        }, 3000);
      }
    };

    fetchData(url);

    return () => controller.abort();
  }, []);

  return { data, err, isloading };
};

export default useAxios;
