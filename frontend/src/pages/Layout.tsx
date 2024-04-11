import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <div className="sticky z-10 top-0 flex flex-col w-full">
        <Header />
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
