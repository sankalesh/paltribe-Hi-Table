import Menu from "@/components/organisms/category/childCategory";
import Header from "@/components/molecules/header";
import MenuPopup from "@/components/molecules/menuPopup";
import Popup from "@/components/molecules/popup";
import React, { memo, useEffect, useState } from "react";
import { BiBowlRice } from "react-icons/bi";
import { HiSearch, HiX } from "react-icons/hi";
import {
  MdDeleteOutline,
  MdOutlineCategory,
  MdOutlineFeed,
  MdOutlineKeyboardArrowUp,
  MdOutlineWidgets,
} from "react-icons/md";
import { RiCalendarCheckFill, RiShoppingBagLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import ChildCategory from "@/components/organisms/category/childCategory";
import ParentCategory from "@/components/organisms/category/parentCategory";
import axios from "axios";
import { useRouter } from "next/router";
import {
  IBusinessData,
  ICategory,
  IChildCategory,
  IDish,
  IExtraItem,
  IKot,
  IPortion,
  IStatus,
} from "@/components/types/hiTableData";
import PaymentPopup from "@/components/atoms/paymentPop";
import { intializeAllBusiness } from "@/components/store/useAllBusiness";
import { useCart } from "@/components/store/useCart";
import DishQuantityButton from "@/components/organisms/dishDescription/dishQuantityButton";
import FoodType from "@/components/atoms/foodType";
import { getDishPrice } from "@/components/utils/helpers";
import { isEmpty } from "lodash";
import { useLogin } from "@/components/store/useLogin";
import { useTable } from "@/components/store/useTable";
import { PAGE_TYPES, routePaths } from "@/components/utils/routes";
import TableHeader from "@/components/molecules/tableHeader";

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
const paymentMethods = [
  { id: "cash", name: "Cash" },
  { id: "card", name: "Card" },
  { id: "Phonepe", name: "PhonePe" },
  { id: "GooglePay", name: "GooglePay" },
  { id: "Paytm", name: "Paytm" },
];

function POS() {
  /********************* Using in settle pos and settle *************************/
  const [activeButton, setActiveButton] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [footButton, setFootButton] = useState("");
  const cart = useCart((s) => s.cart);
  const setCart = useCart((s) => s.setCart);
  const tableData = useTable((s) => s.tableData);
  const router = useRouter();
  const { businessId, zoneId, tableId } = router.query as {
    businessId: string;
    zoneId: string;
    tableId: string;
  };
  const kitchenId = useLogin((s) => s.kitchenId);

  /*************************Settle part for individual**************************************/
  const [selectedDishStatus, setSelectedDishStatus] = useState<IKot | null>(
    null
  );
  const [statusData, setStatusData] = useState<any[]>([]);

  /****************************** pos ***************************************/
  const [data, setData] = useState<any>([]);

  /******************************** settle part ***********************************/
  const [billData, setBillData] = useState<IStatus[]>([]);
  console.log("this is my bill data",billData)
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountMode, setDiscountMode] = useState("rupees");
  const [discount, setDiscount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  /********************* All functions are related to status *********************/

  const handleDishStatus = async (kotId: any) => {
    let config = {
      method: "put",
      url: "https://api.hipal.life/v1/kitchens/update/kots/dish",
      data: {
        kots: [kotId],
      },
    };
    const res = await axios(config);
    getAllKotSpecificTable();
    closeModal();
  };
  useEffect(() => {
    getAllKotSpecificTable();
    setActiveButton("status");
  }, []);

  async function getAllKotSpecificTable() {
    const response = await axios.get(
      `https://api.hipal.life/v1/kitchens/${kitchenId}/kots/allKot?businessId=${businessId}&tableId=${tableId}&kitchenId=${kitchenId}&zoneId=${zoneId}`
    );
    const kotData = response.data;
    if (!kotData) return;
    setStatusData(kotData);
  }

  /********************* All functions are related to pos *********************/

  const childCategories = data?.categories ?? [];

  const parentCategories = Object.values(data?.allCategoriesTypes?.main ?? {});

  parentCategories.forEach((parent: any) => {
    const childCategories = Object.values(
      data?.allCategoriesTypes.sub[parent.id] ?? {}
    );
    parent.childCate = childCategories;
  });

  const getDishPrice = (
    dishData: any,
    selectedPortion: any,
    selectedExtras: any
  ) => {
    let price = 0;
    if (selectedPortion === undefined) {
      price += parseFloat(dishData?.price);
    }
    // Add portion price
    const portion = dishData?.portions.find(
      (portion) => portion?.name === selectedPortion
    );
    if (portion) {
      price += parseFloat(portion.price);
    }
    // Add extra prices
    selectedExtras.map((extra: any, i: any) => {
      price += extra?.price * extra?.quantity;
    });

    return price.toFixed(2);
  };

  const handleDeleteItem = (variantId: string) => {
    let cartArray = Object.values(cart);
    const updatedCartArray = cartArray.map((item) => {
      // Check if the item has variants
      if (item.variants && item.variants.length > 0) {
        // Filter out the variant with the specified ID
        const filteredVariants = item.variants.filter(
          (variant) => variant.id !== variantId
        );

        // If there are remaining variants, update the item with the filtered variants
        if (filteredVariants.length > 0) {
          return {
            ...item,
            variants: filteredVariants,
          };
        } else {
          // If all variants are removed, remove the item from the cart
          return null;
        }
      }

      // If the item has no variants, return the original item
      return item;
    });

    // Remove null values (items without variants) from the updatedCartArray
    const updatedCart = updatedCartArray.filter((item: any) => item !== null);
    setCart(
      updatedCart.reduce((acc, item: any) => {
        return {
          ...acc,
          [item?.dishData.id]: item,
        };
      }, {})
    );
  };

  const sendCart = async () => {
    try {
      let config = {
        method: "post",
        url: "https://api.hipal.life/v1/kitchens/CreatePos/kots/Pos",
        data: {
          businessId: businessId,
          kitchenId: kitchenId,
          zoneId: zoneId,
          tableId: tableId,
          tableName: tableData.name,
          cart: cart,
        },
      };
      const res = await axios(config);
      if (res.data.status) {
        alert("cart deliverd sucessfully");
        setCart({});
        router.push(routePaths[PAGE_TYPES.TABLES](businessId, zoneId));
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function getAllChildCategories() {
    const response = await axios.get(
      `https://api.hipal.life/v1/categories/All/Categories?businessId=${businessId}`
    );
    const data = response.data.data;
    console.log(data);
    if (!data) return;
    setData(data);
  }

  /*********************All functions are related to settle *********************/

  // Function to handle payment method selection
  const handlePaymentMethodSelection = (methodId) => {
    if (selectedPaymentMethod === methodId) {
      setSelectedPaymentMethod("");
    } else {
      setSelectedPaymentMethod(methodId);
    }
  };

  const handleDiscountChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9\b]/g, "");
    // console.log(Math.abs(value))
    setDiscountValue(Math.abs(value));
  };

  const handleDiscountModeChange = (e: any) => {
    setDiscountMode(e.target.value);
  };

  const handleDishSelection = (dishId: string) => {
    const isDishSelected = selectedDishes.includes(dishId);
    let updatedSelectedDishes;

    if (isDishSelected) {
      updatedSelectedDishes = selectedDishes.filter((id) => id !== dishId);
    } else {
      updatedSelectedDishes = [...selectedDishes, dishId];
    }

    setSelectedDishes(updatedSelectedDishes);
  };

  const applyDiscount = () => {
    if (discountMode === "rupees") {
      if (selectedDishes.length !== 0) {
        const total = billData
          .slice(0, billData.length - 2)
          .reduce((accumulator, bill) => {
            let dishTotal = bill?.dish?.price * bill?.dish?.qty;
            if (selectedDishes.includes(bill?.dish?.dishId)) {
              const maxdiscountValue = Math.min(
                discountValue,
                bill?.dish?.price
              );

              setDiscount(maxdiscountValue * selectedDishes.length);
              getBill();
              dishTotal -= maxdiscountValue;
            }

            return accumulator + dishTotal;
          }, 0);
      } else {
        const subtotal = billData
          .slice(0, billData.length - 2)
          .reduce((accumulator, bill) => {
            let dishTotal = bill?.dish?.price * bill?.dish?.qty;
            return accumulator + dishTotal;
          }, 0);

        let total = subtotal;

        if (selectedDishes.length === 0) {
          const maxdiscountValue = Math.min(discountValue, total);
          total -= maxdiscountValue;
          setDiscount(maxdiscountValue);
          getBill();
        }
      }
    } else {
      if (selectedDishes.length !== 0) {
        let totalDiscount = 0;
        const total = billData
          .slice(0, billData.length - 2)
          .reduce((accumulator, bill) => {
            let dishTotal = bill?.dish?.price * bill?.dish?.qty;
            if (selectedDishes.includes(bill?.dish?.dishId)) {
              if (discountValue > 0) {
                const maxdiscountValue = Math.min(discountValue, 100);
                const discount = (bill?.dish?.price * maxdiscountValue) / 100;
                totalDiscount += discount;
                setDiscount(totalDiscount);
                getBill();
                dishTotal -= discount;
              }
            }

            return accumulator + dishTotal;
          }, 0);
      } else {
        let subTotal = billData[billData.length - 1]?.subTotal;

        if (selectedDishes.length === 0) {
          if (discountValue > 0) {
            const maxdiscountValue = Math.min(discountValue, 100);
            const discount = (subTotal * maxdiscountValue) / 100;
            getBill();
            setDiscount(discount);
            subTotal -= discount;
          }
        }
      }
    }
  };

  async function getBill() {
    const response = await axios.get(
      `https://api.hipal.life/v1/kitchens/${kitchenId}/kots/bill?businessId=${businessId}&zoneId=${zoneId}&tableId=${tableId}&kitchenId=${kitchenId}&discount=${discount}`
    );
    const billData = response.data;
    if (!billData) return;
    setBillData(billData);
  }
  const finalClick = async () => {
    try {
      const config = {
        method: "put",
        url: "https://api.hipal.life/v1/kitchens/updateKot/and/updatePayment",
        data: billData[billData.length - 1],
      };

      const res = await axios(config);
      if (res.status) {
        setDiscount(0);
        alert("Thank you! Visit again...");
        router.push(routePaths[PAGE_TYPES.TABLES](businessId, zoneId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  /************************* functions for small changes *****************************/
  const footerButton = (str: string) => {
    setFootButton(str);
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

  const openModal = (kot: any) => {
    setIsModalOpen(true);
    setSelectedDishStatus(kot);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFootButton("");
  };

  useEffect(() => {
    getAllChildCategories();
    getBill();
  }, [discount]);

  return (
    <div className="bg-[#f5f5f5] min-h-screen relative">
      <div
        className={`${
          activeButton.toLowerCase() === ""
            ? ""
            : "sticky top-0 z-50 bg-[#f5f5f5]"
        } `}
      >
        <TableHeader businessId={businessId} zoneId={zoneId} tableId={tableId}>
          <div className="font-bold capitalize mr-4 text-[#002D4B] text-xl">
            {tableData.name}
          </div>
        </TableHeader>
        <div
          className={`${
            activeButton.toLowerCase() === "status" ||
            activeButton.toLowerCase() === "settle" ||
            activeButton.toLowerCase() === "pos"
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
            <div
              key={`key${i}`}
              onClick={() => handleOnClick(ele.text)}
              className="flex items-center justify-center px-2"
            >
              <ele.Icon
                className={`text-2xl ${
                  activeButton.toLowerCase() === ele.text.toLowerCase()
                    ? "text-[#2C62F0]"
                    : "text-[#002D4B]/60"
                }`}
              />
              <p
                className={`text-[0.875rem] ml-2 leading-[1rem] ${
                  activeButton.toLowerCase() === ele.text.toLowerCase()
                    ? "text-[#2C62F0] font-[500]"
                    : "text-[#002D4B]/60 font-normal"
                }`}
              >
                {ele.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      {activeButton.toLowerCase() === "status" && (
        <div className="pb-[5rem] bg-[#F5F5F5] mt-6">
          {statusData.map((ele, i) => {
            // Get the first element from the current sub-array
            const kot = ele[0];
            // console.log("this is my status",ele)
            return (
              <div key={kot?.id}>
                {ele.dishStatus !== "" && (
                  <div className="mx-6 mb-6 bg-white rounded-2xl">
                    <div className="flex justify-between pt-4 mx-4">
                      <div className="flex flex-col">
                        <div className="font-[500] capitalize">
                          {kot?.tableName}
                        </div>
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
                    {ele?.map((kot: any, i) => (
                      <div key={`${i}kot${kot.id}`}>
                        <div className="flex justify-between mx-4 mt-4">
                          <div className="w-[10%] font-[500]">
                            {kot?.dish?.qty} x
                          </div>
                          <div className="w-[60%] -ml-4 font-[500]">
                            {kot?.dish?.name}
                            <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                              {kot?.dish?.portions?.name}
                            </div>
                            <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                              {kot?.dish?.extras?.map(
                                (extra) => extra?.name + ", "
                              )}
                            </div>
                          </div>
                          <div
                            className="w-[15%] text-right text-md font-[500] text-[#2C62F0]"
                            onClick={() => openModal(kot)}
                          >
                            Status
                          </div>
                          <Popup show={isModalOpen} onClose={closeModal}>
                            <div className="relative">
                              <div className="capitalize font-[500] ml-6 mt-4 text-[#002D4B] text-[1rem] leading-[1.25rem]">
                                {selectedDishStatus?.tableName
                                  ? selectedDishStatus?.tableName
                                  : "T-001"}
                              </div>
                              <div className="mt-4 border border-b-dashed"></div>

                              <div className="flex justify-between mx-4 mt-4">
                                <div className="w-[60%] mx-2 font-[500]">
                                  {selectedDishStatus?.dish?.name}
                                  <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                                    {selectedDishStatus?.dish?.portions?.name}
                                  </div>
                                  <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                                    {selectedDishStatus?.dish?.extras?.map(
                                      (extra) => extra?.name + ", "
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <div className="text-right text-md font-[500] text-[#2C62F0]">
                                    {selectedDishStatus?.kotTime}
                                  </div>
                                  <div className="capitalize font-normal mt-1 text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
                                    {selectedDishStatus?.date}
                                  </div>
                                </div>
                              </div>
                              {selectedDishStatus?.dishStatus ===
                              "delivered" ? (
                                <div className="py-4 mx-4">
                                  <button className="font-normal relative px-2 text-black rounded-full bg-[#DBFFE2]">
                                    <div className="inline-flex items-center justify-start">
                                      <div className="w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#00BA34] rounded-full">
                                        <BiBowlRice className="mt-1 ml-1 text-white" />
                                      </div>
                                      <div className="mb-[0.1rem] capitalize font-[500] text-lg text-[#00BA34]/80 pr-1 pl-1 ml-6 mr-4">
                                        {selectedDishStatus?.dishStatus}
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              ) : selectedDishStatus?.dishStatus ===
                                "cooked" ? (
                                <div className="py-4 mx-4">
                                  <button className="font-normal relative px-2 text-black rounded-full bg-[#E0EBFF]">
                                    <div className="inline-flex items-center justify-start">
                                      <div className="w-[1.5rem] absolute left-1 h-[1.5rem] bg-[#5591FF] rounded-full">
                                        <BiBowlRice className="mt-1 ml-1 text-white" />
                                      </div>
                                      <div className="mb-[0.1rem] capitalize font-[500] text-lg text-[#5591FF]/80 pr-1 pl-1 ml-6 mr-4">
                                        {selectedDishStatus?.dishStatus}
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
                                        {selectedDishStatus?.dishStatus}
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              )}
                              <div
                                className={`${
                                  selectedDishStatus?.dishStatus ===
                                    "delivered" ||
                                  selectedDishStatus?.dishStatus === "cooking"
                                    ? "hidden"
                                    : "fixed bottom-0 z-20 w-full py-2 mx-6 shadow-lg shadow-base-100"
                                }`}
                              >
                                <button
                                  onClick={() =>
                                    handleDishStatus(selectedDishStatus?._id)
                                  }
                                  className="py-4 w-[85%] space-x-2 text-white bg-[#2C62F0] rounded-full"
                                >
                                  Mark as delivered
                                </button>
                              </div>
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
                                  {kot?.dishStatus}
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
                                  {kot?.dishStatus}
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
                                  {kot?.dishStatus}
                                </div>
                              </div>
                            </button>
                          </div>
                        )}
                        <div className="mx-4 border-b border-dashed"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {activeButton.toLowerCase() === "pos" && (
        <div className="">
          <ChildCategory childCategories={childCategories} />
          {!isModalOpen ? (
            <div
              onClick={openModal}
              className={`${
                Object.keys(cart).length === 0 ? "" : "hidden"
              } bg-[#2C62F0] fixed bottom-6 left-1/2 transition-all duration-500 transform -translate-x-1/2 text-white flex items-center justify-center py-2 px-6 rounded-2xl`}
            >
              <MdOutlineWidgets className="mr-2 text-2xl " />
              <div className="text-lg font-[500]">Menu</div>
            </div>
          ) : (
            <div
              className={`${
                Object.keys(cart).length === 0 ? "" : "hidden"
              } bg-white z-50 fixed bottom-12 left-1/2 transition-all duration-700 transform -translate-x-1/2 text-white flex items-center justify-center p-6 rounded-full`}
              onClick={closeModal}
            >
              <div className="flex flex-row m-auto">
                <RxCross2 className="text-3xl text-[#2C62F0] " />
              </div>
            </div>
          )}

          {Object.keys(cart).length === 0 ? (
            <MenuPopup show={isModalOpen} onClose={closeModal}>
              <div className="relative h-[25rem]">
                <div className="fixed top-0 left-0 right-0 px-4 py-2 capitalize font-[500] ml-2 mt-2 text-[#002D4B] text-[1rem] leading-[1.25rem] bg-white">
                  Category
                </div>
                <div className="absolute inset-0 pb-4 overflow-y-auto top-12">
                  <ParentCategory
                    closeModal={closeModal}
                    parentCategory={parentCategories}
                  />
                </div>
              </div>
            </MenuPopup>
          ) : (
            <PaymentPopup show={isModalOpen} onClose={closeModal}>
              <div className="relative h-[80vh]">
                <div className="fixed top-0 left-0 right-0 px-4 py-2 capitalize font-[500] ml-2 mt-2 text-[#002D4B] text-[1rem] leading-[1.25rem] bg-white">
                  Category
                </div>
                <div className="mt-4 border border-b-dashed"></div>

                <div className="pb-[5rem] top-6 mx-6 absolute inset-0 overflow-y-auto">
                  {Object.values(cart)?.map((cartItem, index) => {
                    const { dishData, variants } = cartItem;
                    const name = dishData?.name;
                    const price = dishData?.price;

                    return variants.map((variant, variantIndex) => {
                      const { portion, extra, id, quantity } = variant;
                      const selectedPortion = portion?.name;
                      const selectedExtra = extra
                        ? Object.values(extra)?.filter(
                            (item: any) => item?.quantity > 0
                          )
                        : [];
                        console.log("this are selected extra",selectedExtra )
                      return (
                        <div key={`${dishData?.id}-${index}-${variantIndex}`}>
                          <div className="relative flex justify-between mt-6">
                            <div className="mr-2">
                              <FoodType type={dishData?.dishType} />
                            </div>
                            <div className="w-[70%] -ml-12">
                              <div className="text-[#002D4B] font-[500] text-[1rem] leading-[1.25rem]">
                                {name?.length && name.length < 35
                                  ? name
                                  : name?.slice(0, 35) + "..."}
                              </div>

                              <div className=" text-[#002D4B]/50 font-[500] mt-1 text-[1rem] leading-[1.25rem]">
                                <div>{selectedPortion}</div>
                                <div>
                                  {selectedExtra.map(
                                    (extraItem: any, extraIndex) => (
                                      <div
                                        key={`${dishData?.id}-${index}-${variantIndex}-${extraIndex}`}
                                      >
                                        <span className="mr-2 text-sm">{extraItem?.quantity}</span>x<span className="ml-2 text-sm">{extraItem?.name}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div className="flex justify-between">
                                <div className="text-[#002D4B]/50 mt-4 font-[500] text-[1rem] leading-[1.25rem]">
                                  ₹
                                  {getDishPrice(
                                    dishData,
                                    selectedPortion,
                                    selectedExtra
                                  )}
                                </div>

                                <div
                                  onClick={() => handleDeleteItem(id)}
                                  className="text-[#2C62F0] rounded-2xl px-6 py-2 bg-white mt-1 -mr-[6rem] font-[500] text-[1rem] leading-[1.25rem]"
                                >
                                  Delete
                                </div>
                              </div>
                            </div>
                            <div className="mr-6 text-[#002D4B]/ font-[500] text-[1rem] leading-[1.25rem]">
                              x 1
                            </div>
                          </div>
                          <div className="mt-6 border border-dashed"></div>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
              <div className="pb-4 pt-4 fixed w-full h-[4rem] bottom-0 bg-[#2C62F0]">
                <div className="mx-[3rem] flex justify-between">
                  <button
                    onClick={openModal}
                    className="absolute text-sm flex px-4 py-2 mr-2 text-white bg-[#2C62F0] rounded-full bottom-3 left-6"
                  >
                    <RiShoppingBagLine className="mt-[0.125rem] mr-2 -ml-4 " />
                    Items Added
                    <MdOutlineKeyboardArrowUp className="ml-3 text-xl" />
                  </button>

                  <button
                    onClick={sendCart}
                    className="absolute text-sm px-4 py-2 mr-2 font-[500] text-[#2C62F0] bg-white rounded-full right-6 bottom-3"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </PaymentPopup>
          )}
          <div
            className={`${
              activeButton.toLowerCase() === "pos" ? "" : "hidden"
            } ${
              Object.keys(cart).length > 0 ? "" : "hidden"
            } fixed w-full h-[4rem] bottom-0 bg-[#2C62F0]`}
          >
            <button
              onClick={openModal}
              className="absolute text-sm flex px-4 py-2 mr-2 text-white bg-[#2C62F0] rounded-full bottom-3 left-6"
            >
              <RiShoppingBagLine className="mt-[0.125rem] mr-2 -ml-4 " />
              Items Added
              <MdOutlineKeyboardArrowUp className="ml-3 text-xl" />
            </button>

            <button
              onClick={openModal}
              className="absolute text-sm px-4 py-2 mr-2 font-[500] text-[#2C62F0] bg-white rounded-full right-6 bottom-3"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {activeButton.toLowerCase() === "settle" && (
        <div className="bg-white mx-6 rounded-2xl mt-6 relative mb-[5rem]">
          {billData[0] && (
            <div className="bg-[#2C62F0] overflow-auto py-4 rounded-t-2xl">
              <div className="flex justify-between mx-4">
                <div className="flex flex-col">
                  <div className="font-[500] text-white capitalize">
                    {billData[0]?.tableName}
                  </div>
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
          {billData && billData.length > 0 && (
            <>
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
            </>
          )}

          {footButton.toLowerCase() === "discount" ? (
            <PaymentPopup show={isModalOpen} onClose={closeModal}>
              <div className="relative">
                <div className="flex justify-between">
                  <div className="capitalize font-[500] ml-6 mt-4 text-[#002D4B] text-[1rem] leading-[1.25rem]">
                    Discount
                  </div>
                  <div className="capitalize font-[500] mr-[7rem] mt-3 text-[#002D4B] text-[1rem] leading-[1.25rem]">
                    ₹ {discount}
                  </div>
                </div>
                <div className="mt-4 ml-6">
                  <select
                    value={discountMode}
                    onChange={handleDiscountModeChange}
                    className="px-3 pr-2 bg-[#2C62F0] border border-[#2C62F0] text-white rounded-l-full"
                  >
                    <option value="rupees">₹</option>
                    <option value="percent">%</option>
                  </select>
                  <input
                    className="border max-w-full min-w-[75%]  font-[500] pt-[0.175rem] text-sm focus:border-[#2C62F0] pl-4 border-[#2C62F0] rounded-r-full"
                    type="number"
                    value={discountValue}
                    onChange={handleDiscountChange}
                  />
                </div>
                <div className="overflow-auto max-h-[25rem] pb-[6rem] pt-4">
                  <div className="flex items-center mx-6 mt-2">
                    <input
                      className="bg-red-500"
                      type="checkbox"
                      // checked={}
                    />
                    <label className="ml-2 line-clamp-1">All</label>
                  </div>
                  {billData.slice(0, billData.length - 2).map((bill, index) => (
                    <div
                      key={`${bill?._id}-bill${index}`}
                      className="flex items-center mx-6 mt-2"
                    >
                      <input
                        className="bg-red-500"
                        type="checkbox"
                        checked={selectedDishes.includes(bill?.dish?.dishId)}
                        onChange={() => handleDishSelection(bill?.dish?.dishId)}
                      />
                      <label className="ml-2 line-clamp-1">
                        {bill?.dish?.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div
                  className={`w-full h-[4rem] bg-[#2C62F0] fixed bottom-0 z-20 py-2 shadow-lg shadow-base-100`}
                >
                  <button className="absolute px-4 text-base py-2 mr-2 font-[500]  text-white bg-[#2C62F0] rounded-full bottom-3 left-6">
                    ₹ Discount
                  </button>
                  <button
                    onClick={() => {
                      applyDiscount();
                      closeModal();
                    }}
                    className="absolute z-50 text-sm font-[500] px-4 py-2 mr-2 border-white border text-[#2C62F0] bg-white rounded-full right-6 bottom-3"
                  >
                    Apply Discount
                  </button>
                </div>
              </div>
            </PaymentPopup>
          ) : (
            <PaymentPopup show={isModalOpen} onClose={closeModal}>
              <div className="relative">
                <div className="flex justify-between">
                  <div className="capitalize font-[500] ml-6 mt-4 text-[#002D4B] text-[1rem] leading-[1.25rem]">
                    Payment Mode
                  </div>
                  <div className="capitalize font-[500] mr-[7rem] mt-3 text-[#002D4B] text-[1rem] leading-[1.25rem]">
                    ₹ {billData[billData.length - 1]?.Total}
                  </div>
                </div>
                <div className="mt-4 ml-6">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        value="0"
                        checked={selectedPaymentMethod === method?.id}
                        onChange={() =>
                          handlePaymentMethodSelection(method?.id)
                        }
                      />
                      <label className="ml-2 line-clamp-1">
                        {method?.name}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="w-full h-[4rem] bg-[#2C62F0] fixed bottom-0 z-20 py-2 shadow-lg shadow-base-100">
                  <button className="absolute px-4 text-base py-2 mr-2 font-[500]  text-white bg-[#2C62F0] rounded-full bottom-3 left-6">
                    ₹ Payment Modes
                  </button>
                  <button
                    onClick={finalClick}
                    className="absolute z-50 text-sm font-[500] px-4 py-2 mr-2 border-white border text-[#2C62F0] bg-white rounded-full right-6 bottom-3"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </PaymentPopup>
          )}
          {billData[billData.length - 1] && (
            <div>
              <div className="flex justify-between mx-4 capitalize font-[500] text-[#002D4B] text-[1rem] leading-[1.25rem]">
                <div>Sub-Total</div>
                <div>₹ {billData[billData.length - 1]?.subTotal}</div>
              </div>
              <div className="flex justify-between mx-4 capitalize mt-1 text-[#002D4B] text-sm">
                <div>Discount</div>
                <div>₹ {discount}</div>
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
        } w-full h-[4rem] fixed bottom-0 z-20 py-2 shadow-lg shadow-base-100 bg-[#2C62F0]`}
      >
        <button
          onClick={() => {
            openModal("hey");
            footerButton("discount");
          }}
          className="absolute px-4 py-2 mr-2 font-[500] text-sm border-white border text-white bg-[#2C62F0] rounded-full bottom-3 left-6"
        >
          Discount
        </button>
        <button
          onClick={() => {
            openModal("hey2");
            getBill();
            footerButton("continue");
          }}
          className={`${
            billData.length > 0
              ? "absolute text-sm font-[500] px-4 py-2 mr-2 border-white border text-[#2C62F0] bg-white rounded-full right-6 bottom-3"
              : "hidden"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default POS;
