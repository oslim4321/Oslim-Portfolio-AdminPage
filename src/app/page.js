import React from "react";
import AddProject from "./UploadProject/AddProject";
import "./globals.css";
import { Link } from "react-admin";

const page = async () => {
  return (
    <section>
      {/* <AddProject /> */}
      <h1>Welcomr Admin Go to dashboard</h1>
      <Link href="/admin">
        {" "}
        <button>Go Dashboard</button>
      </Link>
    </section>
  );
};

export default page;
