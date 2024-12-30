import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_REGISTER_RESET } from "../constants/championConstants";
import { register } from "../actions/championActions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+216");
  const [fullNumber, setFullNumber] = useState(`${countryCode}${phone}`);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleCountryCodeChange = (e) => {
    const newCountryCode = e.target.value;
    setCountryCode(newCountryCode);
    setFullNumber(`${newCountryCode} ${phone}`);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    setFullNumber(`${countryCode} ${newPhone}`);
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      dispatch({ type: USER_REGISTER_RESET });
      history("/profile");
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fullNumber,email,password)
    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(fullNumber, email, password));
    }
  };

  return (
    <div className="bg-[url(assets/bg.jpg)] bg-cover bg-center min-h-[100vh] pt-[50px] ">
      <Header />
      <div className="h-[70vh] flex items-center justify-center my-12">
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full xl:p-2 p-2 bg-white rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg required:"
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
                required
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
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full xl:p-2 p-2 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg"
                placeholder="Confirm your password"
              />
            </div>
            <div>
              <label
                className="block text-black xl:text-lg mb-2"
                htmlFor="phone"
              >
                Phone number
              </label>
              <div className="flex">
                <input
                  type="tel"
                  id="countryCode"
                  required
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                  className="w-full xl:p-2 p-2 bg-white rounded-l-2xl max-w-16 text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg"
                  placeholder="+216"
                />
                <input
                  type="tel"
                  id="phone"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full xl:p-2 p-2 bg-white rounded-r-2xl text-black focus:outline-none focus:ring-2 focus:ring-[#2E073F] focus:scale-105 focus:transition-transform text-lg"
                  placeholder="123456789"
                />
              </div>
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
