import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center bg-[url(assets/bg.jpg)] bg-cover bg-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-gray-300"></div>
      </div>
    </div>
  );
};

export default Loader;
