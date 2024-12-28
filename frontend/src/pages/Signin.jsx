import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email)
    console.log(password)
  };
  return (
    <div className="bg-[url(assets/bg.jpg)] bg-cover bg-center min-h-[100vh] pt-[50px] ">
      <Header />
      <div className="h-[70vh] flex items-center justify-center">
        <div className="bg-[#D6BEE3] xl:px-16 p-8 xl:w-[35%] rounded-2xl shadow-lg">
          <div className="text-black text-center mb-6 xl:text-2xl font-semibold">
            Login
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-black xl:text-lg mb-2"
                htmlFor="Email"
              >
                Email
              </label>
              <input
                type="text"
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full xl:p-3 p-2 bg-white rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg"
                placeholder="Enter your Email"
              />
            </div>
            <div>
              <label
                className="block text-black xl:text-lg mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full xl:p-3 p-2 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full xl:py-3 xl:px-4 py-2 px-5   bg-[#2E073F] text-white rounded-2xl  hover:scale-110 transition-transform focus:outline-none focus:ring-2 xl:text-lg"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-7 ">
            <p className="text-black text-sm ">
              Don’t have an account?
              <Link to="/signup" className="text-[#2E073F] hover:underline pl-3 ">
                Sign up here!
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
