import { Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import FoodType from "../../../atoms/foodType";
import { ICategory, IChildCategory } from "@/components/types/hiTableData";
import Link from "next/link";

export default function ParentCategory({
  parentCategory,
  closeModal,
}: {
  parentCategory: any;
  closeModal: () => void;
}) {
  
  console.log(parentCategory);

  return (
    <div className="relative w-full px-4">
      {parentCategory.map((ele) => (
        <div
          key={ele.id}
          className="w-full max-w-md mx-auto bg-white px- rounded-2xl"
        >
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 pt-4 text-lg font-medium text-left rounded-2xl">
                  <div className="w-[80%] mt-[0.125rem] -ml-1">
                    {ele?.name}
                  </div>
                  <span className="mt-1 mr-1">{ele?.childCate?.length}</span>
                  <FiChevronDown
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 mt-2 -mr-2`}
                  />
                </Disclosure.Button>
                {ele?.childCate?.map((child) => (
                  <Disclosure.Panel
                    key={child?.id}
                    className="py-2 text-sm text-gray-500 transition-all duration-300"
                  >
                    <div className="flex justify-between">
                      <Link href={`#${child.id}`} passHref>
                      <div onClick={closeModal} className="ml-[1.5rem]">{child?.name}</div>
                      </Link>
                      
                      <div className="mr-[3rem]">{child?.dishes?.length}</div>
                    </div>
                  </Disclosure.Panel>
                ))}
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
}
