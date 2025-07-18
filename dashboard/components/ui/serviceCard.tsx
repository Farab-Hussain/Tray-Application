import React from "react";
import Image from "next/image";

type ServiceCardProps = {
  name: string;
  desc: string;
  tag: string;
  image: string;
  onClick?: () => void;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ name, desc, tag, image, onClick }) => {
  return (
    <div
      className="w-full max-w-full flex flex-col sm:flex-row justify-between items-stretch gap-3 sm:gap-5 cursor-pointer hover:shadow-yellow-300 transition-shadow"
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={e => { if (e.key === 'Enter' && onClick) onClick(); }}
      style={{ outline: 'none' }}
    >
      <div className="w-full shadow-2xl rounded-sm p-3 sm:p-5 bg-white overflow-hidden">
        <div className="flex flex-col xs:flex-row sm:flex-row justify-start items-center gap-2 py-2 sm:py-3">
          <Image
            src={image || "/next.svg"}
            height={60}
            width={60}
            alt="job"
            className="w-12 h-12 sm:w-[100px] sm:h-[100px] object-contain"
          />
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h1 className="text-[14px] sm:text-[16px] font-bold break-words">{name}</h1>
            <p className="text-[12px] sm:text-[14px] text-black/40 font-medium break-words">
              {desc}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 my-2 justify-center sm:justify-start">
          <label className="text-[10px] sm:text-[12px] bg-[#EFEFEF] px-2 py-1 rounded-sm">
            {tag}
          </label>
          <label className="text-[10px] sm:text-[12px] bg-[#EFEFEF] px-2 py-1 rounded-sm">
            {tag}
          </label>
          <label className="text-[10px] sm:text-[12px] bg-[#EFEFEF] px-2 py-1 rounded-sm">
            {tag}
          </label>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 sm:py-3 gap-2">
          <h1 className="text-[#FFCB4B] text-[14px] sm:text-[16px]">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </h1>
          <h1 className="text-[12px] sm:text-[14px] text-green-600 font-semibold">
            ✅Verified Service
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
