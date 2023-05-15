import React from "react";
import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";

function Header({children}:{children:React.ReactNode}) {
  return (
    <div>
      <div className="flex justify-between ml-[1.5rem] pt-[2rem]">
        <HiArrowLeft className="mr-[1.5rem] text-2xl" />
      {children}
        <MdMenuOpen className="mr-[1.5rem] text-2xl" />
      </div>
    </div>
  );
}

export default Header;
