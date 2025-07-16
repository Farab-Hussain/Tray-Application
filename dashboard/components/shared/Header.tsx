"use client";
import React from "react";
import { PanelLeft, PanelRight, Slash, Menu, Search, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <main className="layout">
    <header className="flex  w-full justify-between items-center  p-2 sm:p-5 relative">
      {/* Mobile menu icon */}
      <button
        className="block sm:hidden mr-2"
        onClick={() => setShowMenu(true)}
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>
      <h1 className="text-lg sm:text-2xl flex-1 text-center sm:text-left">
        Header
      </h1>
      <div className="flex flex-wrap justify-between items-center border-1 p-1 rounded-sm gap-1 sm:gap-2">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search"
          className="outline-none px-1 sm:px-2 text-base w-20 sm:w-40"
        />
        <Slash size={20} className="border-1 p-1 rounded-sm" />
      </div>
      {/* Overlay menu for mobile */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex justify-start transition-all duration-500">
          <div className="bg-white w-56 h-full p-4 shadow-lg flex flex-col gap-4">
            <button
              className="self-end mb-2"
              onClick={() => setShowMenu(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            {/* Sidebar content here (copy from LeftSide/RightSide as needed) */}
            <h1 className="text-base font-semibold mb-2">Dashboards</h1>
            <div className="flex items-center gap-2 mb-2">
              <Search />
              <span className="text-sm">LeftSide</span>
            </div>
            <div className="flex items-center gap-2">
              <Search />
              <span className="text-sm">RightSide</span>
            </div>
            <img
              src="/logo.svg"
              alt="Logo"
              className="mt-auto mb-2 mx-auto h-16 w-auto"
            />
          </div>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setShowMenu(false)} />
        </div>
      )}
    </header>
    </main>
  );
};

export default Header;
