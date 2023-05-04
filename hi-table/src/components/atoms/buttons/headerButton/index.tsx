import React from "react";
import { useState } from "react";

interface OnImgButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * The content of the button.
   */
  children?: React.ReactNode;

  /**
   * The class name of the button.
   */
  classNames?: string;
}

function HeaderButton({ children, classNames, ...props }: OnImgButtonProps) {
  return (
    <button
      className={
        "flex px-4 text-sm py-2 font-normal text-gray-800 bg-white border rounded-full focus:font-[500] focus:text-[#2C62F0] focus:bg-[#2C62F0]/10 " +
        classNames
      }
      {...props}
    >
      {children}
    </button>
  );
}

export default HeaderButton;
