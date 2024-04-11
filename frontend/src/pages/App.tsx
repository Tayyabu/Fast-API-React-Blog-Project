import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import Missing from "./Missing";
import Login from "./Login";
import RequireLogin from "./RequireLogin";
import Register from "./Register";
import UpdatePost from "./UpdatePost";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireLogin />}>
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/update/:id" element={<UpdatePost />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default App;
