import HeaderButton from "@/components/atoms/buttons/headerButton";
import Footer from "@/components/molecules/footer";
import Assistance from "@/components/atoms/status/assistance";
import Clean from "@/components/atoms/status/clean";
import Cooked from "@/components/atoms/status/cooked";
import Paid from "@/components/atoms/status/paid";
import Header from "@/components/molecules/header";
import React, { useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { MdCreditCard } from "react-icons/md";
import { SiGoogleassistant } from "react-icons/si";
import { TbToolsKitchen2 } from "react-icons/tb";
import { ImStopwatch } from "react-icons/im";
import Image from "next/image";
import HiPalLogo from "../../../../assets/svg/hipalLogoNew.svg";


const alertData = [
  {
    status: "cooked",
    tableName: "T 0001",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "cooked",
    tableName: "T 0002",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "clean up",
    tableName: "T 0003",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "cooked",
    tableName: "T 0004",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "Assist",
    tableName: "T 0005",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "clean up",
    tableName: "T 0006",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "cooked",
    tableName: "T 0007",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "Assist",
    tableName: "T 0008",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "clean up",
    tableName: "T 0009",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "Assist",
    tableName: "T 0010",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "clean up",
    tableName: "T 0011",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "",
  },
  {
    status: "paid",
    tableName: "T 0012",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "2500",
  },
  {
    status: "paid",
    tableName: "T 0013",
    dishName: "chicken peri peri hot spicy juicy chicken",
    time: "12:12",
    total: "2500",
  },
];

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

interface IHistory {
  dishName: string;
  time: string;
  status: string;
  tableName: string;
}

function Alert() {
  const [data, setData] = useState(alertData);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [history, setHistory] = useState<IHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const handleItemClick = (index: number) => {
    const item = data[index];
    setData((prevData) => prevData.filter((ele, i) => i !== index));
    setHistory((prevHistory) => [...prevHistory, item]);
  };

  const handleOnclick = (str: string) => {
    str = activeButton.length === 0 ? str : "";
    setActiveButton(str);
    if (str.length > 0) {
      setData(
        alertData.filter(
          (ele) => ele.status.toLowerCase() === str.toLowerCase()
        )
      );
      return;
    }
    setData(alertData);
  };
  const historyOnClick = () => {
    setShowHistory(!showHistory);
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

  const searchData = data.filter(
    (ele) =>
      ele.dishName.toLowerCase().includes(search.toLowerCase()) ||
      ele.tableName.toLowerCase().includes(search.toLowerCase()) ||
      ele.status.toLowerCase().includes(search.toLowerCase())
  );
  const historyData = history.filter(
    (ele) =>
      ele.dishName.toLowerCase().includes(search.toLowerCase()) ||
      ele.tableName.toLowerCase().includes(search.toLowerCase()) ||
      ele.status.toLowerCase().includes(search.toLowerCase())
  );

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
              <div key={`paid-${index}`} onClick={() => handleItemClick(index)}>
                <Paid {...ele} />
              </div>
            ) : ele.status.toLowerCase() === "cooked" ? (
              <div
                key={`cooked-${index}`}
                onClick={() => handleItemClick(index)}
              >
                <Cooked {...ele} />
              </div>
            ) : ele.status.toLowerCase() === "assist" ? (
              <div
                key={`assist-${index}`}
                onClick={() => handleItemClick(index)}
              >
                <Assistance {...ele} />
              </div>
            ) : (
              <div
                key={`clean-${index}`}
                onClick={() => handleItemClick(index)}
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
              <div key={`paid-${index}`} onClick={() => handleItemClick(index)}>
                <Paid {...ele} />
              </div>
            ) : ele.status.toLowerCase() === "cooked" ? (
              <div
                key={`cooked-${index}`}
                onClick={() => handleItemClick(index)}
              >
                <Cooked {...ele} />
              </div>
            ) : ele.status.toLowerCase() === "assist" ? (
              <div
                key={`assist-${index}`}
                onClick={() => handleItemClick(index)}
              >
                <Assistance {...ele} />
              </div>
            ) : (
              <div
                key={`clean-${index}`}
                onClick={() => handleItemClick(index)}
              >
                <Clean {...ele} />
              </div>
            )
          )}
        {showHistory &&
          !searchOpen &&
          history.map((ele, index) => (
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
                {ele?.dishName}
              </div>
              <div className="font-normal text-[#002D4B]/40 text-[0.875rem] leading-[1rem] absolute right-4 top-10">
                {ele?.status}
              </div>
            </div>
          ))}
        {showHistory &&
          searchOpen &&
          search !== "" &&
          historyData.map((ele, index) => (
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
                {ele?.dishName}
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
