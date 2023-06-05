import { useAlert } from "@/components/store/useAlert";
import { useEffect } from "react";
import { PAGE_TYPES, routePaths } from "@/components/utils/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  MdAutorenew,
  MdOutlineReceiptLong,
  MdOutlineTableRestaurant,
} from "react-icons/md";
import { RxBell } from "react-icons/rx";

function Footer() {
  const router = useRouter();
  const { businessId, zoneId } = router.query as {
    businessId: string;
    zoneId: string;
  };
  const currentRoute = router.pathname;
  const pathParts = currentRoute.split("/");
  const path = pathParts[pathParts.length - 1];

  const { data, newAlertsCount } = useAlert();
  console.log("this data is comes from footer", data);

  useEffect(() => {}, [data]);

  return (
    <div className="bg-[#2C62F0] fixed bottom-0 z-20 w-full py-2 ">
      <div className="flex justify-between mx-6">
        <Link href={`${routePaths[PAGE_TYPES.TABLES](businessId, zoneId)}`}>
          <div>
            <button
              className={`${
                path === "[zoneId]"
                  ? "bg-white/80 text-[#2C62F0]"
                  : "bg-[#2C62F0] text-white"
              } px-4 py-1 rounded-full focus:outline-none transition duration-300`}
            >
              <MdOutlineTableRestaurant className="text-[1.2rem]" />
            </button>

            <div className={`text-sm ml-2 font-normal text-white`}>Tables</div>
          </div>
        </Link>
        <Link href={`${routePaths[PAGE_TYPES.STATUS](businessId, zoneId)}`}>
          <div>
            <button
              className={` ${
                path === "status"
                  ? "bg-white/80 text-[#2C62F0]"
                  : "bg-[#2C62F0] text-white"
              } px-4 py-1 rounded-full focus:outline-none transition duration-300`}
            >
              <MdAutorenew className="text-[1.2rem]" />
            </button>

            <div className={`text-sm ml-2 font-normal text-white`}>Status</div>
          </div>
        </Link>

        <Link href={`${routePaths[PAGE_TYPES.ALERT](businessId, zoneId)}`}>
          <div className="relative">
            <button
              className={`${
                path === "alert"
                  ? "bg-white/80 text-[#2C62F0]"
                  : "bg-[#2C62F0] text-white"
              } px-4 py-1 rounded-full focus:outline-none transition duration-300`}
            >
              {newAlertsCount === 0 ? (
                <RxBell className="text-[1.2rem]" />
              ) : (
                 <>
                  <span className="absolute bg-red-500 text-white px-2 rounded-full ml-2 top-0 right-2 text-[0.625rem]">!</span>
                  <RxBell className="text-[1.2rem]" />
                </>
              )}
            </button>

            <div className="ml-2 text-sm font-normal text-white">Alerts</div>
          </div>
        </Link>

        <Link href={`${routePaths[PAGE_TYPES.ORDER](businessId, zoneId)}`}>
          <div>
            <button
              className={`${
                path === "orders"
                  ? "bg-white/80 text-[#2C62F0]"
                  : "bg-[#2C62F0] text-white"
              } px-4 py-1 rounded-full focus:outline-none transition duration-300`}
            >
              <MdOutlineReceiptLong className="text-[1.2rem]" />
            </button>

            <div className={`text-sm ml-2 font-normal text-white`}>Orders</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
