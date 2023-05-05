import React from "react";
import { BiBowlRice } from "react-icons/bi";

function Paid() {
  return (
    <div className="bg-white mx-6 rounded-2xl">
    <div className="flex justify-between">
      <div className="py-4 mx-4">
        <button
          className={`font-normal relative text-black rounded-full bg-[#DBFFE2]`}
        >
          <div className="inline-flex items-center justify-start">
            <div
              className={`w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#00BA34] rounded-full`}
            >
              <BiBowlRice className="text-white ml-1 mt-1" />
            </div>
            <div className="mb-[0.1rem] font-[500] text-lg text-[#00BA34]/80 pl-2 ml-6 mr-4">
              Paid
            </div>
          </div>
        </button>
      </div>
      <div className="font-normal text-[#002D4B]/40 text-[0.875rem] mt-6 mr-6 leading-[1rem]">
        12:12
      </div>
    </div>
    <div className="flex justify-between pb-4">
      <div className="mx-6 -mt-3">
        <div className="font-[500] mt-1 text-[#002D4B] text-[1rem] leading-[1.25rem]">
          Table 1
        </div>
        <div className="font-normal mt-1 text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
          paid 2500
        </div>
      </div>
      <div>
        <label className="relative  inline-flex scale-150 items-center mr-8 cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
        </label>
      </div>
    </div>
  </div>
  );
}

export default Paid;
