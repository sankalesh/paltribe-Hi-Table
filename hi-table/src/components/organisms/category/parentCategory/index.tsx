import { Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import FoodType from "../../../atoms/foodType";

export default function ParentCategory() {
  return (
    <div className="relative w-full px-4">
      <div className="w-full max-w-md mx-auto bg-white px- rounded-2xl">
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
                <div className="flex justify-between ">
                  <div className="ml-[1.5rem]">Child Category</div>
                  <div className="mr-[3rem]">5</div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      
    </div>
  );
}
