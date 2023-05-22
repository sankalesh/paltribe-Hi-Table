import HeaderButton from "@/components/atoms/buttons/headerButton";
import Header from "@/components/molecules/header";
import React, { useEffect, useState } from "react";
import { MdAlarm } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";
import { SiGoogleassistant } from "react-icons/si";
import Footer from "@/components/molecules/footer";
import { HiSearch, HiX } from "react-icons/hi";
import { GiCampCookingPot } from "react-icons/gi";
import { BiBowlRice } from "react-icons/bi";
import Modal from "@/components/molecules/popup";
import Popup from "@/components/molecules/popup";
import HiPalLogo from "../../../../assets/svg/hipalLogoNew.svg";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { IStatus } from "@/components/types/hiTableData";

function Status() {
  const [filterClicked, setFilterClicked] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [statusData, setStatusData] = useState<IStatus[]>([]);
  const router = useRouter();
  

  const { businessId } = router.query as { businessId: string };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    if (str.length > 0) {
      setStatusData(
        statusData?.map((ele, i) => {
              const kot = ele[0];
              return ele?.filter((k) => k?.dishStatus.toLowerCase() === str.toLowerCase());
            })
      );
      return;
    }
    getAllStatusData()
    setStatusData(statusData);
  };

  const headerButton = [
    {
      Icon: MdAlarm,
      text: "Delayed",
    },
    {
      Icon: TbToolsKitchen2,
      text: "Cooked",
    },
    {
      Icon: SiGoogleassistant,
      text: "Cooking",
    },
  ];
  const statusButtons = [
    {
      Icon: BiBowlRice,
      status: "Delivered",
      textColour: "#00BA34",
    },
    {
      Icon: TbToolsKitchen2,
      status: "cooked",
      textColour: "#5591FF",
    },
    {
      Icon: GiCampCookingPot,
      status: "cooking",
      textColour: "#00BA34",
    },
  ];

  useEffect(() => {
    getAllStatusData();
  }, []);

  async function getAllStatusData() {
    const response = await axios.get(
      `https://api.hipal.life/v1/kitchens/6461cf5d4726205e689e1471/getAllKotByWaiter/all?businessId=${businessId}&staffId=5`
    );
    const data = response.data;
    setStatusData(data);
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-6 relative">
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
          {headerButton.map((ele, i) => (
            <HeaderButton
              key={i}
              className={
                activeButton === ele.text
                  ? "bg-blue-500 focus:font-[500] focus:rounded-full focus:text-[#2C62F0] focus:btn-[#2C62F0]/10 "
                  : ""
              }
              onClick={() => handleOnclick(ele.text)}
            >
              <ele.Icon className="mt-1 mr-1 -ml-1 text-[#2C62F0]" />
              {ele.text}
            </HeaderButton>
          ))}
        </div>
      </div>

      <div className="mb-[5rem]">
        {statusData.map((ele, i) => {
          // Get the first element from the current sub-array
          const kot = ele[0];

          return ( 
            <div>
              {ele.dishStatus !== "" && <div key={ele?.id} className="mx-6 mb-6 bg-white rounded-2xl">
              <div className="flex justify-between pt-4 mx-4">
                <div className="flex flex-col">
                  <div className="font-[500] capitalize">T-{i}</div>
                  <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                    {kot?.customerName}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-right text-md font-[500] text-[#2C62F0]">
                    {kot?.kotTime}
                  </div>
                  <div className="capitalize font-normal mt-1 text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
                    {kot?.date}
                  </div>
                </div>
              </div>

              <div className="mx-4 mt-4 border-2 rounded-full border-gray-400/30"></div>
              {ele?.map((kot) => (
                <div>
                  <div className="flex justify-between mx-4 mt-4">
                    <div className="w-[10%] font-[500]">{kot?.dish?.qty} x</div>
                    <div className="w-[60%] -ml-4 font-[500]">
                      {kot?.dish?.name}
                      <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                        {kot?.dish?.portions?.name}
                      </div>
                      <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                        {kot?.dish?.extras?.map((extra) => extra?.name + ", ")}
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
                  {kot?.dishStatus === "delivered" ? (
                    <div className="py-4 mx-4">
                      <button className="font-normal relative px-2 text-black rounded-full bg-[#DBFFE2]">
                        <div className="inline-flex items-center justify-start">
                          <div className="w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#00BA34] rounded-full">
                            <BiBowlRice className="mt-1 ml-1 text-white" />
                          </div>
                          <div className="mb-[0.1rem] capitalize font-[500] text-lg text-[#00BA34]/80 pr-1 pl-1 ml-6 mr-4">
                            {kot?.dishStatus} x 1
                          </div>
                        </div>
                      </button>
                    </div>
                  ) : kot?.dishStatus === "cooked" ? (
                    <div className="py-4 mx-4">
                      <button className="font-normal relative px-2 text-black rounded-full bg-[#E0EBFF]">
                        <div className="inline-flex items-center justify-start">
                          <div className="w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#5591FF] rounded-full">
                            <BiBowlRice className="mt-1 ml-1 text-white" />
                          </div>
                          <div className="mb-[0.1rem] capitalize font-[500] text-lg text-[#5591FF]/80 pr-1 pl-1 ml-6 mr-4">
                            {kot?.dishStatus} x 1
                          </div>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="py-4 mx-4">
                      <button className="font-normal relative px-2 text-black rounded-full bg-[#FFF6DB]">
                        <div className="inline-flex items-center justify-start">
                          <div className="w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#FFC318] rounded-full">
                            <BiBowlRice className="mt-1 ml-1 text-white" />
                          </div>
                          <div className="mb-[0.1rem] capitalize font-[500] text-lg text-[#FFC318]/80 pr-1 pl-1 ml-6 mr-4">
                            {kot?.dishStatus} x 1
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                  <div className="mx-4 border-b border-dashed"></div>
                </div>
              ))}
            </div>}
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default Status;
