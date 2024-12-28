import React from "react";
import { Link } from "react-router-dom";
// color1=#d2d2de
// color2=#160C31
import { FaUserNinja } from "react-icons/fa";
export default function Header() {
  return (
    <div className="p-1 mx-3 xl:mx-[400px] bg-[#EBD3F8]  rounded-3xl flex justify-between items-center bg-opacity-90">
      <Link to="/">
        <div className="p-10 bg-cover bg-[url(assets/logo-nobg.png)] bg-center h-16 w-16 md:h-20 md:w-20" />
      </Link>
      <Link to="/login">
        <div className="xl:mx-10 p-4 bg-[#2E073F] flex rounded-3xl items-center gap-2">
          <FaUserNinja className="text-white" />

          <div className="text-white">Login</div>
        </div>
      </Link>
    </div>
  );
}
