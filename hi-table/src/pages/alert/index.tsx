import HeaderButton from "@/components/atoms/buttons/headerButton";
import Footer from "@/components/atoms/footer";
import Assistance from "@/components/atoms/status/assistance";
import Clean from "@/components/atoms/status/clean";
import Cooked from "@/components/atoms/status/cooked";
import Paid from "@/components/atoms/status/paid";
import Header from "@/components/molecules/header";
import React, { useState } from "react";
import { BiBowlRice } from "react-icons/bi";
import { HiSearch, HiX } from "react-icons/hi";
import { MdAlarm } from "react-icons/md";
import { SiGoogleassistant } from "react-icons/si";
import { TbToolsKitchen2 } from "react-icons/tb";

function Alert() {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // const buttonProps = {
  //   onClick: () => {
  //     console.log("u clicked the button");
  //   },
  // };

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

  return (
    <div className="bg-[#f5f5f5] pb-20 relative">
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
            onClick={searchClick}
            className={`${
              searchOpen
                ? "w-[100%] transition-all duration-300 mb-6"
                : "w-[30%] disabled"
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
                // value={search}
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
          className={` sticky flex justify-between pb-6 mx-6 mt-6 ${
            searchOpen ? "hidden" : ""
          } `}
        >
          <HeaderButton>
            <MdAlarm className="mt-1 mr-1 -ml-1 text-[#2C62F0]" />
            Payments
          </HeaderButton>
          <HeaderButton>
            <TbToolsKitchen2 className="mt-1 mr-1 -ml-1 text-[#2C62F0]" />
            Kitchen
          </HeaderButton>
          <HeaderButton>
            <SiGoogleassistant className="mt-1 mr-1 -ml-1 text-[#2C62F0]" />
            Assistance
          </HeaderButton>
        </div>
      </div>

      <div className="space-y-4">
        <Cooked />
        <Assistance />
        <Clean />
        <Paid />
        <Cooked />
        <Assistance />
        <Clean />
        <Paid />
        <Cooked />
        <Assistance />
        <Clean />
        <Paid />
      </div>
      <Footer />
    </div>
  );
}

export default Alert;
