import HeaderButton from "@/components/atoms/buttons/headerButton";
import Footer from "@/components/molecules/footer";
import Assistance from "@/components/atoms/status/assistance";
import Clean from "@/components/atoms/status/clean";
import Cooked from "@/components/atoms/status/cooked";
import Paid from "@/components/atoms/status/paid";
import Header from "@/components/molecules/header";
import React, { useEffect, useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { MdCreditCard } from "react-icons/md";
import { SiGoogleassistant } from "react-icons/si";
import { TbToolsKitchen2 } from "react-icons/tb";
import { ImStopwatch } from "react-icons/im";
import Image from "next/image";
import HiPalLogo from "../../../../assets/svg/hipalLogoNew.svg";
import { useRouter } from "next/router";
import axios from "axios";

const filterButtons = [
  {
    name: "paid",
    Icon: MdCreditCard,
    text: "Payments",
  },
  {
    name: "cooked",
    Icon: TbToolsKitchen2,
    text: "Kitchen",
  },
  {
    name: "assist",
    Icon: SiGoogleassistant,
    text: "Assistance",
  },
];

interface IAlertData {
  businessId: string;
  tableName: string;
  tableId: string;
  staffId: string;
  status: string;
  time: string;
  message: string;
  isAlertOn: boolean;
  id: string;
}
const guitarSound = new Audio("/sounds/hotel_bell.mp3");

function Alert() {
  const [data, setData] = useState<IAlertData[]>([]);
  const [historyData, setHistoryData] = useState<IAlertData[]>([]);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const router = useRouter();
  const { businessId } = router.query as { businessId: string };

  const handleOnclick = (str: string) => {
    str = activeButton.length === 0 ? str : "";
    setActiveButton(str);
    if (str.length > 0) {
      setData(
        data.filter((ele) => ele.status.toLowerCase() === str.toLowerCase())
      );
      return;
    }
    onAlertData();
  };

  const handleItemClick = async (alertId: string) => {
      const response = await axios.put(
        `https://api.hipal.life/v1/kitchens/updateAlert/alert?alertId=${alertId}&businessId=64631183bdc46e36e2e2e1e9`
      );
      onAlertData();
      offAlertData();
  };

  const historyOnClick = () => {
    setShowHistory(!showHistory);
  };
  // const historyOnClick = () => {
  //   async function alertData() {
  //     const response = await axios.get(
  //       `https://api.hipal.life/v1/kitchens/get/AllAlertByWaiter?waiterId=5&businessId=${businessId}&isAlertOn=true`
  //     );
  //     const data = await response.data;
  //     console.log(data);
  //     setData(data);
  //   }
  //   alertData();
  //   setShowHistory(!showHistory);
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
  useEffect(() => {
    if (data.length > 0) {
      playGuitarSound();
    }
  }, []);

  const searchData = data.filter(
    (ele) =>
      ele?.message?.toLowerCase().includes(search.toLowerCase()) ||
      ele?.tableName?.toLowerCase().includes(search.toLowerCase()) ||
      ele?.status?.toLowerCase().includes(search.toLowerCase())
  );
  function playGuitarSound() {
    guitarSound.play();
  }

  useEffect(() => {
    onAlertData();
    offAlertData();
  }, []);
  async function onAlertData() {
    const response = await axios.get(
      `https://api.hipal.life/v1/kitchens/get/AllAlertByWaiter?waiterId=5&businessId=${businessId}&isAlertOn=true`
    );
    const data = await response.data;
    console.log('datta');
    setData(data);
  }
  async function offAlertData() {
    const response = await axios.get(
      `https://api.hipal.life/v1/kitchens/get/AllAlertByWaiter?waiterId=5&businessId=${businessId}&isAlertOn=false`
    );
    const data = await response.data;
    console.log('datta');
    setHistoryData(data);
  }

  return (
    <div className={` bg-[#f5f5f5] min-h-screen pb-20 relative`}>
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
        <div className="flex justify-between pb-6">
          <div
            className={`${
              searchOpen ? "hidden" : ""
            } ml-6 mt-8 font-bold capitalize text-[#002D4B] text-[1rem] leading-[1.25rem]`}
          >
            Alerts
          </div>
          <div
            onClick={historyOnClick}
            className={` ${searchOpen ? "hidden" : ""} ${
              showHistory ? "bg-[#2C62F0] text-white" : ""
            } w-8 ml-[8rem] border -mr-4 h-8 mt-6 border-gray-300 text-sm rounded-xl`}
          >
            <ImStopwatch
              className={`${
                showHistory ? "text-white" : "text-[#2C62F0]"
              } focus:bg-[#2C62F0] mt-2 ml-2`}
            />
          </div>
          <div
            className={`${
              searchOpen ? "w-[100%] transition-all mb-6" : "w-[30%] disabled"
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
        </div>
        <div
          className={` sticky flex justify-between pb-6 mx-6 ${
            searchOpen ? "hidden" : ""
          } ${showHistory ? "hidden" : ""} `}
        >
          {filterButtons.map(({ name, Icon, text }, index) => (
            <HeaderButton
              className={
                activeButton === name
                  ? "bg-blue-500 focus:font-[500] focus:rounded-full focus:text-[#2C62F0] focus:bg-[#2C62F0]/10 "
                  : ""
              }
              onClick={() => handleOnclick(name)}
              key={index}
            >
              <Icon className="mt-1 mr-1 -ml-1 text-[#2C62F0]" />
              {text}
            </HeaderButton>
          ))}
        </div>
      </div>

      <div className="space-y-4 bg-[#f5f5f5]">
        {!searchOpen &&
          !showHistory &&
          data.map((ele, index) =>
            ele.status.toLowerCase() === "paid" ? (
              <div
                key={`paid-${index}`}
                onClick={() => handleItemClick(ele.id)}
              >
                <Paid {...ele} />
              </div>
            ) : ele.status.toLowerCase() === "cooked" ? (
              <div
                key={`cooked-${ele.id}`}
                onClick={() => handleItemClick(ele.id)}
              >
                <Cooked {...ele} />
              </div>
            ) : ele.status.toLowerCase() === "need assistance" ? (
              <div
                key={`assist-${ele.id}`}
                onClick={() => handleItemClick(ele.id)}
              >
                <Assistance {...ele} />
              </div>
            ) : (
              <div
                key={`clean-${ele.id}`}
                onClick={() => handleItemClick(ele.id)}
              >
                <Clean {...ele} />
              </div>
            )
          )}

        {searchOpen &&
          !showHistory &&
          search !== "" &&
          searchData.map((ele, index) =>
            ele.status.toLowerCase() === "paid" ? (
              <div key={`paid-${index}`}>
                <Paid {...ele} />
              </div>
            ) : ele.status.toLowerCase() === "cooked" ? (
              <div key={`cooked-${index}`}>
                <Cooked {...ele} />
              </div>
            ) : ele.status.toLowerCase() === "Need assistance" ? (
              <div key={`assist-${index}`}>
                <Assistance {...ele} />
              </div>
            ) : (
              <div key={`clean-${index}`}>
                <Clean {...ele} />
              </div>
            )
          )}
        {showHistory &&
          !searchOpen &&
          historyData.map((ele, index) => (
            <div
              key={index}
              className="mx-6 relative bg-gray-200 h-[4.75rem] rounded-xl"
            >
              <div className="font-bold capitalize text-[#002D4B] text-[1rem] leading-[1.25rem] absolute left-4 top-4">
                {ele?.tableName?"":"T001"}
              </div>
              <div className="font-normal text-[#002D4B]/40 text-[0.875rem] leading-[1rem] absolute right-4 top-4">
                {ele?.time}
              </div>
              <div className="font-normal w-[80%] text-[#002D4B]/40 text-[0.875rem] leading-[1rem] absolute left-4 top-10">
                {ele?.message}
              </div>
              <div className="font-normal text-[#002D4B]/40 text-[0.875rem] leading-[1rem] absolute right-4 top-10">
                {ele?.status}
              </div>
            </div>
          ))}
        {showHistory &&
          searchOpen &&
          search !== "" &&
          data.map((ele, index) => (
            <div
              key={index}
              className="mx-6 relative bg-gray-200 h-[4.75rem] rounded-xl"
            >
              <div className="font-bold capitalize text-[#002D4B] text-[1rem] leading-[1.25rem] absolute left-4 top-4">
                {ele?.tableName}
              </div>
              <div className="font-normal text-[#002D4B]/40 text-[0.875rem] leading-[1rem] absolute right-4 top-4">
                {ele?.time}
              </div>
              <div className="font-normal w-[80%] text-[#002D4B]/40 text-[0.875rem] leading-[1rem] absolute left-4 top-10">
                {ele?.message}
              </div>
              <div className="font-normal text-[#002D4B]/40 text-[0.875rem] leading-[1rem] absolute right-4 top-10">
                {ele?.status}
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Alert;
