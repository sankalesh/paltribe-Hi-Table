import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Lottie from 'lottie-react'
import Cooking from '../../../assets/animation/cooking.json'
import { IOrder } from '@/components/types/hiTableData';

const CookingAnimation = ({ onAnimationComplete ,data }: { onAnimationComplete: any,data:any}) => {

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-white">
        {/* {data?.map(ele=>(
            <div>
                <div className="capitalize font-normal text-[#002D4B]/40 text-[0.875rem] mt-1 leading-[1rem]">
                  {ele.customerName}
                </div>
            </div>
        ))} */}
     <Lottie animationData={Cooking}  className='w-[20rem] h-[20rem]' />
    </div>
  );
};

export default CookingAnimation;
