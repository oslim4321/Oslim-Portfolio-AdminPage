import React from "react";
import "./globals.css";
import Link from "next/link";

const page = async () => {
  return (
    <section>
      <h1>Welcome Admin Go to dashboard</h1>
      <Link href="/admin"> Go Dashboard</Link>
    </section>
  );
};

export default page;
