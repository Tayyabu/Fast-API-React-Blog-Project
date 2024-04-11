import { Link, useParams } from "react-router-dom";
import { PostType } from "../context/Store";
import { useQuery, useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { deletePost } from "../utils/posts";
import { useNavigate } from "react-router-dom";
const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();
  const { data: posts } = useQuery<PostType[]>({
    queryKey: ["posts"],
    staleTime: 100000,
    queryFn: async () => {
      const response = await axiosPrivate.get("/posts");
      return response.data;
    },
  });

  const { mutate: deletemutate } = useMutation({
    mutationFn: deletePost(axiosPrivate),
  });

  const post = posts?.find((post) => post.id?.toString() === id);
  return (
    <main className="text-center translate-y-36">
      <h1 className="text-6xl p-9">{post?.title}</h1>
      <p>{post?.body}</p>
      <button
        className="bg-red-700 rounded

      
      text-white px-3 text-2xl"
        type="button"
        onClick={() => {
          deletemutate({ id: Number(id) });
          client.invalidateQueries({ queryKey: ["posts"] });

          navigate("/");
        }}
      >
        Delete
      </button>
      <Link to={`/update/${id}`}>
        <button
          className="bg-blue-700 mx-3 rounded

      
text-white px-3 text-2xl"
          type="button"
        >
          Update
        </button>
      </Link>
    </main>
  );
};

export default PostPage;
