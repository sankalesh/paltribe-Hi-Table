import HeaderButton from "@/components/atoms/buttons/headerButton";
import Header from "@/components/molecules/header";
import React, { useState, useRef, useEffect } from "react";
import { MdAlarm } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";
import { SiGoogleassistant } from "react-icons/si";
import { MdOutlineDinnerDining, MdOutlinePeopleOutline } from "react-icons/md";
import Footer from "@/components/molecules/footer";
import { HiSearch, HiX } from "react-icons/hi";
import { useRouter } from "next/router";
import axios from "axios";
import HiPalLogo from "../../../../../assets/svg/hipalLogoNew.svg";

import Image from "next/image";
import { useLogin } from "@/components/store/useLogin";
import Link from "next/link";
import { PAGE_TYPES, routePaths } from "@/components/utils/routes";
import { ITable, useTable } from "@/components/store/useTable";

interface IZone {
  businessId: string;
  zoneId: string;
  name: string;
  capacity: number;
  staff: string[];
  status: string;
  activeUser: number;
  time: string;
  totalDishQuantity: number;
  deliverdDish: number;
  id: string;
}

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

const classByStatus: { [key: string]: any } = {
  ["occupied"]: {
    classNames:
      "relative h-[5.75rem] mx-6 mb-4 border border-[#e1e1e1]/50 rounded-xl bg-[#E3EFFF]",
    businessNameClasses:
      "absolute font-[500] capitalize truncate left-6 top-9 w-[50%]",
    tableClasses: "right-8 top-6 absolute text-[1rem] opacity-50",
    numberClasses:
      "absolute right-6 bottom-6 text-sm font-[500] text-[#2C62F0]",
  },
  ["reserved"]: {
    classNames:
      "relative h-[3.75rem]  mx-6 mb-4 border border-[#e1e1e1]/50 rounded-xl bg-gray-200",
    businessNameClasses:
      "absolute font-[500] capitalize truncate left-6 top-2 w-[50%]",
    tableClasses: "right-8 top-2 absolute text-[1rem] opacity-50",
    numberClasses:
      "absolute right-6 bottom-2 text-sm font-[500] text-[#2C62F0]",
  },
  ["empty"]: {
    classNames:
      "relative h-[3.75rem]  mx-6 mb-4 border border-[#e1e1e1]/50 rounded-xl bg-white",
    businessNameClasses:
      "absolute font-[500] capitalize truncate left-6 top-2 w-[50%]",
    tableClasses: "right-8 top-2 absolute text-[1rem] opacity-50",
    numberClasses:
      "absolute right-6 bottom-2 text-sm font-[500] text-[#2C62F0]",
  },
  ["activate"]: {
    classNames:
      "relative h-[5.75rem] mx-6 mb-4 border border-[#e1e1e1]/50 rounded-xl bg-[#DBFFE2]",
    businessNameClasses:
      "absolute font-[500] capitalize truncate left-6 top-9 w-[50%]",
    tableClasses: "right-8 top-6 absolute text-[1rem] opacity-50",
    numberClasses:
      "absolute right-6 bottom-6 text-sm font-[500] text-[#2C62F0]",
  },
  ["settled"]: {
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

function Table() {
  const [zoneData, setZoneData] = useState<IZone[]>([]);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const searchRef = useRef(null);
  const userDetails = useLogin((s) => s.userDetails);
  const kitchenId = useLogin((s) => s.kitchenId);
  const setKitchenId = useLogin((s) => s.setKitchenId);
  const setTableData = useTable((s) => s.setTableData);
  const tableData = useTable((s) => s.tableData);
  console.log(tableData);

  const router = useRouter();

  const { businessId, zoneId } = router.query as {
    businessId: string;
    zoneId: string;
  };

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
    console.log(str);

    if (str.length > 0) {
      setZoneData(
        zoneData.filter(
          (ele) => ele?.status?.toLowerCase() === str?.toLowerCase()
        )
      );
      return;
    }
    // setZoneData(zoneData);
    result();
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
  useEffect(() => {
    result();
  }, []);

  const result = async () => {
    const response = await axios.get(
      `https://api.hipal.life/v1/zones/${zoneId}/tables/ByWaiter?businessId=${businessId}&staffId=${userDetails?.id}`
    );
    const res = await response.data;
    console.log(res);
    setZoneData(res);

    const kitchen = await axios.get(
      `https://api.hipal.life/v1/kitchens?businessId=${businessId}`
    );
    const kitchenData = await kitchen.data;
    const id = kitchenData.map((ele: any) => ele.id) as string;
    setKitchenId(id.toString());
  };
  const handleTableClick = (tableData:any) => {
    setTableData(tableData);
  };

  const searchData: IZone[] = zoneData.filter(
    (ele) =>
      ele?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
      ele?.status?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <div className="bg-[#f5f5f5] pb-6 min-h-screen relative">
      <Header>
        <Image
          className="mr-6"
          width={68}
          height={25}
          src={HiPalLogo}
          alt="Hi Table Logo"
        />
      </Header>
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
              <Link
                key={ele.id + zoneId + "search" + index}
                href={`${routePaths[PAGE_TYPES.SINGLE_TABLE](
                  businessId,
                  zoneId,
                  ele?.id
                )}`}
                passHref
              >
                <div
                 onClick={() => handleTableClick(ele)}
                  className={`${
                    classByStatus[ele?.status?.toLowerCase()]?.classNames
                  }`}
                >
                  <div
                    className={`${
                      classByStatus[ele?.status?.toLowerCase()]
                        ?.businessNameClasses
                    }`}
                  >
                    {ele.name}
                  </div>
                  <MdOutlinePeopleOutline
                    className={`${
                      classByStatus[ele?.status?.toLowerCase()]?.tableClasses
                    }`}
                  />
                  <div
                    className={`${
                      classByStatus[ele?.status?.toLowerCase()]?.numberClasses
                    }`}
                  >
                    {ele?.activeUser < 10
                      ? `0${ele?.activeUser}`
                      : ele?.activeUser == null
                      ? "00"
                      : ele?.activeUser}
                    /{ele?.capacity < 10 ? `0${ele?.capacity}` : ele?.capacity}
                  </div>
                  {ele?.status?.toLowerCase() !== "empty" &&
                    ele?.status?.toLowerCase() !== "reserved" &&
                    ele?.status?.toLowerCase() !== "occupied" && (
                      <div>
                        <div className="absolute top-3 left-6 text-sm font-[500] text-[#2C62F0]">
                          {ele?.time ? ele?.time : "10.00"}
                        </div>
                      </div>
                    )}
                  <div className="absolute bottom-2 left-6 capitalize font-normal text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
                    {ele.status}
                  </div>

                  {ele?.status?.toLowerCase() !== "empty" &&
                    ele?.status?.toLowerCase() !== "reserved" &&
                    ele?.status?.toLowerCase() !== "occupied" && (
                      <div>
                        <MdOutlineDinnerDining
                          className={`right-[5.5rem] top-6 absolute text-[1rem] opacity-50`}
                        />
                        <div
                          className={`absolute right-20 bottom-6 text-sm font-[500] text-[#2C62F0]`}
                        >
                          {ele?.activeUser < 10
                            ? `0${ele?.activeUser}`
                            : ele?.activeUser == null
                            ? "00"
                            : ele?.activeUser}
                          /
                          {ele?.capacity < 10
                            ? `0${ele?.capacity}`
                            : ele?.capacity}
                        </div>
                      </div>
                    )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            {zoneData.map((ele, index) => (
              <Link
                key={ele.id + zoneId + "zone" + index}
                href={`${routePaths[PAGE_TYPES.SINGLE_TABLE](
                  businessId,
                  zoneId,
                  ele?.id
                )}`}
                passHref
              >
                <div
                  key={index}
                  onClick={() => handleTableClick(ele)}
                  className={`${
                    classByStatus[ele?.status?.toLowerCase()]?.classNames
                  }`}
                >
                  <div
                    className={`${
                      classByStatus[ele?.status?.toLowerCase()]
                        ?.businessNameClasses
                    }`}
                  >
                    {ele.name}
                  </div>
                  <MdOutlinePeopleOutline
                    className={`${
                      classByStatus[ele?.status?.toLowerCase()]?.tableClasses
                    }`}
                  />
                  <div
                    className={`${
                      classByStatus[ele?.status?.toLowerCase()]?.numberClasses
                    }`}
                  >
                    {ele?.activeUser < 10
                      ? `0${ele?.activeUser}`
                      : ele?.activeUser == null
                      ? "00"
                      : ele?.activeUser}
                    /{ele?.capacity < 10 ? `0${ele?.capacity}` : ele?.capacity}
                  </div>
                  {ele?.status.toLowerCase() !== "empty" &&
                    ele?.status.toLowerCase() !== "reserved" && (
                      <div>
                        <div className="absolute top-3 left-6 text-sm font-[500] text-[#2C62F0]">
                          10:00
                        </div>
                      </div>
                    )}
                  <div className="absolute bottom-2 left-6 capitalize font-semibold text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
                    {ele?.status}
                  </div>

                  {ele?.status.toLowerCase() !== "empty" &&
                    ele?.status.toLowerCase() !== "reserved" && (
                      <div>
                        <MdOutlineDinnerDining
                          className={`right-[5.5rem] top-6 absolute text-[1rem] opacity-50`}
                        />
                        <div
                          className={`absolute right-20 bottom-6 text-sm font-[500] text-[#2C62F0]`}
                        >
                          {ele?.activeUser < 10
                            ? `0${ele?.activeUser}`
                            : ele?.activeUser == null
                            ? "00"
                            : ele?.activeUser}
                          /
                          {ele?.capacity < 10
                            ? `0${ele?.capacity}`
                            : ele?.capacity}
                        </div>
                      </div>
                    )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Table;
