// components/DataTable.tsx
import React from "react";
import Image from "next/image";

const columns = [
  { key: "serviceId", label: "Service ID" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "payout", label: "Payout" },
];

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: Record<string, any>[];
}

const getPayoutBg = (status: string) => {
  const s = status.toLowerCase();
  if (s === "paid to broker") return "bg-green-100 text-green-800";
  if (s === "payment pending") return "bg-yellow-100 text-yellow-800";
  if (s === "failed") return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

const Table: React.FC<DataTableProps> = ({ title, columns, data }) => {
  return (
    <div className="h-full w-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="w-full overflow-x-auto sm:overflow-x-visible relative">
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-gray-200 to-transparent block sm:hidden z-10" />
        <table className="min-w-[600px] w-full border-separate border-spacing-y-1">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-left whitespace-nowrap text-sm md:text-base"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="bg-white rounded-lg">
                {columns.map((col, colIdx) => {
                  const isPayout = col.key === "payout";
                  const isAmount = col.key === "amount";
                  const isServiceId = col.key === "serviceId";
                  const payoutStatus = row["payout"];
                  const payoutStatusLower = (payoutStatus || "").toLowerCase();
                  return (
                    <td
                      key={col.key}
                      className={`px-2 md:px-4 py-2 whitespace-nowrap text-xs md:text-sm ${
                        colIdx === 0 ? "rounded-l-lg" : ""
                      } ${colIdx === columns.length - 1 ? "rounded-r-lg" : ""}`}
                    >
                      {isServiceId ? (
                        <span className="flex items-center gap-2">
                          <Image
                            src="/id.svg"
                            alt="id icon"
                            width={18}
                            height={18}
                            unoptimized
                          />
                          {row[col.key]}
                        </span>
                      ) : isPayout ? (
                        <span
                          className={`${getPayoutBg(
                            row[col.key]
                          )} font-semibold rounded-sm px-2 py-1`}
                        >
                          {row[col.key]}
                        </span>
                      ) : isAmount ? (
                        <span
                          className={
                            payoutStatusLower === "active"
                              ? "text-red-500"
                              : payoutStatusLower === "paid to broker"
                              ? ""
                              : "text-gray-400"
                          }
                        >
                          {row[col.key]}
                        </span>
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
