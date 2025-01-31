import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaClipboardList, FaShippingFast } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";
import { IoSearchCircle } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { ImCheckboxChecked } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCOrder } from "../actions/championActions";
import Loader from "../components/Loader";

export default function Profile() {
  const Cartitems = useSelector((state) => state.CartFromStorage);
  const { error, loading, cartInfo } = Cartitems;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderInfo = useSelector((state) => state.getCorder);
  const { loading:loadingorder,orders } = orderInfo;

  const redirect = location.search ? location.search.split("=")[1] : "/login";
  useEffect(() => {
    if (!userInfo) {
      navigate(redirect);
    } else {
      dispatch(getCOrder());
    }
  }, [navigate, userInfo, dispatch]);

  const getStatusElement = (status) => {
    switch (status) {
      case "under_review":
        return (
          <div className="flex items-center gap-2 ">
            <IoSearchCircle className="text-[30px] text-yellow-500" />
            <span>Under Review</span>
          </div>
        );
      case "in_process":
        return (
          <div className="flex items-center gap-2">
            <GiSandsOfTime className="text-[30px]  text-yellow-500" />
            <span>In Process</span>
          </div>
        );
      case "shipping":
        return (
          <div className="flex items-center gap-2 ">
            <FaShippingFast className="text-[30px] text-green-500" />
            <span>Shipping</span>
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-2 ">
            <ImCheckboxChecked className="text-[30px] text-green-500" />
            <span>Completed</span>
          </div>
        );
      case "cancelled":
        return (
          <div className="flex items-center gap-2 ">
            <MdCancel className="text-[30px] text-red-500" />
            <span>Cancelled</span>
          </div>
        );
      default:
        return <span>Status Unknown</span>;
    }
  };
  if (loading || loadingorder) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-[url(static/bg.jpg)] bg-cover bg-center min-h-screen pb-20 pt-[50px] flex flex-col ">
        <Header />
        {orders && orders.length ? (
          <div className="bg-[#EBD3F8] rounded-2xl p-6 sm:px-8 lg:px-[200px] mx-4 mt-16 xl:mx-[400px] flex flex-col items-center gap-y-5 shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="flex justify-center items-center gap-3 mb-6">
              <FaClipboardList className="text-4xl md:text-[50px] text-[#2E073F]" />
              <div className="font-bold text-[28px] md:text-[50px] text-[#2E073F]">
                Your Orders
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-xl shadow-md w-[300px] hover:scale-105 transition-transform duration-300"
                >
                  <div className="font-semibold text-lg mb-2">
                    Order ID: <span className="text-[#7A3F82]">{order.id}</span>
                  </div>
                  <div className="text-sm mb-4">
                    Frame Type: League of Legends {order.size}
                  </div>
                  <div className="text-sm text-gray-600">
                    Date: {order.created_at}
                  </div>
                  <div className="mt-4">{getStatusElement(order.status)}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#EBD3F8] rounded-2xl p-6 sm:px-8 lg:px-[200px] mx-4 mt-16 xl:mx-[400px] flex flex-col items-center gap-y-5 shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="flex justify-center items-center gap-2 mb-6">
              <FaClipboardList className="text-4xl md:text-[50px] text-[#2E073F]" />
              <div className="font-bold text-[28px] md:text-[50px] text-[#2E073F]">
                Orders
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <LuInfo className="xl:text-[30px]" />
              <div className="xl:text-[30px] text-[#7A3F82]">
                You don't have any orders yet
              </div>
            </div>
            <div className="flex items-center justify-center text-center text-xs gap-1 xl:text-sm mt-4">
              Do you need any help? Please{""}
              <a
                href="mailto:support@tokencraft.com"
                className="text-[#2E073F] font-semibold"
              >
                Contact us
              </a>
              .
            </div>
          </div>
        )}
        
      </div>
      <Footer />
    </>
  );
}
