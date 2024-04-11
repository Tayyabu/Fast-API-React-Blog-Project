import { FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$?%]).{8,24}$/;
import api from "../api/posts";
import { FormEvent, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(user);
    console.log(result);
    setValidName(result);
  }, [user]);
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(pwd);
    console.log(result);
    setValidPwd(result);
    const match = matchPwd === pwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);
  useEffect(() => {
    setErrMsg("");
  }, [errMsg, matchPwd, user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entity");
      return;
    }
    console.log(pwd, user);
    const authorize = async () => {
      try {
        const data = { name: user, password: pwd };
        const response = await api.post("/register", data);
        const res = await api.post("/login", data, { withCredentials: true });

        setAuth({ user: user, pwd: pwd, accessToken: res.data?.accessToken });
        setUser("");

        setPwd("");

        console.log(response.data);
        if (res.status === 200) {
          navigate(from, { replace: true });
        }
        setSuccess(true);
      } catch (error: any) {
        console.error(error);
      }
    };

    authorize();
  };

  return (
    <main className="flex  text-center   justify-center">
      {success ? (
        <section>
          <h1>Success</h1>
        </section>
      ) : (
        <section className="flex  text-center   justify-center">
          <p
            ref={errRef}
            className={errMsg ? "bg-red-400 m-5 p-6" : "translate-y-0.5"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex pt-2 m-9 bg-slate-500 flex-col justify-center align-middle  h-5/6"
          >
            <p className="text-center  font-bold text-white text-4xl">
              Register
            </p>
            <label className="flex justify-center" htmlFor="username">
              Username
              <span className={validName ? "text-green-500" : "hidden"}>
                <FaCheck />
              </span>
              <span className={validName || !user ? "hidden" : "text-red-500"}>
                <FaTimes />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              className="text-xl m-2 rounded  "
              value={user}
              aria-invalid={validName ? "true" : "false"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                user && userFocus && !validName
                  ? "bg-black text-yellow-50 p-3"
                  : "offscreen"
              }
            >
              <FaInfoCircle />
              4 to 24 characters <br />
              Must begin with a letter. <br />
              Letters,numbers,hyphens,underscors allowed
            </p>
            <label className="flex justify-center" htmlFor="password">
              Password
              <span className={validPwd ? "text-green-500" : "hidden"}>
                <FaCheck />
              </span>
              <span className={validPwd || !pwd ? "hidden" : "text-red-500"}>
                <FaTimes />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              value={pwd}
              className="text-xl m-2 rounded  "
              aria-invalid={validPwd ? "true" : "false"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd
                  ? "bg-black text-yellow-50 p-3"
                  : "offscreen"
              }
            >
              <FaInfoCircle />
              8 to 24 characters <br />
              Must contain uppercase and lowercase letters,a number and a
              special character <br />
              Allowed Characters: <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hash tag">#</span>
              <span aria-label="percent symbol">!</span>
              <span aria-label="dollor symbol">$</span>
              <span aria-label="question mark">?</span>
            </p>
            <label className="flex justify-center" htmlFor="confirm_pwd">
              Confirm Password
              <span
                className={validMatch && matchPwd ? "text-green-500" : "hidden"}
              >
                <FaCheck />
              </span>
              <span
                className={validMatch || !matchPwd ? "hidden" : "text-red-500"}
              >
                <FaTimes />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              className="text-xl m-2 rounded  "
              value={matchPwd}
              aria-invalid={validMatch ? "true" : "false"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? "bg-black text-yellow-50 p-3"
                  : "offscreen"
              }
            >
              <FaInfoCircle />
              Must match the password input field
            </p>
            <button
              type="submit"
              className="bg-slate-300 hover:bg-slate-400 mx-2 my rounded-lg"
              disabled={!validName && !validMatch && !validPwd ? true : false}
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </main>
  );
};

export default Register;
