import { AxiosInstance } from "axios";

export const getPosts = (axiosPrivate: AxiosInstance) => {
  return async () => {
    try {
      const response = await axiosPrivate.get("/posts");
      return response.data;
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  };
};

export const addPost = (axiosPrivate: AxiosInstance) => {
  return async (data: { title: string; body: string }) => {
    try {
      const response = await axiosPrivate.post("/posts", data);

      return response.data;
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  };
};
export const deletePost = (axiosPrivate: AxiosInstance) => {
  return async ({id}:{id:number}) => {
    try {
      const response = await axiosPrivate.delete(`/posts/${id}`);

      return response.data;
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  };
};
export const updatePost = (axiosPrivate: AxiosInstance) => {
  return async ({id,title,body}:{id:number,title: string; body: string }) => {
    try {
      const response = await axiosPrivate.put(`/posts/${id}`,{title,body});

      return response.data;
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  };
};
