import HeaderButton from "@/components/atoms/buttons/headerButton";
import Header from "@/components/molecules/header";
import React, { useState,useRef,useEffect  } from "react";
import { MdAlarm } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";
import { SiGoogleassistant } from "react-icons/si";
import { MdOutlineDinnerDining, MdOutlinePeopleOutline } from "react-icons/md";
import Footer from "@/components/atoms/footer";
import { HiSearch, HiX } from "react-icons/hi";

interface IZone  {
  zoneName?: string;
  zoneCapacity?: number;
  tableOccupied?: number;
  status?: string;
};

const zones : IZone[]= [
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
const filterButtons = [
  {
    name: "occupied",
    Icon: MdAlarm,
    text: "Occupied",
  },
  {
    name: "Empty",
    Icon: TbToolsKitchen2,
    text: "Empty",
  },
  {
    name: "Need Assistance",
    Icon: SiGoogleassistant,
    text: "Assistant",
  },
];

function Table() {
  const [zoneData, setZoneData] = useState<IZone[]>(zones);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const searchRef = useRef(null);

  const popOver = (search = "") => {
    if (search.length > 0) {
      if (!searchOpen) {
        setSearchOpen(true);
      }
    } else {
      setSearchOpen(false);
    }
  };

  const searchClick = () => {
    setSearchOpen(!searchOpen);
    setSearch("");
  };

  const handleOnclick = (str: any) => {
    str = activeButton.length === 0 ? str : "";
    setActiveButton(str);

     if (str.length > 0) {
      setZoneData(
        zones.filter(
          (ele) => ele?.status?.toLowerCase() === str?.toLowerCase()
        )
      );
      return;
    }
    setZoneData(zones);
  };

  // const handleClickOutside = (event:any) => {
  //   if (!searchRef?.current?.contains(event.target)) {
  //     console.log("this is search ref", !searchRef?.current?.contains(event.target));
  //     // setSearchOpen(false);
  //     // setSearch("");
  //     document?.activeElement?.blur(); // hides the keyboard on mobile devices
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleClickOutside);
  //   return () => {
  //     window.removeEventListener("scroll", handleClickOutside);
  //   };
  // }, []);

  const classByStatus = {
    occupied: {
      classNames:
        "relative h-[5.75rem] mx-6 mb-4 border border-[#e1e1e1]/50 rounded-xl bg-[#E3EFFF]",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-9 w-[50%]",
      tableClasses: "right-8 top-6 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-6 text-sm font-[500] text-[#2C62F0]",
    },
    reserved: {
      classNames:
        "relative h-[3.75rem]  mx-6 mb-4 border border-[#e1e1e1]/50 rounded-xl bg-gray-200",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-2 w-[50%]",
      tableClasses: "right-8 top-2 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-2 text-sm font-[500] text-[#2C62F0]",
    },
    empty: {
      classNames:
        "relative h-[3.75rem]  mx-6 mb-4 border border-[#e1e1e1]/50 rounded-xl bg-[#DBFFE2]",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-2 w-[50%]",
      tableClasses: "right-8 top-2 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-2 text-sm font-[500] text-[#2C62F0]",
    },
    settled: {
      classNames:
        "relative h-[5.75rem] mx-6 mb-4 border border-[#e1e1e1]/50 rounded-xl bg-[#FFF3D3]",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-9 w-[50%]",
      tableClasses: "right-8 top-6 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-6 text-sm font-[500] text-[#2C62F0]",
    },
    ["need assistance"]: {
      classNames:
        "relative h-[5.75rem]  mx-6 mb-4 border border-[#e1e1e1]/50 rounded-xl bg-[#FFE5E5]",
      businessNameClasses:
        "absolute font-[500] capitalize truncate left-6 top-9 w-[50%]",
      tableClasses: "right-8 top-6 absolute text-[1rem] opacity-50",
      numberClasses:
        "absolute right-6 bottom-6 text-sm font-[500] text-[#2C62F0]",
    },
  };
  const searchData = zoneData.filter(
    (ele) =>
      ele?.zoneName?.toLowerCase()?.includes(search?.toLowerCase()) ||
      ele?.status?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <div className="bg-[#f5f5f5] pb-6 min-h-screen relative">
      <Header />
      <div className="sticky top-0 z-50 bg-[#f5f5f5]">
        <div className="flex justify-between">
          <div
            className={`${
              searchOpen ? "hidden" : ""
            } ml-6 mt-8 font-bold capitalize text-[#002D4B] text-[1rem] leading-[1.25rem]`}
          >
            Platinum
          </div>
          <div 
          ref={searchRef}
            onClick={searchClick}
            className={`${
              searchOpen ? "w-[100%] mb-6" : "w-[30%] disabled"
            } mt-6 mx-6 `}
          >
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              {searchOpen ? (
                <HiX className="absolute inset-y-0 w-4 h-4 text-[#2C62F0]/80 dark:text-[#2C62F0] flex items-center pointer-events-none top-[0.625rem] right-2" />
              ) : (
                <HiSearch className="absolute inset-y-0 w-4 h-4 text-[#2C62F0]/80 dark:text-[#2C62F0] flex items-center pointer-events-none top-[0.625rem] right-2" />
              )}
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                  popOver(e.target.value);
                }}
                value={search}
                type="text"
                id="simple-search"
                className="border  border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-[#2C62F0] block w-full pl-4 p-1.5"
                placeholder="Search"
                required
              />
            </div>
          </div>
        </div>
        <div
          className={`${
            searchOpen ? "hidden" : ""
          } sticky flex justify-between pb-6 mx-6 mt-6`}
        >
          {filterButtons.map(({ name, Icon, text }, index) => (
            
            <HeaderButton
              onClick={() => handleOnclick(name)}
              key={index}
              className={
                activeButton === name
                  ? "bg-blue-500 focus:font-[500] focus:rounded-full focus:text-[#2C62F0] focus:bg-[#2C62F0]/10 "
                  : ""
              }
            >
              <Icon className="mt-1 mr-1 -ml-1 text-[#2C62F0]" />
              {text}
            </HeaderButton>
          ))}
        </div>
      </div>
      <div className="mb-[4rem]">
        {searchData.length > 0 ? (
          <div>
            {searchData.map((ele, index) => (
              <div
                key={index}
                className={`${
                  classByStatus[ele?.status?.toLowerCase()]?.classNames
                }`}
              >
                <div
                  className={`${
                    classByStatus[ele?.status?.toLowerCase()].businessNameClasses
                  }`}
                >
                  {ele.zoneName}
                </div>
                <MdOutlinePeopleOutline
                  className={`${
                    classByStatus[ele?.status?.toLowerCase()].tableClasses
                  }`}
                />
                <div
                  className={`${
                    classByStatus[ele?.status?.toLowerCase()].numberClasses
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
                {ele?.status?.toLowerCase() !== "empty" &&
                  ele?.status?.toLowerCase() !== "reserved" && (
                    <div>
                      <div className="absolute top-3 left-6 text-sm font-[500] text-[#2C62F0]">
                        10:00
                      </div>
                    </div>
                  )}
                <div className="absolute bottom-2 left-6 capitalize font-normal text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
                  {ele.status}
                </div>

                {ele?.status?.toLowerCase() !== "empty" &&
                  ele?.status?.toLowerCase() !== "reserved" && (
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
        ) : searchData.length == 0 ? (
          <div className="text-center text-[2rem] bg-[#f5f5f5] h-screen mt-[4rem]">
            There are no Tables
          </div>
        ) : (
          <div>
            {zoneData.map((ele: any, index) => (
              <div
                key={index}
                className={`${
                  classByStatus[ele?.status?.toLowerCase()]?.classNames
                }`}
              >
                <div
                  className={`${
                    classByStatus[ele?.statu?.toLowerCase()].businessNameClasses
                  }`}
                >
                  {ele.zoneName}
                </div>
                <MdOutlinePeopleOutline
                  className={`${
                    classByStatus[ele?.status?.toLowerCase()].tableClasses
                  }`}
                />
                <div
                  className={`${
                    classByStatus[ele?.status?.toLowerCase()].numberClasses
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
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Table;
