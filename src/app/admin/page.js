"use client";
import React from "react";
import dynamic from "next/dynamic";

const Apps = dynamic(() => import("./App"), { ssr: false });

// import Apps from "./App";
const page = () => {
  return (
    <div>
      <Apps />
    </div>
  );
};

export default page;
