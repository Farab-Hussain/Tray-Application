"use client";
import Table from "@/components/ui/table";
import { ArrowDownNarrowWide, DotSquare } from "lucide-react";
import React, { useState } from "react";

const columns = [
  { key: "serviceId", label: "Service ID" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "payout", label: "Payout" },
];

const data = [
  {
    serviceId: "001",
    date: "2024-06-01",
    amount: "$500",
    payout: "Paid To Broker",
  },
  {
    serviceId: "002",
    date: "2024-06-02",
    amount: "$300",
    payout: "Payment Pending",
  },
  {
    serviceId: "003",
    date: "2024-06-03",
    amount: "$800",
    payout: "failed",
  },
  {
    serviceId: "003",
    date: "2024-06-03",
    amount: "$800",
    payout: "Paid To Broker",
  },
  {
    serviceId: "003",
    date: "2024-06-03",
    amount: "$800",
    payout: "failed",
  },
  {
    serviceId: "003",
    date: "2024-06-03",
    amount: "$800",
    payout: "Paid To Broker",
  },
  {
    serviceId: "003",
    date: "2024-06-03",
    amount: "$800",
    payout: "payment pending",
  },
  {
    serviceId: "003",
    date: "2024-06-03",
    amount: "$800",
    payout: "Paid To Broker",
  },
];

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="layout w-full h-full  flex  justify-center items-start">
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
