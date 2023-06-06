import Header from "@/components/molecules/header";
import Popup from "@/components/molecules/popup";
import TableHeader from "@/components/molecules/tableHeader";
import { PAGE_TYPES, routePaths } from "@/components/utils/routes";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import {useState} from 'react'

export default function KickUser() {
  const router = useRouter();
  const { businessId, zoneId, tableId } = router.query as {
    businessId: string;
    zoneId: string;
    tableId: string;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKickUser = async () => {
    const res = await axios.put(
      `https://api.hipal.life/v1/zones/${zoneId}/tables/${tableId}/KickOutTable`
    );
    if (res.data) {
      router.push(routePaths[PAGE_TYPES.TABLES](businessId, zoneId));
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <TableHeader businessId={businessId} zoneId={zoneId} tableId={tableId}>
        <div className="font-bold capitalize mr-4 text-[#002D4B] text-xl">
          T-001
        </div>
      </TableHeader>
      <div className="flex justify-between px-6 py-6 mx-6 mt-6 bg-white rounded-2xl">
        <div className="font-[500] capitalize text-[#002D4B]">HICODE</div>
        <div className="font-medium capitalize text-[#002D4B]/40 text-right">
          9989
        </div>
      </div>
      <div className="flex justify-between px-6 py-6 mx-6 mt-6 bg-white rounded-2xl">
        <div className="font-[500] capitalize text-[#002D4B]">
          kick User
          <div className="text-sm mt-2 text-[#002D4B]/40">
            Remove the User from the table
          </div>
        </div>

        <div className="mt-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div
              onClick={openModal}
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#F04B4B]"
            ></div>
          </label>
        </div>
      </div>
      <div className="flex justify-between py-6 mx-6 mt-6 bg-white rounded-2xl">
        <div className="ml-6 font-medium text-[#002D4B]">
          Reserve the table?
          <div className="text-sm mt-2 text-[#002D4B]/40">
            Blocks others to use table
          </div>
        </div>
        <div className="mt-4 mr-6">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#F04B4B]"></div>
          </label>
        </div>
      </div>
      <Popup show={isModalOpen} onClose={closeModal}>
            
      </Popup>
    </div>
    
  );
}
