"use client";
import EarningCard from "@/components/ui/earningCard";
import Table from "@/components/ui/table";

const columns = [
  { key: "clientName", label: "Client Name" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "status", label: "Status" },
];

const data = [
  {
    clientName: "ByeWind",
    date: "2024-06-01",
    amount: "$500",
    status: "Completed",
  },
  {
    clientName: "002",
    date: "2024-06-02",
    amount: "$300",
    status: "In Progress",
  },
  {
    clientName: "003",
    date: "2024-06-03",
    amount: "$800",
    status: "failed",
  },
  {
    clientName: "003",
    date: "2024-06-03",
    amount: "$800",
    status: "Completed",
  },
  {
    clientName: "003",
    date: "2024-06-03",
    amount: "$800",
    status: "failed",
  },
  {
    clientName: "003",
    date: "2024-06-03",
    amount: "$800",
    status: "Completed",
  },
  {
    clientName: "003",
    date: "2024-06-03",
    amount: "$800",
    status: "In Progress",
  },
  {
    clientName: "003",
    date: "2024-06-03",
    amount: "$800",
    status: "Completed",
  },
];
const earningCards = [
  { title: "Earnings", cardTitle: "This Month", number: 7265, increment: 10 },
  { title: "Earnings", cardTitle: "This Month", number: 7265, increment: 10 },
  { title: "Earnings", cardTitle: "This Month", number: 7265, increment: 10 },
  { title: "Earnings", cardTitle: "This Month", number: 7265, increment: +10 },
];

const getPayoutBg = (status: string) => {
  const s = status.toLowerCase();
  if (s === "completed") return "bg-green-100 text-green-800";
  if (s === "in progress") return "bg-yellow-100 text-yellow-800";
  if (s === "failed") return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

const tableData = data.map((row) => ({
  ...row,
  status: (
    <span className={`${getPayoutBg(row.status)} font-semibold rounded-sm px-2 py-1`}>
      {row.status}
    </span>
  ),
}));

const page = () => {
    return (
    <main className="layout w-full h-full flex flex-col justify-center items-start px-2 md:px-8 py-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Overview</h1>
      <div className="flex md:flex-row flex-col justify-between items-center my-5 gap-5 h-fit w-full">
        {earningCards.map((card, index) => (
            
          <EarningCard
            key={index}
            title={card.title}
            cardTitle={card.cardTitle}
            number={card.number}
            increment={card.increment.toString()}
            className={index % 2 === 0 ? "bg-[#ADEBB3]" : "bg-[#FFCB4B]"}
          />
        ))}
      </div>
      <div className="w-full h-full bg-[#F9F9FA] p-2 md:p-5 shadow-2xs rounded-xl">
        <Table title="Funds Transactions" columns={columns} data={tableData} />
      </div>
    </main>
  );
};

export default page;