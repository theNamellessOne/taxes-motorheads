"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type SidebarItemProps = {
  icon: ReactNode;
  name: string;
  href: string;
};

export function SidebarItem({ icon, name, href }: SidebarItemProps) {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center transition-colors ${
          isActive && "bg-secondary text-secondary-foreground font-semibold"
        } hover:bg-secondary hover:text-secondary-foreground relative py-4 pl-6 pr-4`}
      >
        {icon}
        <p className={"ml-4 text-lg"}>{name}</p>
      </div>
    </Link>
  );
}
