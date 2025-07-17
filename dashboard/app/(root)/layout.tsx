import Header from "@/components/shared/Header";
import LeftSide from "@/components/shared/LeftSide";
import RightSide from "@/components/shared/RightSide";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-dvh w-full overflow-x-hidden bg-background">
      <LeftSide />
      <div className="flex flex-col flex-1 min-w-0 justify-center items-center">
        <div className="h-fit w-full border-1 ">
          <Header />
        </div>
        <div className="flex-1 w-full p-3 sm:p-10 min-w-0 overflow-x-auto">
          {children}
        </div>
      </div>
      <RightSide />
    </main>
  );
};

export default layout;
