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
import {
  ICategory,
  IChildCategory,
  IStatus,
} from "@/components/types/hiTableData";
import PaymentPopup from "@/components/atoms/paymentPop";

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
  const [statusData, setStatusData] = useState<IStatus[]>([]);
  const [billData, setBillData] = useState<IStatus[]>([]);

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
    } else if (str.toLowerCase() === "status") {
      getAllKotSpecificTable();
    } else if (str.toLowerCase() === "settle") {
      getBill();
    }
    setActiveButton(str);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  async function getAllKotSpecificTable() {
    const response = await axios.get(
      `https://api.hipal.life/v1/kitchens/6465f75fc3e63b8212ab345c/kots?businessId=${businessId}&tableId=6465f887b637aefee641acfa&kitchenId=6465f75fc3e63b8212ab345c&zoneId=6465f876b637aefee641acf2`
    );
    const kotData = response.data;
    console.log(kotData);
    setStatusData(kotData);
  }
  async function getBill() {
    const response = await axios.get(
      `https://api.hipal.life/v1/kitchens/6465f75fc3e63b8212ab345c/kots/bill?businessId=6465f737d1e4d1ecf8911920&zoneId=6465f876b637aefee641acf2&tableId=6465f887b637aefee641acfa&kitchenId=6465f75fc3e63b8212ab345c&discount=10`
    );
    const billData = response.data;
    console.log(billData);
    setBillData(billData);
  }

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
    <div className="bg-[#f5f5f5] min-h-screen relative">
      <div
        className={`${
          activeButton.toLowerCase() === "pos"
            ? ""
            : "sticky top-0 z-50 bg-[#f5f5f5]"
        } `}
      >
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
      </div>
      {activeButton.toLowerCase() === "status" && (
        <div className="pb-[5rem] bg-[#F5F5F5] mt-6">
          {statusData.map((ele, i) => (
            <div>
              {ele.dishStatus !== "" && (
                <div key={ele?.id} className="mx-6 mb-6 bg-white rounded-2xl">
                  <div className="flex justify-between pt-4 mx-4">
                    <div className="flex flex-col">
                      <div className="font-[500] capitalize">
                        T-{ele?.tableName ? ele.tableName : "001"}
                      </div>
                      <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                        {ele?.customerName}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-right text-md font-[500] text-[#2C62F0]">
                        {ele?.kotTime}
                      </div>
                      <div className="capitalize font-normal mt-1 text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
                        {ele?.date}
                      </div>
                    </div>
                  </div>

                  <div className="mx-4 mt-4 border-2 rounded-full border-gray-400/30"></div>

                  <div>
                    <div className="flex justify-between mx-4 mt-4">
                      <div className="w-[10%] font-[500]">
                        {ele?.dish?.qty} x
                      </div>
                      <div className="w-[60%] -ml-4 font-[500]">
                        {ele?.dish?.name}
                        <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                          {ele?.dish?.portions?.name}
                        </div>
                        <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                          {ele?.dish?.extras?.map(
                            (extra) => extra?.name + ", "
                          )}
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
                    {ele?.dishStatus === "delivered" ? (
                      <div className="py-4 mx-4">
                        <button className="font-normal relative px-2 text-black rounded-full bg-[#DBFFE2]">
                          <div className="inline-flex items-center justify-start">
                            <div className="w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#00BA34] rounded-full">
                              <BiBowlRice className="mt-1 ml-1 text-white" />
                            </div>
                            <div className="mb-[0.1rem] capitalize font-[500] text-lg text-[#00BA34]/80 pr-1 pl-1 ml-6 mr-4">
                              {ele?.dishStatus} x 1
                            </div>
                          </div>
                        </button>
                      </div>
                    ) : ele?.dishStatus === "cooked" ? (
                      <div className="py-4 mx-4">
                        <button className="font-normal relative px-2 text-black rounded-full bg-[#E0EBFF]">
                          <div className="inline-flex items-center justify-start">
                            <div className="w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#5591FF] rounded-full">
                              <BiBowlRice className="mt-1 ml-1 text-white" />
                            </div>
                            <div className="mb-[0.1rem] capitalize font-[500] text-lg text-[#5591FF]/80 pr-1 pl-1 ml-6 mr-4">
                              {ele?.dishStatus} x 1
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
                              {ele?.dishStatus} x 1
                            </div>
                          </div>
                        </button>
                      </div>
                    )}
                    <div className="mx-4 border-b border-dashed"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
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
      {activeButton.toLowerCase() === "settle" && (
        <div className="bg-white mx-6 rounded-2xl mt-6 relative mb-[5rem]">
          {billData[0] && (
            <div className="bg-[#2C62F0] overflow-auto py-4 rounded-t-2xl">
              <div className="flex justify-between mx-4">
                <div className="flex flex-col">
                  <div className="font-[500] text-white capitalize">T-21</div>
                  <div className="capitalize font-normal text-white text-[0.875rem] mt-1 leading-[1rem]">
                    {billData[0]?.customerName}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-right text-md font-[500] text-white">
                    {billData[0]?.kotTime}
                  </div>
                  <div className="capitalize font-normal mt-1 text-white text-[0.875rem] leading-[1rem]">
                    {billData[0]?.date}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between capitalize font-[500] mx-4 my-4 text-[#002D4B] text-[1rem] leading-[1.25rem]">
            <div className="w-[50%]">Items</div>
            <div>Quantity</div>
            <div>Cost</div>
          </div>
          <div className="overflow-auto max-h-[20rem] min-h-[15rem] pb-4">
            {billData.slice(0, billData.length - 2).map((bill, index) => (
              <div
                key={bill?.id}
                className={`flex justify-between capitalize font-[500] mx-4 mt-4 text-[#002D4B] text-[1rem] leading-[1.25rem] ${
                  index !== billData.length - 3
                    ? "pb-4 border-b border-dashed"
                    : ""
                }`}
              >
                <div className="w-[60%] font-[500]">
                  {bill?.dish?.name}
                  <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                    {bill?.dish?.portions?.name}
                  </div>
                  <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                    {bill?.dish?.extras?.map((extra, index) => (
                      <span key={index}>{extra?.name}, </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">{bill?.dish?.qty}</div>
                <div className="">₹ {bill?.dish?.price}</div>
              </div>
            ))}
          </div>
          <div className="pb-2 mx-4">
            <hr className="border-gray-500" />
          </div>
          <PaymentPopup show={isModalOpen} onClose={closeModal}>
            <div className="relative">
              <div className="capitalize font-[500] ml-6 mt-4 text-[#002D4B] text-[1rem] leading-[1.25rem]">
                T-001
              </div>
              <div className="mt-4 border border-b-dashed"></div>
            </div>
          </PaymentPopup>
          {billData[billData.length - 1] && (
            <div>
              <div className="flex justify-between mx-4 capitalize font-[500] text-[#002D4B] text-[1rem] leading-[1.25rem]">
                <div>Sub-Total</div>
                <div>₹ {billData[billData.length - 1]?.subTotal}</div>
              </div>
              <div className="flex justify-between mx-4 capitalize mt-1 text-[#002D4B] text-sm">
                <div>Discount</div>
                <div>₹ {billData[billData.length - 1]?.discount}</div>
              </div>
              <div className="flex justify-between mx-4 capitalize mt-1 text-[#002D4B] text-sm">
                <div>CGST</div>
                <div>₹ {billData[billData.length - 1]?.SGST}</div>
              </div>
              <div className="flex justify-between mx-4 capitalize mt-1 text-[#002D4B] text-sm">
                <div>SGST</div>
                <div>₹ {billData[billData.length - 1]?.CGST}</div>
              </div>
              <div className="flex justify-between pb-4 mx-4 capitalize font-[500] text-[#002D4B] text-[1rem] leading-[1.25rem]">
                <div>Total</div>
                <div>₹ {billData[billData.length - 1]?.Total}</div>
              </div>
            </div>
          )}
        </div>
      )}
      <div
        className={`${
          activeButton.toLowerCase() === "settle" ? "" : "hidden"
        } w-full h-[4rem] absolute bottom-0 bg-[#2C62F0]`}
      >
        <button
          onClick={openModal}
          className="absolute px-4 py-2 mr-2 border-white border text-white bg-[#2C62F0] rounded-full bottom-3 left-6"
        >
          Discount
        </button>
        <button className="absolute bottom-3 left-[35%] border-white border rounded-full px-4 py-2 mr-2 text-white bg-[#2C62F0]">
          E-bill
        </button>
        <button className="absolute px-4 py-2 mr-2 border-white border text-white bg-[#2C62F0] rounded-full right-6 bottom-3">
          Continue
        </button>
      </div>
    </div>
  );
}

export default POS;
