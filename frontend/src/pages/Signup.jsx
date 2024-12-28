import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="bg-[url(assets/bg.jpg)] bg-cover bg-center min-h-[100vh] pt-[50px] ">
      <Header />
      <div className="h-[70vh] flex items-center justify-center">
        <div className="bg-[#D6BEE3] xl:px-16 xl:w-[35] mt-auto px-8 rounded-2xl shadow-lg">
          <div className="text-black text-center xl:my-6 my-3 xl:text-2xl font-semibold">
            Sign Up
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-black xl:text-lg mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full xl:p-2 p-2 bg-white rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full xl:p-2 p-2 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label
                className="block text-black xl:text-lg mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full xl:p-2 p-2 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg"
                placeholder="Confirm your password"
              />
            </div>
            <div>
              <label
                className="block text-black xl:text-lg mb-2"
                htmlFor="email"
              >
                Phone number
              </label>
              <input
                type='tel'
                id="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full xl:p-2 p-2 bg-white rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg"
                placeholder="Enter your phone number"
              />
            </div>
            <button
              type="submit"
              className="w-full xl:py-3 xl:px-4 py-2 px-5 bg-[#2E073F] text-white rounded-2xl hover:scale-110 transition-transform focus:outline-none focus:ring-2 xl:text-lg"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center my-4">
            <p className="text-black text-sm">
              Already have an account?
              <Link to="/login" className="text-[#2E073F] hover:underline pl-3">
                Login here!
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
