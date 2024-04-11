import { PostType } from "../context/Store";
import { Link } from "react-router-dom";

const Post = ({ post }: { post: PostType }) => {
 

  return (
    <article className="border-2 py-2 rounded text-center m-5 border-black">
      <Link to={`/post/${post?.id}`}>
        <h1 className="text-3xl">{post?.title}</h1>
      </Link>
      {post?.body.length < 5 ? (
        post?.body
      ) : (
        <p className="text-lg">{`${post?.body.slice(0, 10)}...`}</p>
      )}
      <p className="text-lg border-t-2 bg-purple-800 flex flex-row justify-around translate-y-2 text-white font-bold">
        <span> {post.date}</span>
        <span>By {post.authorName}</span>
      </p>
    </article>
  );
};

export default Post;
