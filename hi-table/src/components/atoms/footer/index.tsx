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
  const { businessId } = router.query as { businessId: string };
  const currentRoute = router.pathname
  const pathParts = currentRoute.split("/");
const path = pathParts[pathParts.length - 1];

  return (
    <div className="bg-[#2C62F0] fixed bottom-0 z-20 w-full py-2 ">
      <div className="flex justify-between mx-6">
        {/* <Link href={`${routePaths[PAGE_TYPES.TABLES](`${businessId}`)}`}> */}
          <div>
            <button className={`${path === 'tables'? 'bg-white/80 text-[#2C62F0]':'bg-[#2C62F0] text-white' } px-4 py-1 rounded-full focus:outline-none transition duration-300`}>
              <MdOutlineTableRestaurant className="text-[1rem]" />
            </button>

            <div className={`text-sm ml-1 font-normal text-white`}>Tables</div>
          </div>
        {/* </Link> */}
        <Link href={`${routePaths[PAGE_TYPES.STATUS](`${businessId}`)}`}>
          <div>
            <button className={` ${path === 'status'? 'bg-white/80 text-[#2C62F0]':'bg-[#2C62F0] text-white' } px-4 py-1 rounded-full focus:outline-none transition duration-300`}>
              <MdAutorenew className="text-[1rem]" />
            </button>

            <div className={`text-sm ml-1 font-normal text-white`}>Status</div>
          </div>
        </Link>

        <Link href={`${routePaths[PAGE_TYPES.ALERT](`${businessId}`)}`}>
          <div>
            <button className={`${path === 'alert'? 'bg-white/80 text-[#2C62F0]':'bg-[#2C62F0] text-white' } px-4 py-1 rounded-full focus:outline-none transition duration-300`}>
              <RxBell className="text-[1rem]" />
            </button>

            <div className={`text-sm ml-1 font-normal text-white`}>Alerts</div>
          </div>
        </Link>

        <Link href={`${routePaths[PAGE_TYPES.ORDER](`${businessId}`)}`}>
          <div>
            <button className={`${path === 'orders'? 'bg-white/80 text-[#2C62F0]':'bg-[#2C62F0] text-white' } px-4 py-1 rounded-full focus:outline-none transition duration-300`}>
              <MdOutlineReceiptLong className="text-[1rem]" />
            </button>

            <div className={`text-sm ml-1 font-normal text-white`}>Orders</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
