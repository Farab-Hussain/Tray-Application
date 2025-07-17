import Image from "next/image";
import React from "react";

interface EarningCardProps {
  title: string;
  cardTitle: string;
  className?: string;
  number: number;
  increment: string;
}

const EarningCard: React.FC<EarningCardProps> = ({
  className,
  cardTitle,
  number,
  increment,
}) => {
  return (
    <div
      className={`w-full md:w-[220px] min-w-0 bg-[#ADEBB3] flex flex-col justify-center items-start rounded-2xl p-4 md:p-5 ${className}`}
    >
      <h3 className="text-base md:text-lg font-semibold">{cardTitle}</h3>
      <div className="flex justify-between items-center py-2 gap-5 w-full">
        <h4 className="text-xl md:text-2xl font-bold">{number}</h4>
        <h6 className="flex justify-center items-center text-sm md:text-base">
          {increment}
          <Image
            src="/ArrowRise.svg"
            alt="id icon"
            width={18}
            height={18}
            unoptimized
          />
        </h6>
      </div>
    </div>
  );
};

export default EarningCard;
