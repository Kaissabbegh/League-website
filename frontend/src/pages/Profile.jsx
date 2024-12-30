import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";

export default function Profile() {
  return (
    <div className="bg-[url(assets/bg.jpg)] bg-cover bg-center min-h-[100vh] pt-[50px] ">
      <Header />
      <div className="bg-[#EBD3F8] rounded-2xl p-[40px] xl:px-[200px] xl:mx-[400px] mx-[20px] my-[100px] flex flex-col items-top justify-center gap-y-5">
        <div className="flex justify-center items-center gap-2">
          <FaClipboardList className="text-[50px]" />
          <div className=" font-bold xl:text-[50px] text-[30px]">Orders</div>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <LuInfo className="xl:text-[30px]" />
          <div className="xl:text-[30px]">You don't have any orders yet</div>
        </div>
        <div className="flex items-center justify-center text-center text-xs xl:text-sm">Do you need any kind of help? Please Contact us.</div>
      </div>
    </div>
  );
}
