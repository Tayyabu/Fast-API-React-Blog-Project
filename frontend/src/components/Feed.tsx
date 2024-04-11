import { PostType } from "../context/Store";
import Post from "./Post";

const Feed = ({ posts }: { posts: PostType[] | null }) => {
  return (
    <>
      {posts?.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
