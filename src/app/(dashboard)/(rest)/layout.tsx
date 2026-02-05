import React from "react";
import AppHeader from "@/components/app-header";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <>
      <AppHeader />
      <main className=" flex-1">{children}</main>
    </>
  );
};

export default layout;
