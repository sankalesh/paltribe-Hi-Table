import React from "react";
import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import {
  PAGE_TYPES,
  newRoutes,
  routePaths,
  singleRoute,
} from "@/components/utils/routes";
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
  businessId: string;
  zoneId: string;
  tableId: string;
}

function TableHeader({ children, businessId, zoneId, tableId }: HeaderProps) {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <div>
        <div className="flex justify-between ml-[1.5rem] pt-[2rem]">
          <Link href={routePaths[PAGE_TYPES.TABLES](businessId, zoneId)}>
            <HiArrowLeft className="mr-[1.5rem] text-2xl" />
          </Link>

          {children}
          <Link
            href={newRoutes[PAGE_TYPES.KICK_USER](businessId, zoneId, tableId)}
          >
            {" "}
            <MdMenuOpen className="mr-[1.5rem] text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
