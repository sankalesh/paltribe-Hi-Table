import React from "react";
import {
  MdAutorenew,
  MdOutlineReceiptLong,
  MdOutlineTableRestaurant,
} from "react-icons/md";
import { RxBell } from "react-icons/rx";

function Footer() {
  return (
    <div className="bg-[#2C62F0] fixed bottom-0 z-20 w-full py-2 ">
      <div className="flex justify-between mx-6">
        <div>
          <button className="px-4 py-1 text-white bg-[#2C62F0] rounded-full focus:bg-white/80 focus:text-[#2C62F0] focus:outline-none transition duration-300 ease-in-out">
            <MdOutlineTableRestaurant className="text-[1rem]" />
          </button>

          <div className={`text-sm ml-1 font-normal text-white`}>Tables</div>
        </div>
        <div>
          <button className="px-4 py-1 text-white bg-[#2C62F0] rounded-full focus:bg-white/80 focus:text-[#2C62F0] focus:outline-none transition duration-300 ease-in-out">
            <MdAutorenew className="text-[1rem]" />
          </button>

          <div className={`text-sm ml-1 font-normal text-white`}>Status</div>
        </div>
        <div>
          <button className="px-4 py-1 text-white bg-[#2C62F0] rounded-full focus:bg-white/80 focus:text-[#2C62F0] focus:outline-none transition duration-300 ease-in-out">
            <RxBell className="text-[1rem]" />
          </button>

          <div className={`text-sm ml-1 font-normal text-white`}>Alerts</div>
        </div>
        <div>
          <button className="px-4 py-1 text-white bg-[#2C62F0] rounded-full focus:bg-white/80 focus:text-[#2C62F0] focus:outline-none transition duration-300 ease-in-out">
            <MdOutlineReceiptLong className="text-[1rem]" />
          </button>

          <div className={`text-sm ml-1 font-normal text-white`}>Orders</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
