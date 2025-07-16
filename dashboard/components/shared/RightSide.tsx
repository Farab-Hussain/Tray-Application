"use client";
import { PanelLeft, PanelRight, Search } from "lucide-react";
import React, { useRef, useState } from "react";

const RightSide = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`hidden layout sm:flex sticky top-0 border flex-col justify-start items-start min-w-0 p-2 sm:p-5 transition-all duration-700 
        ${
          isOpen
            ? "w-28 sm:w-1/5 lg:w-1/6 h-auto lg:h-screen"
            : "w-12 sm:w-16 lg:w-20 h-auto lg:h-screen"
        }
      `}
    >
      <button onClick={handleClick} className="mb-2">
        {isOpen ? <PanelRight /> : <PanelLeft />}
      </button>
      {!isOpen ? (
        <div className="w-full flex justify-center">
          <Search />
        </div>
      ) : (

          <main className="overflow-hidden w-full">
            <h1 className="text-base sm:text-lg py-1 sm:py-3 truncate max-w-full">
              Dashboards
            </h1>
            <div className="flex items-center gap-1 sm:gap-2 w-full">
              <Search />
              <h1 className="text-sm sm:text-base truncate max-w-full">
                LeftSide
              </h1>
            </div>
          </main>
      )}
    </div>
  );
};

export default RightSide;
