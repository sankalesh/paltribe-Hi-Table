import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Carousel({ children: slides }) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex">{slides}</div>
      <div className="absolute flex items-center top-[80%] justify-between p-4 bg-black">
        <button>
          <MdChevronLeft />
        </button>
        <button>
          <MdChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
