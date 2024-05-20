import { redirect } from "next/navigation";
import React from "react";
import { validateRequest } from "~/server/auth";
import { Sidebar } from "./_components/sidebar";

export default async function ({ children }: { children: React.ReactNode }) {
  const v = await validateRequest();

  if (!v.session || !v.user.isAdmin) redirect("/auth");

  return (
    <>
      <div className={"hidden md:block"}>
        <Sidebar />
      </div>
      <main className={"h-full p-4 md:ml-[250px]"}>{children}</main>
    </>
  );
}
