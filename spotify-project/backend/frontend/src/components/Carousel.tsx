import { useState, type ReactNode } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface Props {
  children: ReactNode;
}

function Carousel({ children }: Props) {
  // Note the maximum children is 3
  const [currentSlide, setCurrentSlide] = useState(0);

  const prev = () =>
    setCurrentSlide((currentSlide: number) =>
      currentSlide === 0 ? 2 : currentSlide - 1
    );

  const next = () =>
    setCurrentSlide((currentSlide: number) =>
      currentSlide === 2 ? 0 : currentSlide + 1
    );

  return (
    <div className="overflow-hidden relative size-full">
      <div
        className="flex size-full transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children}
      </div>

      {/* buttons */}

      <div className="absolute inset-y-0 left-0 w-min flex items-center p-5">
        <button
          onClick={prev}
          disabled={currentSlide === 0}
          className={currentSlide === 0 ? "cursor-default" : "cursor-pointer"}
        >
          <FaAngleLeft
            className={
              currentSlide === 0
                ? "size-15 fill-gray-300"
                : "size-15 fill-gray-500 hover:fill-gray-600 active:fill-gray-800"
            }
          />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 w-min flex items-center p-5">
        <button
          onClick={next}
          disabled={currentSlide === 2}
          className={currentSlide === 2 ? "cursor-default" : "cursor-pointer"}
        >
          <FaAngleRight
            className={
              currentSlide === 2
                ? "size-15 fill-gray-300"
                : "size-15 fill-gray-500 hover:fill-gray-600 active:fill-gray-800"
            }
          />
        </button>
      </div>

      {/* indicators */}
      <div className="absolute lg:bottom-2 bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((_, i) => (
            <div
              className={`
            transition-all bg-gray-400 rounded-full
            ${
              currentSlide === i
                ? "lg:size-3 size-5"
                : "lg:size-[0.6rem] size-[1.05rem] bg-gray-400/60"
            }
            `}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
