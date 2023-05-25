import { Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import FoodType from "../../../atoms/foodType";
import { useState } from "react";
import { IChildCategory, IDish } from "@/components/types/hiTableData";
import MenuPopup from "@/components/molecules/menuPopup";
import Image from "next/image";
import Ima from "../../../../assets/svg/welcomeLogo.svg";
import { RxCross2 } from "react-icons/rx";
import Carousel from "@/components/atoms/carousal";
import { MdOutlineCleaningServices } from "react-icons/md";
import { BiBowlRice } from "react-icons/bi";
import DishQuantityButton from "../../dishDescription/dishQuantityButton";

export default function ChildCategory({
  childCategories,
}: {
  childCategories: IChildCategory[];
}) {
  const [openChild, setOpenChild] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="relative w-full px-6 mt-6">
      {childCategories?.map((category) => (
        <div
          key={category?.id}
          className="w-full max-w-md p-4 mx-auto mt-6 bg-white rounded-2xl"
        >
          <Disclosure>
            {({ open }) => (
              <>
                <div>
                  <Disclosure.Button
                    className="flex justify-between w-full px-4 text-lg font-medium text-left rounded-2xl"
                    onClick={() => setOpenChild(category?.id)}
                  >
                    <div className="w-[80%] mt-[0.125rem] -ml-4">
                      {category?.name}
                    </div>
                    <span className="mt-1 -mr-4">
                      {category?.dishes?.length}
                    </span>
                    <FiChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 mt-2 -mr-2`}
                    />
                  </Disclosure.Button>

                  <div>
                    {openChild === category?.id && (
                      <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 transition-all duration-300">
                        <div className="h-[0.125rem] bg-[#2C62F0]"></div>
                        <div className="pb-[5rem]">
                          {category?.dishes?.map((dish) => (
                            <div
                              className="relative flex justify-between mt-6"
                              key={dish?.id}
                            >
                              <div className="mr-2">
                                <FoodType type={dish?.dishType} />
                              </div>
                              <div className="w-[70%]">
                                <div className="text-[#002D4B] text-[1rem] leading-[1.25rem]">
                                  {dish?.name}
                                </div>
                                <div className="mt-2 text-[#002D4B]/40 text-[1rem] leading-[1.25rem]">
                                  ₹ {dish?.price}
                                </div>
                                {
                                  <MenuPopup
                                    show={isModalOpen}
                                    onClose={closeModal}
                                  >
                                    <div className="relative min-h-[15rem] max-h-[30rem] mb-6 overflow-auto">
                                      <div className="flex h-[12rem] justify-center mx-4 mt-4">
                                        <Image
                                          width={350}
                                          height={200}
                                          src="https://storage.hipal.life/minio/assets/dae7a31d-7314-4a6b-8417-bc5e17c460bb.jpeg"
                                          alt=""
                                        />
                                      </div>
                                      <div className="text-[#002D4B] capitalize font-[500] text-xl mx-4 mt-4">
                                      {dish?.name}
                                      </div>
                                      <div className=" mx-4 flex text-[#002D4B] text-[1rem] leading-[1.25rem] mt-4">
                                        <FoodType type={dish?.dishType} />
                                        <div>{dish?.dishType}</div>
                                      </div>
                                      <div className="text-[#002D4B] capitalize text-base mx-4 mt-4">
                                        Average time {dish?.avgTime} minutes(running on
                                        delay)
                                      </div>
                                      <div className="text-[#002D4B]/40 text-base mx-4 mt-2 line-clamp-3">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Magnam, quis? Lorem
                                        ipsum dolor sit amet consectetur
                                        adipisicing elit. Magnam, quis? Lorem
                                        ipsum dolor sit amet consectetur
                                        adipisicing elit. Magnam, quis?
                                      </div>
                                      <div className="text-[#2C62F0] flex space-x-2 capitalize text-base mx-4 mt-2">
                                        <BiBowlRice className="mt-1" />
                                        <span>3 portions Available</span>
                                      </div>
                                      <div className="text-[#002D4B]/40 text-base mx-4 mt-2 line-clamp-3">
                                      
                                      </div>
                                      <div className="text-[#2C62F0] flex space-x-2 capitalize text-base mx-4 mt-2">
                                        <BiBowlRice className="mt-1" />
                                        <span>3 portions Available</span>
                                      </div>
                                      <div className="text-[#002D4B]/40 text-base mx-4 mt-2 line-clamp-3">
                                      
                                      </div>
                                    </div>
                                  </MenuPopup>
                                }
                                {!isModalOpen ? (
                                  <div
                                    onClick={openModal}
                                    className="capitalize flex mt-2 text-[1rem] leading-[1.25rem] font-normal text-[#2C62F0]"
                                  >
                                    <BsQuestionCircle className="mt-[0.125rem] mr-1" />
                                    info
                                  </div>
                                ) : (
                                  <div
                                    className={`mt-8 bg-white z-50 fixed bottom-12 left-1/2 transition-all duration-700 transform -translate-x-1/2 text-white flex items-center justify-center p-6 rounded-full`}
                                    onClick={closeModal}
                                  >
                                    <div className="flex flex-row m-auto">
                                      <RxCross2 className="text-3xl text-[#2C62F0] " />
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="mt-6">
                                <DishQuantityButton dishData={dish} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    )}
                  </div>
                </div>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
}
