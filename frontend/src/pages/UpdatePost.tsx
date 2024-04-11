import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updatePost } from "../utils/posts";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { StoreModel } from "../context/Store";
import { State, useStoreState } from "easy-peasy";
const UpdatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const posts = useStoreState((state: State<StoreModel>) => state.posts);
  const post = posts.find((post) => post.id === Number(id));
  const client = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { mutate } = useMutation({
    mutationFn: updatePost(axiosPrivate),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: "posts" });
      navigate("/");
    },
  });

  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (title && body) {
      mutate({ id: Number(id), title, body });
    }
  }
  return (
    <main>
      <section className="flex justify-center text-center">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="Title">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="text-2xl p-3"
            type="text"
            id="Title"
          />
          <label htmlFor="Body">Body</label>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            id="Body"
          ></textarea>
          <button className="bg-gray-400 my-2 mx-8 p-3 rounded" type="submit">
            Update
          </button>
        </form>
      </section>
    </main>
  );
};

export default UpdatePost;
