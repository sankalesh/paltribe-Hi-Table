import Footer from "@/components/molecules/footer";
import Header from "@/components/molecules/header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HiPalLogo from "../../../../../../assets/svg/hipalLogoNew.svg";
import { useRouter } from "next/router";
import axios from "axios";
import CookingAnimation from "@/components/atoms/animation";
import { IOrder } from "@/components/types/hiTableData";
import { useLogin } from "@/components/store/useLogin";

function Orders() {
  const [data, setData] = useState<IOrder[]>([]);
  const [isOrderAccepted, setOrderAccepted] = useState(false);
  const router = useRouter();
  const { businessId, zoneId } = router.query as {
    businessId: string;
    zoneId: string;
  };
  const userDetail = useLogin((s) => s.userDetails);

  useEffect(() => {
    result();
  }, []);

  const handleAnimationComplete = () => {
    router.back();
    result();
  };

  const acceptOrder = async (id: string) => {
    try {
      await axios.put(
        `https://api.hipal.life/v1/kitchens/waiterKot/update/${id}`
      );
      setOrderAccepted(true);
     
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const result = async () => {
    const config = {
      method: "GET",
      url: `https://api.hipal.life/v1/kitchens/all/WaiterOrder?businessId=${businessId}&zoneId=${zoneId}&staffId=${userDetail?.id}`,
    };

    const response = await axios(config);
    const data = response.data;
    setData(data);
    console.log(data);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header businessId={businessId} zoneId={zoneId}>
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
      {isOrderAccepted ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <CookingAnimation
            data={data}
            onAnimationComplete={handleAnimationComplete}
          />
        </div>
      ) : null}
      <div>
        {data.map((ele) => (
          <div
            key={ele.id}
            className="bg-white mx-6 rounded-2xl mt-6 mb-[5rem]"
          >
            <div className="flex justify-between pt-4 mx-4">
              <div className="flex flex-col">
                <div className="font-[500] capitalize">{ele.tableName}</div>
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
                <div
                  key={item.dish.dishId + "dish" + i}
                  className="flex mx-4 mt-4"
                >
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
                <button
                  onClick={() => acceptOrder(ele.id)}
                  className="active_on_bounce border border-[#2C62F0]  text-md font-[500] text-[#2C62F0] py-1 px-6 rounded-2xl"
                >
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
