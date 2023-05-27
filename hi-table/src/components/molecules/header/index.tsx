import React from "react";
import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import {PAGE_TYPES, routePaths } from "@/components/utils/routes";

interface HeaderProps {
  children: React.ReactNode;
  businessId: string;
  zoneId: string;
}

function Header({ children, businessId, zoneId }: HeaderProps) {
  console.log(businessId, zoneId)

  const router = useRouter();

  const handleTableClick = () => {
    router.push(routePaths[PAGE_TYPES.TABLES](businessId, zoneId));
  };

  const handleImageClick = () => {
    router.push(routePaths[PAGE_TYPES.ZONE](businessId))
  };
  return (
    <div>
      {children?.props.className === "mr-6" ? (
        <div >
          <div className="flex justify-between ml-[1.5rem] pt-[2rem]">
            <HiArrowLeft
              onClick={handleImageClick}
              className="mr-[1.5rem] text-2xl"
            />
            {children}
            <MdMenuOpen className="mr-[1.5rem] text-2xl" />
          </div>
        </div>
      ) : (
        <div >
          <div className="flex justify-between ml-[1.5rem] pt-[2rem]">
            <HiArrowLeft
              onClick={handleTableClick}
              className="mr-[1.5rem] text-2xl"
            />
            {children}
            <MdMenuOpen className="mr-[1.5rem] text-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

