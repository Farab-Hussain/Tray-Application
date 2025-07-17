"use client";
import { PanelLeft, PanelRight, Search } from "lucide-react";
import React, { useRef, useState } from "react";

const LeftSide = () => {
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
      <button onClick={handleClick} className="cursor-pointer mb-2">
        {isOpen ? <PanelLeft /> : <PanelRight />}
      </button>
      {!isOpen ? (
        <div>
          <Search />
        </div>
      ) : (
        <>
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
            {/* Add navigation links */}
            <nav className="mt-4 flex flex-col gap-2">
              <a href="/earning" className="text-sm sm:text-base px-2 py-1 rounded hover:bg-gray-200 transition-colors">Earning</a>
              <a href="/brokerComission" className="text-sm sm:text-base px-2 py-1 rounded hover:bg-gray-200 transition-colors">Broker Comission</a>
            </nav>
          </main>
          <div className="mt-auto w-full flex justify-center pt-4">
            <img src="/logo.svg" alt="Logo" className="h-16 w-auto" />
          </div>
        </>
      )}
    </div>
  );
};

export default LeftSide;
