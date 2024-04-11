import { useStoreState, State, useStoreActions, Actions } from "easy-peasy";
import Feed from "../components/Feed";
import { getPosts } from "../utils/posts";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { PostType, StoreModel } from "../context/Store";
import { useEffect } from "react";
import { useQuery } from "react-query";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: posts,
    isError,
    isLoading,
    error,
  } = useQuery<PostType[], any, any, string[]>({
    queryKey: ["posts"],
    staleTime: 1000,

    queryFn: getPosts(axiosPrivate),
  });

  const search: string = useStoreState(
    (state: State<StoreModel>) => state.search
  );
  const searchResults = useStoreState(
    (state: State<StoreModel>) => state.searchResults
  );

  const setSearchResults = useStoreActions(
    (actions: Actions<StoreModel>) => actions.setSearchResults
  );

  const setPosts = useStoreActions(
    (actions: Actions<StoreModel>) => actions.setPosts
  );
  useEffect(() => {
    if (Array.isArray(posts)) {
      setPosts(posts);
      const newResult: PostType[] | undefined = posts?.filter(
        (post: PostType) => {
          return (
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase())
          );
        }
      );
      setSearchResults(newResult?.reverse());
    }
  }, [search, posts, setSearchResults]);
  return (
    <main className="flex-col  my-20 ">
      {isLoading && <p>Loading</p>}
      {searchResults && <Feed posts={searchResults} />}

      {!isLoading && !posts?.length && <p className="my-7">No post to show </p>}
      {isError && (
        <pre className="text-red-700 font-mono font-bold text-3xl text-center">
          {JSON.stringify(error.message)}
        </pre>
      )}
    </main>
  );
};

export default Home;
