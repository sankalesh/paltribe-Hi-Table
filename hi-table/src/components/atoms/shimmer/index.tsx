import React from "react";

function Shimmer() {
  return (
    <div className="relative min-h-screen w-full md:w-6/12 bg-[#f5f5f5] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
      <div className="flex">
        <div className="w-[15%] h-8 mx-6 mt-4 bg-neutral-300 rounded-2xl"></div>
        <div className="w-[40%] h-8 mx-6 mt-4 bg-neutral-300 rounded-2xl"></div>
        <div className="w-[15%] h-8 mx-6 mt-4 bg-neutral-300 rounded-2xl"></div>
      </div>
      <div className="flex justify-between">
        <div className="w-[30%] h-8 mx-6 mt-8 bg-neutral-300 rounded-2xl"></div>
        <div className="w-[30%] h-8 mx-6 mt-8 bg-neutral-300 rounded-2xl"></div>
      </div>
      <div className="flex justify-between">
        <div className="w-[30%] h-8 mx-6 mt-8 bg-neutral-300 rounded-2xl"></div>
        <div className="w-[30%] h-8 mx-6 mt-8 bg-neutral-300 rounded-2xl"></div>
        <div className="w-[30%] h-8 mx-6 mt-8 bg-neutral-300 rounded-2xl"></div>
      </div>
      <div className="h-[6rem] mx-6 mt-8 bg-neutral-300 rounded-2xl"></div>
      <div className="h-[6rem] mx-6 mt-6 bg-neutral-300 rounded-2xl"></div>
      <div className="h-[6rem] mx-6 mt-6 bg-neutral-300 rounded-2xl"></div>
      <div className="h-[6rem] mx-6 mt-6 bg-neutral-300 rounded-2xl"></div>
      <div className="h-[6rem] mx-6 mt-6 bg-neutral-300 rounded-2xl"></div>
      <div className="h-[6rem] mx-6 mt-6 bg-neutral-300 rounded-2xl"></div>
    </div>
  );
}

export default Shimmer;
