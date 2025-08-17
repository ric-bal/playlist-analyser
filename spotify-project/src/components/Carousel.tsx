import type { ReactNode } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface Props {
  children: ReactNode;
}

function Carousel({ children }: Props) {
  return (
    <div className="overflow-hidden relative size-full">
      <div className="flex size-full">{children}</div>
      <div className="absolute inset-0 flex items-center justify-between p-5">
        <button className="border-2 border-transparent rounded-full hover:border-gray-300">
          <FaAngleLeft className="size-15 fill-gray-500 hover:fill-gray-600" />
        </button>
        <button className="border-2 border-transparent rounded-full hover:border-gray-300">
          <FaAngleRight className="size-15 fill-gray-500 hover:fill-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
