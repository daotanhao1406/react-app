import React, { ReactNode, useState } from "react";
import OpeningHoursPicker from "./components/OpeningHoursPicker";
import RelationalPolicyCard from "./components/RelationalPolicyCard";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={"root"}>
        <div
          style={{ padding: 50 }}
          className="h-full flex justify-center items-center w-full"
        >
          <RelationalPolicyCard />
        </div>
      </body>
    </html>
  );
}
