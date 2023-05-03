import HeaderButton from "@/components/atoms/buttons/headerButton";
import Header from "@/components/molecules/header";
import React, { useState } from "react";
import { MdAlarm } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";
import { SiGoogleassistant } from "react-icons/si";
import {
  MdOutlineDinnerDining,
  MdMenuOpen,
  MdTableRestaurant,
  MdOutlineTableRestaurant,
  MdOutlineReceiptLong,
  MdAutorenew,
} from "react-icons/md";
import { RxBell } from "react-icons/rx";

type Zone = {
  zoneName: string;
  zoneCapacity: string;
  tableOccupied: string;
  status: string;
};

const zones = [
  {
    zoneName: "platinum fjwnhv wnv hwivwvn vwhvhwbviw v",
    zoneCapacity: 10,
    tableOccupied: 7,
    status: "Occupied",
  },
  {
    zoneName: "Gold",
    zoneCapacity: 22,
    tableOccupied: 18,
    status: "Settled",
  },
  {
    zoneName: "Titanium",
    zoneCapacity: 20,
    status: "Empty",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "Need Assistance",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "reserved",
  },
  {
    zoneName: "platinum fjwnhv wnv hwivwvn vwhvhwbviw v",
    zoneCapacity: 10,
    tableOccupied: 7,
    status: "Occupied",
  },
  {
    zoneName: "Gold",
    zoneCapacity: 22,
    tableOccupied: 18,
    status: "Settled",
  },
  {
    zoneName: "Titanium",
    zoneCapacity: 20,
    status: "Empty",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "Need Assistance",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "reserved",
  },
  {
    zoneName: "platinum fjwnhv wnv hwivwvn vwhvhwbviw v",
    zoneCapacity: 10,
    tableOccupied: 7,
    status: "Occupied",
  },
  {
    zoneName: "Gold",
    zoneCapacity: 22,
    tableOccupied: 18,
    status: "Settled",
  },
  {
    zoneName: "Titanium",
    zoneCapacity: 20,
    status: "Empty",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "Need Assistance",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "reserved",
  },
  {
    zoneName: "platinum fjwnhv wnv hwivwvn vwhvhwbviw v",
    zoneCapacity: 10,
    tableOccupied: 7,
    status: "Occupied",
  },
  {
    zoneName: "Gold",
    zoneCapacity: 22,
    tableOccupied: 18,
    status: "Settled",
  },
  {
    zoneName: "Titanium",
    zoneCapacity: 20,
    status: "Empty",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "Need Assistance",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "reserved",
  },
  {
    zoneName: "platinum fjwnhv wnv hwivwvn vwhvhwbviw v",
    zoneCapacity: 10,
    tableOccupied: 7,
    status: "Occupied",
  },
  {
    zoneName: "Gold",
    zoneCapacity: 22,
    tableOccupied: 18,
    status: "Settled",
  },
  {
    zoneName: "Titanium",
    zoneCapacity: 20,
    status: "Empty",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "Need Assistance",
  },
  {
    zoneName: "Balcony",
    zoneCapacity: 20,
    tableOccupied: 7,
    status: "reserved",
  },
];

function Table() {
  const [zoneData, setZoneData] = useState(zones);
  const [filterClicked, setFilterClicked] = useState(false);

  // const buttonProps = {
  //   onClick: () => {
  //     console.log("u clicked the button");
  //   },
  // };

  const handleOnclick = (str: any) => {
    if (str.toLowerCase() === "occupied") {
      if (filterClicked) {
        setZoneData(zones);
        setFilterClicked(false);
      } else {
        setZoneData(
          zones.filter((ele) => ele.status.toLowerCase() === "occupied")
        );
        setFilterClicked(true);
      }
    } else if (str.toLowerCase() === "empty") {
      if (filterClicked) {
        setZoneData(zones);
        setFilterClicked(false);
      } else {
        setZoneData(
          zones.filter((ele) => ele.status.toLowerCase() === "empty")
        );
        setFilterClicked(true);
      }
    } else if (str.toLowerCase() === "need assistance") {
      if (filterClicked) {
        setZoneData(zones);
        setFilterClicked(false);
      } else {
        setZoneData(
          zones.filter((ele) => ele.status.toLowerCase() === "need assistance")
        );
        setFilterClicked(true);
      }
    }
  };

  const classByStatus = {
    occupied: {
      classNames:
        "relative h-[5.75rem] mx-6 my-4 border border-[#e1e1e1]/50 rounded-xl bg-[#E3EFFF]",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-9 w-[50%]",
      tableClasses: "right-8 top-6 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-6 text-sm font-[500] text-[#2C62F0]",
    },
    reserved: {
      classNames:
        "relative h-[3.75rem]  mx-6 my-4 border border-[#e1e1e1]/50 rounded-xl bg-gray-200",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-2 w-[50%]",
      tableClasses: "right-8 top-2 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-2 text-sm font-[500] text-[#2C62F0]",
    },
    empty: {
      classNames:
        "relative h-[3.75rem]  mx-6 my-4 border border-[#e1e1e1]/50 rounded-xl bg-[#DBFFE2]",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-2 w-[50%]",
      tableClasses: "right-8 top-2 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-2 text-sm font-[500] text-[#2C62F0]",
    },
    settled: {
      classNames:
        "relative h-[5.75rem] mx-6 my-4 border border-[#e1e1e1]/50 rounded-xl bg-[#FFF3D3]",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-9 w-[50%]",
      tableClasses: "right-8 top-6 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-6 text-sm font-[500] text-[#2C62F0]",
    },
    ["need assistance"]: {
      classNames:
        "relative h-[5.75rem]  mx-6 my-4 border border-[#e1e1e1]/50 rounded-xl bg-[#FFE5E5]",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-9 w-[50%]",
      tableClasses: "right-8 top-6 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-6 text-sm font-[500] text-[#2C62F0]",
    },
  };

  return (
    <div className="bg-[#f5f5f5] pb-6 relative">
      <Header />
      <div className="sticky top-0 z-50 bg-[#f5f5f5]">
        <div className="flex justify-between">
          <div className="ml-6 mt-8 font-bold capitalize text-[#002D4B] text-[1rem] leading-[1.25rem]">
            Platinum
          </div>
          <div className="mt-6  mr-6 w-[30%]">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 flex items-center pointer-events-none right-2">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-[#2C62F0]/80 dark:text-[#2C62F0]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="border  border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-[#2C62F0] block w-full pl-4 p-1.5"
                placeholder="Search"
                required
              />
            </div>
          </div>
        </div>
        <div className="sticky flex justify-between pb-6 mx-6 mt-6 shadow">
          <HeaderButton onClick={() => handleOnclick("Occupied")}>
            <MdAlarm className="mt-1 mr-1 -ml-1 text-[#2C62F0]" />
            Occupied
          </HeaderButton>
          <HeaderButton onClick={() => handleOnclick("Empty")}>
            <TbToolsKitchen2 className="mt-1 mr-1 -ml-1 text-[#2C62F0]" />
            Empty
          </HeaderButton>
          <HeaderButton onClick={() => handleOnclick("Need Assistance")}>
            <SiGoogleassistant className="mt-1 mr-1 -ml-1 text-[#2C62F0]" />
            Assistant
          </HeaderButton>
        </div>
      </div>
      <div className="mb-[4rem]">
        {zoneData.map((ele: any, index) => (
          <div
            key={index}
            className={`${
              classByStatus[ele?.status.toLowerCase()]?.classNames
            }`}
          >
            <div
              className={`${
                classByStatus[ele?.status.toLowerCase()].businessNameClasses
              }`}
            >
              {ele.zoneName}
            </div>
            <MdTableRestaurant
              className={`${
                classByStatus[ele?.status.toLowerCase()].tableClasses
              }`}
            />
            <div
              className={`${
                classByStatus[ele?.status.toLowerCase()].numberClasses
              }`}
            >
              {ele?.tableOccupied < 10
                ? `0${ele?.tableOccupied}`
                : ele?.tableOccupied == null
                ? "00"
                : ele?.tableOccupied}
              /
              {ele?.zoneCapacity < 10
                ? `0${ele?.zoneCapacity}`
                : ele?.zoneCapacity}
            </div>
            {ele.status.toLowerCase() !== "empty" &&
              ele.status.toLowerCase() !== "reserved" && (
                <div>
                  <div className="absolute top-3 left-6 text-sm font-[500] text-[#2C62F0]">
                    10:00
                  </div>
                </div>
              )}
            <div className="absolute bottom-2 left-6 capitalize font-semibold text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
              {ele.status}
            </div>

            {ele.status.toLowerCase() !== "empty" &&
              ele.status.toLowerCase() !== "reserved" && (
                <div>
                  <MdOutlineDinnerDining
                    className={`right-[5.5rem] top-6 absolute text-[1rem] opacity-50`}
                  />
                  <div
                    className={`absolute right-20 bottom-6 text-sm font-[500] text-[#2C62F0]`}
                  >
                    {ele?.tableOccupied < 10
                      ? `0${ele?.tableOccupied}`
                      : ele?.tableOccupied == null
                      ? "00"
                      : ele?.tableOccupied}
                    /
                    {ele?.zoneCapacity < 10
                      ? `0${ele?.zoneCapacity}`
                      : ele?.zoneCapacity}
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
      <div className="bg-[#2C62F0] shadow-base-100 fixed bottom-0 z-20 w-full py-2 shadow-lg">
        <div className="flex justify-between mx-6">
          <div>
            <button className="px-4 py-1 text-white transition-colors bg-[#2C62F0] rounded-full focus:bg-white/80 focus:text-[#2C62F0] focus:outline-none">
              <MdOutlineTableRestaurant className="text-[1rem]" />
            </button>

            <div className={`text-sm ml-1 font-normal text-white`}>Tables</div>
          </div>
          <div>
            <button className="px-4 py-1 text-white transition-colors bg-[#2C62F0] rounded-full focus:bg-white/80 focus:text-[#2C62F0] focus:outline-none">
              <MdAutorenew className="text-[1rem]" />
            </button>

            <div className={`text-sm ml-1 font-normal text-white`}>Status</div>
          </div>
          <div>
            <button className="px-4 py-1 text-white transition-colors bg-[#2C62F0] rounded-full focus:bg-white/80 focus:text-[#2C62F0] focus:outline-none">
              <RxBell className="text-[1rem]" />
            </button>

            <div className={`text-sm ml-1 font-normal text-white`}>Alerts</div>
          </div>
          <div>
            <button className="px-4 py-1 text-white transition-colors bg-[#2C62F0] rounded-full focus:bg-white/80 focus:text-[#2C62F0] focus:outline-none">
              <MdOutlineReceiptLong className="text-[1rem]" />
            </button>

            <div className={`text-sm ml-1 font-normal text-white`}>Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
