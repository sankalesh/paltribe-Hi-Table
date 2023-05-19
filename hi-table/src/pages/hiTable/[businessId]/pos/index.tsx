import Dropdown from "@/components/atoms/dropDown";
import Menu from "@/components/organisms/category/childCategory";
import Header from "@/components/molecules/header";
import MenuPopup from "@/components/molecules/menuPopup";
import Popup from "@/components/molecules/popup";
import React, { memo, useEffect, useState } from "react";
import { BiBowlRice } from "react-icons/bi";
import { HiSearch, HiX } from "react-icons/hi";
import {
  MdOutlineCategory,
  MdOutlineFeed,
  MdOutlineWidgets,
} from "react-icons/md";
import { RiCalendarCheckFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import ChildCategory from "@/components/organisms/category/childCategory";
import ParentCategory from "@/components/organisms/category/parentCategory";
import axios from "axios";
import { useRouter } from "next/router";
import { ICategory, IChildCategory } from "@/components/types/hiTableData";

const headerButton = [
  {
    text: "Status",
    Icon: RiCalendarCheckFill,
  },
  {
    text: "POS",
    Icon: MdOutlineCategory,
  },
  {
    text: "Settle",
    Icon: MdOutlineFeed,
  },
];

function POS() {
  const [activeButton, setActiveButton] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [childCategory, setChildCategory] = useState<IChildCategory[]>([]);
  const [parentCategory, setParentCategory] = useState<ICategory[]>([]);

  const router = useRouter();
  const { businessId } = router.query as { businessId: string };

  useEffect(() => {
    getAllChildCategories();
  }, []);

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

  const handleOnClick = (str: string) => {
    // str = activeButton.length === 0 ? str : "";
    if (str.toLowerCase() === "pos") {
      getAllChildCategories();
    }
    setActiveButton(str);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function getAllChildCategories() {
    const result = await axios.get(
      `https://api.hipal.life/v1/categories/get/allChildCategory/?businessId=${businessId}`
    );
    const result2 = await axios.get(
      `https://api.hipal.life/v1/categories/get/allParentAndChild?businessId=${businessId}`
    );
    const ChildCategories = await result.data.data;
    const ParentCategories = await result2.data.data;

    setChildCategory(ChildCategories);
    setParentCategory(ParentCategories);
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header>
        <div className="font-bold capitalize mr-4 text-[#002D4B] text-xl">
          T-21
        </div>
      </Header>
      <div
        className={`${
          activeButton.toLowerCase() === "status" ||
          activeButton.toLowerCase() === "settle" ||
          activeButton.toLowerCase() === ""
            ? "hidden"
            : ""
        } flex`}
      >
        <div className={`mt-6 mx-6 w-[100%]`}>
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
              onClick={searchClick}
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
        {/* <Dropdown /> */}
      </div>

      <div className="flex items-center justify-between p-4 mx-6 mt-6 bg-white rounded-full">
        {headerButton.map((ele, i) => (
          <>
            <div
              key={i}
              onClick={() => handleOnClick(ele.text)}
              className="flex items-center justify-center px-2"
            >
              <ele.Icon
                className={`text-2xl  ${
                  activeButton.toLowerCase() === ele.text.toLowerCase()
                    ? "text-[#2C62F0]"
                    : "text-[#002D4B]/60"
                }`}
              />
              <p
                className={` text-[0.875rem] ml-2 leading-[1rem] ${
                  activeButton.toLowerCase() === ele.text.toLowerCase()
                    ? "text-[#2C62F0] font-[500]"
                    : "text-[#002D4B]/60 font-normal"
                }`}
              >
                {ele.text}
              </p>
            </div>
            <div>
              {i !== headerButton.length - 1 && (
                <div className="h-6 mx-4 border-l border-r border-gray-400"></div>
              )}
            </div>
          </>
        ))}
      </div>
      {activeButton.toLowerCase() === "status" && (
        <div className="bg-white mx-6 rounded-2xl mt-6 mb-[5rem]">
          <div className="flex justify-between pt-4 mx-4">
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
          <div className="mx-4 mt-4 border-2 rounded-full border-gray-400/50"></div>
          <div>
            <div className="flex justify-between mx-4 mt-4">
              <div className="w-[10%] font-[500]">11 x</div>
              <div className="w-[60%] -ml-4 font-[500]">
                Chicken Peri Sandwich With Extra Sauce
                <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                  sankalesh ashok harak sasa kiasajs
                </div>
                <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                  Harak
                </div>
              </div>
              <div
                className="w-[15%] text-right text-md font-[500] text-[#2C62F0] "
                onClick={openModal}
              >
                Status
              </div>
              <Popup show={isModalOpen} onClose={closeModal}>
                <div className="relative">
                  <div className="capitalize font-[500] ml-6 mt-4 text-[#002D4B] text-[1rem] leading-[1.25rem]">
                    T-001
                  </div>
                  <div className="mt-4 border border-b-dashed"></div>
                </div>
              </Popup>
            </div>
            <div className="py-4 mx-4">
              <button
                className={`font-normal relative px-2 text-black rounded-full bg-[#DBFFE2]`}
              >
                <div className="inline-flex items-center justify-start">
                  <div
                    className={`w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#00BA34] rounded-full`}
                  >
                    <BiBowlRice className="mt-1 ml-1 text-white" />
                  </div>
                  <div className="mb-[0.1rem] font-[500] text-lg text-[#00BA34]/80 pr-1 pl-1 ml-6 mr-4">
                    Delivered x 1
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="mx-4 border-b border-dashed"></div>
          <div>
            <div className="flex justify-between mx-4 mt-4">
              <div className="w-[10%] font-[500]">11 x</div>
              <div className="w-[60%] -ml-4 font-[500]">
                Chicken Peri Sandwich With Extra Sauce
                <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                  sankalesh ashok harak sasa kiasajs
                </div>
                <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                  Harak
                </div>
              </div>
              <div className="w-[15%] text-right text-md font-[500] text-[#2C62F0]">
                Status
              </div>
            </div>
            <div className="py-4 mx-4">
              <button
                className={`font-normal relative px-2 text-black rounded-full bg-[#DBFFE2]`}
              >
                <div className="inline-flex items-center justify-start">
                  <div
                    className={`w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#00BA34] rounded-full`}
                  >
                    <BiBowlRice className="mt-1 ml-1 text-white" />
                  </div>
                  <div className="mb-[0.1rem] font-[500] text-lg text-[#00BA34]/80 pr-1 pl-1 ml-6 mr-4">
                    Delivered x 1
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      {activeButton.toLowerCase() === "pos" && (
        <div className="">
          <ChildCategory childCategories={childCategory} />
          {!isModalOpen ? (
            <div
              onClick={openModal}
              className={` bg-[#2C62F0] fixed bottom-6 left-1/2 transition-all duration-500 transform -translate-x-1/2 text-white flex items-center justify-center py-2 px-6 rounded-2xl`}
            >
              <MdOutlineWidgets className="mr-2 text-2xl " />
              <div className="text-lg font-[500]">Menu</div>
            </div>
          ) : (
            <div
              className={` bg-white z-50 fixed bottom-12 left-1/2 transition-all duration-700 transform -translate-x-1/2 text-white flex items-center justify-center p-6 rounded-full`}
              onClick={closeModal}
            >
              <div className="flex flex-row m-auto">
                <RxCross2 className="text-3xl text-[#2C62F0] " />
              </div>
            </div>
          )}

          <MenuPopup show={isModalOpen} onClose={closeModal}>
            <div className="relative h-[25rem]">
              <div className="fixed top-0 left-0 right-0 px-4 py-2 capitalize font-[500] ml-2 mt-2 text-[#002D4B] text-[1rem] leading-[1.25rem] bg-white">
                Category
              </div>
              <div className="absolute inset-0 pb-4 overflow-y-auto top-12">
                <ParentCategory parentCategory={...parentCategory} />
              </div>
            </div>
          </MenuPopup>
        </div>
      )}
      {activeButton.toLowerCase() === "settle" && <div>Sayonara settle</div>}
    </div>
  );
}

export default POS;
