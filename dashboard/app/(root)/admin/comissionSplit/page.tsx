"use client";
import EarningCard from "@/components/ui/earningCard";
import Table from "@/components/ui/table";
import { ArrowDownNarrowWide, DotSquare } from "lucide-react";
import React, { useState } from "react";

const columns = [
  { key: "ConsultantName", label: "Consultant Name" },
  { key: "TotalEarned", label: "Total Earned" },
  { key: "PlatformCommission", label: "Platform Commission" },
  { key: "PayoutStatus", label: "Payout Status" },
];

const data = [
  {
    ConsultantName: "Jones",
    TotalEarned: "2024-06-01",
    PlatformCommission: "$500",
    PayoutStatus: "Paid To Broker",
  },
  {
    ConsultantName: "Jacob",
    TotalEarned: "2024-06-02",
    PlatformCommission: "$300",
    PayoutStatus: "Payment Pending",
  },
  {
    ConsultantName: "Wills",
    TotalEarned: "2024-06-03",
    PlatformCommission: "$800",
    PayoutStatus: "failed",
  },
  {
    ConsultantName: "Wills",
    TotalEarned: "2024-06-03",
    PlatformCommission: "$800",
    PayoutStatus: "Paid To Broker",
  },
  {
    ConsultantName: "Wills",
    TotalEarned: "2024-06-03",
    PlatformCommission: "$800",
    PayoutStatus: "failed",
  },
  {
    ConsultantName: "Wills",
    TotalEarned: "2024-06-03",
    PlatformCommission: "$800",
    PayoutStatus: "Paid To Broker",
  },
  {
    ConsultantName: "Wills",
    TotalEarned: "2024-06-03",
    PlatformCommission: "$800",
    PayoutStatus: "payment pending",
  },
  {
    ConsultantName: "003",
    TotalEarned: "2024-06-03",
    PlatformCommission: "$800",
    PayoutStatus: "Paid To Broker",
  },
];

const card = [
  {
    cardTitle: "Total CommissionEarned",
    number:4324,
    increment:"+3.5%"
  },
  {
    cardTitle: "Total CommissionEarned",
    number:4324,
    increment:"+3.5%"
  },
  {
    cardTitle: "Total CommissionEarned",
    number:4324,
    increment:"+3.5%"
  },
  {
    cardTitle: "Total CommissionEarned",
    number:4324,
    increment:"+3.5%"
  },
];

const page = () => {
  return (
    <main className="layout w-full h-full  flex flex-col justify-center items-start">
      <h1 className="text-6xl font-bold">Overview</h1>
      <div className="flex justify-between items-center gap-10 w-full my-5">
        {card.map((cardItem, index) => (
          <EarningCard
            key={index}
            cardTitle={cardItem.cardTitle}
            title={""}
            number={cardItem.number}
            increment={cardItem.increment}
            className={index % 2 === 0 ? "bg-[#ADEBB3]" : "bg-[#FFCB4B]"}
          />
        ))}
      </div>
      <div className="h-fit w-full bg-[#F9F9FA] p-5 shadow-2xs rounded-xl">
        <Table
          title="Broker Commission Tracking"
          columns={columns}
          data={data}
        />
      </div>
    </main>
  );
};

export default page;
