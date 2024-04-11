import { useState, useRef, useEffect, FormEvent } from "react";
import api from "../api/posts";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { setAuth, auth } = useAuth();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [pwd, setPwd] = useState("");

  const [authErr, setauthErr] = useState<string | null>(null);

  const errRef = useRef<HTMLParagraphElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    userRef?.current?.focus();
  }, []);
  useEffect(() => {
    setauthErr("");
  }, [user, pwd]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const loginUser = async () => {
      try {
        const response = await api.post(
          "/login",
          { name: user, password: pwd },
          {
            withCredentials: true,
          }
        );

        setAuth({
          user: user,
          pwd: pwd,
          accessToken: response.data?.accessToken,
        });
        setUser("");

        setPwd("");
        navigate(from, { replace: true });
        console.log(auth);
        setauthErr(null);
      } catch (err: any) {
        console.log(err);

        if (err?.response?.status === 401) {
          setauthErr("unauthorized");
        } else {
          setauthErr("Something went wrong.Please try later...");
        }
        errRef.current?.focus();
      }
    };
    loginUser();
  }

  return (
    <main className="flex  text-center   justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex pt-2 m-9 bg-slate-500 w-4/5 flex-col justify-center  h-56"
        style={{ alignItems: "center" }}
      >
        {authErr && (
          <p className="bg-red-400 mt-2 text-red-700 p-2" ref={errRef}>
            {authErr}
          </p>
        )}
        <label htmlFor="name">Username</label>
        <input
          className="text-xl m-2 rounded w-56 "
          value={user}
          onChange={(e) => setUser(e.target.value)}
          type="text"
          id="name"
          autoComplete="off"
          ref={userRef}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="text-xl m-2 rounded w-56 "
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          type="password"
          id="password"
          required
        />
        <button
          className="bg-slate-400 px-16 my-4 rounded hover:bg-slate-300 "
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Login;
