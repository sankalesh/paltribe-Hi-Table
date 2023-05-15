import { Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import FoodType from "../../../atoms/foodType";

export default function ChildCategory() {
  return (
    <div className="relative w-full px-6 mt-6">
      <div className="w-full max-w-md p-4 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 text-lg font-medium text-left rounded-2xl">
                <div className="w-[80%] mt-[0.125rem] -ml-4">
                  What is yo ur refund ?
                </div>
                <span className="mt-1 -mr-4">11</span>
                <FiChevronDown
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 mt-2 -mr-2`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 transition-all duration-300">
                <div className="h-[0.125rem] bg-[#2C62F0]"></div>
                <div className="relative flex justify-between mt-6">
                  <div className="">
                    <FoodType type="veg" />
                  </div>
                  <div className="w-[70%]">
                    <div className="text-[#002D4B] text-[1rem] leading-[1.25rem] ">
                      Chicken peri peri peri peri peri periperi peri
                    </div>
                    <div className="mt-2 text-[#002D4B]/40 text-[1rem] leading-[1.25rem] ">
                      Rs 234
                    </div>
                    <div className="capitalize flex mt-2 text-[1rem] leading-[1.25rem] font-normal text-[#2C62F0]">
                      <BsQuestionCircle className="mt-[0.125rem] mr-1" />
                      info
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="text-[#2C62F0] py-2 text-[1rem] leading-[1.25rem] font-bold border px-4 border-[#2C62F0] rounded-3xl">
                      Add
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      
    </div>
  );
}
