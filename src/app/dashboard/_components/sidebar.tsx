"use client";

import { Home, LogOut, MessageCircle, Newspaper, User } from "lucide-react";
import React from "react";
import { Button } from "@nextui-org/button";
import { SidebarItem } from "./sidebar-item";
import Link from "next/link";
import { Logo } from "~/components/logo";
import { Yeon_Sung } from "next/font/google";

export const dashboardMenuItems = [
  {
    icon: <Home />,
    name: "Home",
    href: "/",
  },
  {
    icon: <User />,
    name: "Users",
    href: "/dashboard/users",
  },
  {
    icon: <Newspaper />,
    name: "Posts",
    href: "/dashboard/car-posts",
  },
  {
    icon: <MessageCircle />,
    name: "Comments",
    href: "/dashboard/comments",
  },
];

const font = Yeon_Sung({ subsets: ["latin"], weight: "400" });

export function Sidebar() {
  return (
    <aside
      className={
        "border-r-default border-r-0.5 fixed top-0 flex h-full w-[250px] flex-col overflow-y-auto border-r py-6"
      }
    >
      <Link href={"/"} className={"flex items-center gap-4 py-4 pb-6 pl-6"}>
        <Logo className={"fill-primary-foreground"} width={30} height={30} />
        <h1
          className={`text-primary-foreground text-xl font-semibold ${font.className}`}
        >
          Texas Motorheads
        </h1>
      </Link>

      {dashboardMenuItems.map((item, idx) => {
        return <SidebarItem {...item} key={idx} />;
      })}

      <div className={"bottom-0 ml-2 mt-auto w-full"}>
        <Button color={"danger"} variant={"light"} onClick={() => {}}>
          <LogOut /> Вийти
        </Button>
      </div>
    </aside>
  );
}
