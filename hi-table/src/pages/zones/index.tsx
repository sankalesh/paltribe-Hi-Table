import React, { useState } from "react";
import HiPalLogo from "../../assets/svg/hipalLogoNew.svg";
import Image from "next/image";
import { MdMenuOpen, MdTableRestaurant } from "react-icons/md";
import { useLogin } from "@/components/store/useLogin";
import moment from "moment";

function Zones() {
  const userDetails = useLogin();
  const [isToggled, setIsToggled] = useState(false);
  const { time, setTime } = useLogin();

  const handleToggle = () => {
    setIsToggled(!isToggled);
    const currTime = moment().format("h.mm A");
    setTime(currTime);
  };

  const zones = [
    {
      zoneName: "platinum fjwnhv wnv hwivwvn vwhvhwbviw v",
      zoneCapacity: 10,
      tableOccupied: 7,
    },
    {
      zoneName: "Gold",
      zoneCapacity: 22,
      tableOccupied: 18,
    },
    {
      zoneName: "Titanium",
      zoneCapacity: 15,
      tableOccupied: 2,
    },
    {
      zoneName: "Balcony",
      zoneCapacity: 20,
      tableOccupied: 7,
    },
  ];

  return (
    <div className="bg-[#f5f5f5] pb-6">
      <div className="flex justify-between ml-[1.5rem] pt-[2rem]">
        <Image width={68} height={25} src={HiPalLogo} alt="Hi Table Logo" />
        <MdMenuOpen className="mr-[1.5rem] text-2xl" />
      </div>
      <div className="mx-[1.5rem] bg-white rounded-2xl pb-[0.5rem] border border-[#e1e1e1]/50 mb-6 mt-[1.5rem]">
        <div className="flex justify-between">
          <div className="mt-4 ml-4 ">
            <span className="font-[400] text-[#002D4B] text-[1rem] leading-[1.125rem]">
              Hello,{" "}
            </span>
            <span className="font-semibold capitalize text-[#002D4B] text-[1rem] leading-[1.125rem]">
              {userDetails?.name}
            </span>
          </div>
          <div className="w-7 h-7 mt-[0.75rem] capitalize mr-[1rem] justify-center pt-1 flex border-[#002D4B] bg-white border rounded-full font-semibold text-[#002D4B] text-[1rem] leading-[1.125rem]">
            {userDetails?.name[0]}
          </div>
        </div>
        <div className="mx-4 mt-2">
          <span className="font-[400] text-[#002D4B] text-[0.875rem] leading-[1rem]">
            You logged into{" "}
          </span>
          <span className="font-semibold capitalize text-[#002D4B] text-[0.875rem] leading-[1rem]">
            {userDetails.businessName}
          </span>
        </div>
        <div>
          <div className="flex items-center mx-[1rem] my-2  rounded-xl border border-[#2C62F0]/50">
            <button
              className={`relative capitalize flex w-full h-8 rounded-full transition-colors duration-300 ease-in-out ${
                isToggled ? "" : ""
              }`}
              onClick={handleToggle}
            >
              <span
                className={`absolute top-0.5 left-[0.125rem] bottom-0.5 w-[49.5%] h-7 transform transition-transform duration-300 ease-in-out rounded-xl ${
                  isToggled ? "translate-x-full bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              <div
                className={`absolute z-50 left-12 top-2 font-[400] text-[0.875rem] leading-[1rem] ${
                  isToggled ? "text-[#2C62F0]" : "text-black"
                }`}
              >
                day out
              </div>
              <div
                className={`absolute z-50 right-14 top-2 font-[400] text-[#002D4B] text-[0.875rem] leading-[1rem] ${
                  isToggled ? "text-white" : "text-[#2C62F0]"
                }`}
              >
                day in
              </div>
            </button>
          </div>
        </div>
        <span className="font-semibold mx-[1rem] mt-4 text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
          Your break was at {time}
        </span>
      </div>
      <span className="font-[500] ml-6 text-[#002D4B] text-[0.875rem] leading-[1rem]">
        Zones
      </span>

      {zones.map((ele, index) => (
        <div
          key={index}
          className={`relative h-[5.75rem] mx-6 my-4 border border-[#e1e1e1]/50 rounded-xl ${
            isToggled ? "bg-white" : "bg-gray-200"
          }`}
        >
          <div
            className={`absolute truncate left-6 top-8 w-[70%]  ${
              isToggled ? "font-[500]" : "font-[500] text-gray-400"
            }`}
          >
            {ele.zoneName}
          </div>
          <MdTableRestaurant
            className={`right-8 top-6 absolute text-[1rem] opacity-50 ${
              isToggled ? "bg-white" : "bg-gray-200"
            }`}
          />
          <div
            className={`absolute right-6 bottom-6 text-sm font-[500]  ${
              isToggled
                ? "bg-white text-[#2C62F0]"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {ele.tableOccupied < 10
              ? "0" + ele.tableOccupied
              : ele.tableOccupied}
            /{ele.zoneCapacity < 10 ? `0${ele.zoneCapacity}` : ele.zoneCapacity}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Zones;
