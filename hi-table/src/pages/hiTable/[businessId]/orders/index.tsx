import Footer from "@/components/molecules/footer";
import Header from "@/components/molecules/header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HiPalLogo from "../../../../assets/svg/hipalLogoNew.svg";
import { useRouter } from "next/router";
import axios from "axios";

interface IOrder {
  businessId: string;
  tableName: string;
  staffId: string;
  items: {
    businessId: string;
    kitchenId: string;
    zoneId: string;
    tableId: string;
    staffId: string;
    dish: {
      dishId: string;
      name: string;
      price: number;
      qty: number;
      comments: string;
      extras: {
        name: string;
        price: string;
        qty: number;
      }[];
      portions: {
        name: string;
        price: string;
        discount: string;
        default: string;
      };
    };
    customerName: string;
    customerPhone: string;
  }[];
  time: string;
  date: string;
  isAccept: boolean;
  customerName: string;
  customerPhone: string;
  id: string;
}

function Orders() {
  const [data, setData] = useState<IOrder[]>([]);

  const router = useRouter();
  const { businessId } = router.query as { businessId: string };

  useEffect(() => {
    result();
  }, []);

  const result = async () => {
    const config = {
      method: "GET",
      url: `https://api.hipal.life/v1/kitchens/all/WaiterOrder?businessId=${businessId}`,
    };

    const response = await axios(config);
    const data = response.data;
    setData(data);
    console.log(data);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header>
        <Image
          className="mr-6"
          width={68}
          height={25}
          src={HiPalLogo}
          alt="Hi Table Logo"
        />
      </Header>
      <div className=" ml-6 mt-8 font-bold capitalize text-[#002D4B] text-[1rem] leading-[1.25rem]">
        Orders
      </div>
      <div>
        {data.map((ele) => (
          <div key={ele.id} className="bg-white mx-6 rounded-2xl mt-6 mb-[5rem]">
            <div className="flex justify-between pt-4 mx-4">
              <div className="flex flex-col">
                <div className="font-[500] capitalize">T-21</div>
                <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                  {ele.customerName}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-right text-md font-[500] text-[#2C62F0]">
                  {ele.time}
                </div>
                <div className="capitalize font-normal mt-1 text-[#002D4B]/40 text-[0.875rem] leading-[1rem]">
                  {ele.date}
                </div>
              </div>
            </div>
            <div className="mx-4 mt-4 border-2 rounded-full border-gray-400/50"></div>
            <div className="relative pt-2 pb-[4.875rem]">
              {ele.items.map((item, i) => (
                <div className="flex mx-4 mt-4">
                <div className="w-[10%] font-[500]">{item?.dish?.qty} x</div>
                <div className="w-[80%] ml-1 font-[500]">
                  {item?.dish?.name}
                  <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                    {item?.dish?.portions?.name}
                  </div>
                  <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                    {item?.dish?.extras?.map((extra) => extra?.name + ", ")}
                  </div>
                </div>
                </div>
              ))}

              <div className="absolute inline-flex right-6 bottom-4">
                <button className="text-md font-[500] text-[#2C62F0] py-1 px-6 rounded-2xl">
                  Reject
                </button>
                <button className="active_on_bounce border border-[#2C62F0]  text-md font-[500] text-[#2C62F0] py-1 px-6 rounded-2xl">
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Orders;
