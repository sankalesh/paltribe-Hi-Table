import React from "react";
import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";
import HiPalLogo from "../../../assets/svg/hipalLogoNew.svg";
import { HiArrowLeft } from "react-icons/hi";

function Header() {
  return (
    <div>
      {" "}
      <div className="flex justify-between ml-[1.5rem] pt-[2rem]">
        <HiArrowLeft className="mr-[1.5rem] text-2xl" />
        <Image
          className="mr-6"
          width={68}
          height={25}
          src={HiPalLogo}
          alt="Hi Table Logo"
        />
        <MdMenuOpen className="mr-[1.5rem] text-2xl" />
      </div>
    </div>
  );
}

export default Header;
