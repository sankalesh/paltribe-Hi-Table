import Footer from "@/components/atoms/footer";
import Header from "@/components/molecules/header";
import React from "react";

function Orders() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header />
      <div className=" ml-6 mt-8 font-bold capitalize text-[#002D4B] text-[1rem] leading-[1.25rem]">
        Orders
      </div>
      <div className="bg-white mx-6 rounded-2xl mt-6 mb-[5rem]">
        <div className="flex justify-between mx-4 pt-4">
          <div className="flex flex-col">
            <div className="font-[500] capitalize">T-21</div>
            <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
              Rishab Hurshan
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-right text-md font-[500] text-[#2C62F0]">
              00:11
            </div>
            <div className="capitalize font-normal mt-1 text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
              22/12/2023
            </div>
          </div>
        </div>
        <div className="mx-4 border-2 border-gray-400/50 rounded-full mt-4"></div>
        <div className="relative pt-2 pb-[4.875rem]">
          <div className="mx-6 mt-4 truncate capitalize font-[500] text-[#002D4B] text-[0.875rem] leading-[1rem]">
            12 X  <span className="ml-2">Chicken tikka sandwich with extra sauce</span>
          </div>
          <div className="mx-6 mt-4 truncate capitalize font-[500] text-[#002D4B] text-[0.875rem] leading-[1rem]">
            12 X  <span className="ml-2">Chicken tikka sandwich with extra sauce</span>
          </div>
          <div className="mx-6 mt-4 truncate capitalize font-[500] text-[#002D4B] text-[0.875rem] leading-[1rem]">
            12 X  <span className="ml-2">Chicken tikka sandwich with extra sauce</span>
          </div>
          <div className="inline-flex right-6 bottom-4 absolute">
            <button className="text-md font-[500] text-[#2C62F0] py-1 px-6 rounded-2xl">
              Reject
            </button>
            <button className="active_on_bounce border border-[#2C62F0]  text-md font-[500] text-[#2C62F0] py-1 px-6 rounded-2xl">
              Accept
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Orders;
