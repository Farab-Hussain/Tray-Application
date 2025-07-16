import React from "react";
import Image from "next/image";


const ServiceCard = ({ name, desc, tag, image }:{name:string,desc:string,tag:string,image:string}) => {
  return (
    <div className="h-fit w-full flex justify-between items-center gap-5">
      <div className="h-[155px] w-full shadow-2xl rounded-sm p-5">
        <div className="h-fit w-full flex justify-start items-center py-3">
          <Image src="/next.svg" height={100} width={100} alt="job" />
          <div>
            <h1 className="text=[14px] font-bold">{name}</h1>
            <p className="text-[12px] text-black/40 font-medium">{desc}</p>
          </div>
        </div>
        <label className="text-[10px] bg-[#EFEFEF] px-2 py-1 mx-3 rounded-sm">
          {tag}
        </label>
        <label className="text-[10px] bg-[#EFEFEF] px-2 py-1 mx-3 rounded-sm">
          {tag}
        </label>
        <label className="text-[10px] bg-[#EFEFEF] px-2 py-1 mx-3 rounded-sm">
          {tag}
        </label>
        <div className="flex justify-between items-center py-3">
          <h1 className="text-[#FFCB4B]">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </h1>
          {/* <div> */}
          <h1>✅Verified Service</h1>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
