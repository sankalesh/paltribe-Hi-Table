import React from "react";
import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";

function Header({children}:{children:React.ReactNode}) {

  const router = useRouter();
  const handleClick = ()=>{
    router.back()
  }
  return (
    <div>
      <div className="flex justify-between ml-[1.5rem] pt-[2rem]">
        <HiArrowLeft onClick={handleClick} className="mr-[1.5rem] text-2xl" />
      {children}
        <MdMenuOpen className="mr-[1.5rem] text-2xl" />
      </div>
    </div>
  );
}

export default Header;
