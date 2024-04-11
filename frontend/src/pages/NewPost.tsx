import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addPost } from "../utils/posts";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
const NewPost = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { mutate } = useMutation({
    mutationFn: addPost(axiosPrivate),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: "posts" });
      navigate("/");
    },
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate({ title, body });
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
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default NewPost;
