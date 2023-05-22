import React, { useEffect, useState } from "react";
import HiTableLogo from "../assets/svg/HiTableLogo.svg";
import welcome from "../assets/svg/welcomeLogo.svg";
import { isEmpty } from 'lodash-es'

import Image from "next/image";
import { useLogin } from "@/components/store/useLogin";
import axios from "axios";

function HiTable() {
  const {
    phoneNumber,
    name,
    businessName,
    password,
    setPhoneNumber,
    setName,
    setBusinessName,
    setPassword,
  } = useLogin();



  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBusinessNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBusinessName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  result()
    console.log(phoneNumber, name, password, businessName)
  };

  const setUserDetails = useLogin(s => s.setUserDetails)

  const result = async () => {
    try {
      const config = {
        method: 'POST',
        url: 'https://api.hipal.life/v1/users/waiterLogin',
        data: {
          phone: phoneNumber,
          password: password
        }
      }
  
      const user = await axios(config)
      const res = user.data
  
      if (!isEmpty(res)) {
        setUserDetails(res)
      } else {
        // show alert message if response is empty
        alert("Phone or Password invalid...!")
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // show alert message if status code is 400
        alert("Phone or Password invalid...!")
      } else {
        console.log(err)
      }
    }
  }
  return (
    <div>
      <div className="flex justify-center mt-[2rem]">
        <Image width={104} height={31} src={HiTableLogo} alt="Hi Table Logo" />
      </div>
      <div className="flex justify-center mt-[1rem] mx-[3.375rem]">
        <Image width={283} height={223} src={welcome} alt="Hi Table Logo" />
      </div>
      <div className="text-center mt-[2.5rem]">
        <span className="font-[400] text-[#002D4B] text-[1rem] leading-[1.125rem]">
          Let’s get started
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="relative w-full px-[3.125rem] mt-[2.5rem] mb-[5.89rem] ml-0 mr-0 space-y-4">
          <div className="relative">
            <input
              onChange={handleBusinessNameChange}
              type="text"
              id="floating_outlined"
              className="block w-full pt-2 pb-4 pl-4 pr-4 mb-0 ml-0 mr-0 text-base text-gray-900 bg-transparent border-gray-800 rounded-lg border dark:text-white focus:outline-none focus:border-[#2C62F0] dark:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#2C62F0] peer-focus:dark:text-[#2C62F0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Business Name
            </label>
          </div>
          <div className="relative">
            <input
              onChange={handleNameChange}
              type="text"
              id="floating_outlined"
              className="block w-full pt-2 pb-4 pl-4 pr-4 mb-0 ml-0 mr-0 text-base text-gray-900 bg-transparent border-gray-800 rounded-lg border dark:text-white focus:outline-none focus:border-[#2C62F0] dark:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#2C62F0] peer-focus:dark:text-[#2C62F0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Name
            </label>
          </div>
          <div className="relative">
            <input
              onChange={handlePhoneNumberChange}
              type="text"
              id="floating_outlined"
              className="block w-full pt-2 pb-4 pl-4 pr-4 mb-0 ml-0 mr-0 text-base text-gray-900 bg-transparent border-gray-800 rounded-lg border dark:text-white focus:outline-none focus:border-[#2C62F0] dark:border-gray-600 peer"
              placeholder=" "
              maxLength={10}
              minLength={10}
              required
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#2C62F0] peer-focus:dark:text-[#2C62F0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Phone number
            </label>
          </div>
          <div className="relative">
            <input
              onChange={handlePasswordChange}
              type="password"
              id="floating_outlined"
              className="block w-full pt-2 pb-4 pl-4 pr-4 mb-0 ml-0 mr-0 text-base text-gray-900 bg-transparent border-gray-800 rounded-lg border dark:text-white focus:outline-none focus:border-[#2C62F0] dark:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#2C62F0] peer-focus:dark:text-[#2C62F0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              password
            </label>
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <button className="on_active_bounce btn-[#2C62F0] rounded-full w-[20.5rem] font-[600] py-[1.3rem] text-white text-[18px] leading-[1.15rem]">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default HiTable;
