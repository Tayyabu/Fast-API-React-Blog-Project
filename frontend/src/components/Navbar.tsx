import { Link } from "react-router-dom";
import { StoreModel } from "../context/Store";
import { useStoreState, State, useStoreActions, Actions } from "easy-peasy";
import useAuth from "../hooks/useAuth";
const Navbar = () => {
  const search = useStoreState((state: State<StoreModel>) => state.search);
  const setSearch = useStoreActions(
    (actions: Actions<StoreModel>) => actions.setSearch
  );
  const { auth } = useAuth();
  return (
    <nav
      className="bg-slate-900 mx-3 py-2 my-0 text-zinc-300 rounded-b-lg 

    gap-y-6
    justify-center
    
    rounded-bl-lg"
    >
      <Link className="m-4" to={"/"}>
        Home
      </Link>
      <Link className="m-4" to={"/about"}>
        About
      </Link>
      <Link className="m-4" to={"/post"}>
        Post
      </Link>
      {!auth?.accessToken && (
        <Link className="m-4" to={"/login"}>
          Login
        </Link>
      )}
      {!auth?.accessToken && (
        <Link className="m-4" to={"/register"}>
          Register
        </Link>
      )}
      <label htmlFor="search" className="hidden">
        Search
      </label>
      <input
        type="text"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`px-4 mx-5 my-3  rounded-full font-bold h-11 outline-none text-black  flex-row  justify-center justify-self-center`}
      />
    </nav>
  );
};

export default Navbar;
