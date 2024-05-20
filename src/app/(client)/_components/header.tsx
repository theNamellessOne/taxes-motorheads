"use client";

import { Yeon_Sung } from "next/font/google";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "~/app/util/debounce";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useAuth } from "~/app/providers/auth-provider";
import { Button } from "@nextui-org/button";
import { Search } from "lucide-react";
import { signOut } from "~/server/service/auth-service";
import { toast } from "react-toastify";
import { Logo } from "~/components/logo";

const font = Yeon_Sung({ subsets: ["latin"], weight: "400" });

export function Header() {
  const { session } = useAuth();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Navbar isBordered className={"z-50"}>
      <NavbarContent className={"flex items-center gap-8"}>
        <NavbarBrand>
          <Link href={"/"} className={"flex items-center gap-4"}>
            <Logo
              className={"fill-primary-foreground"}
              width={30}
              height={30}
            />
            <h1
              className={`text-primary-foreground text-xl font-semibold ${font.className}`}
            >
              Texas Motorheads
            </h1>
          </Link>
        </NavbarBrand>

        <Input
          placeholder="Type to search..."
          size="sm"
          type="search"
          defaultValue={searchParams.get("query")?.toString()}
          onChange={debounce((e: any) => handleSearch(e.target.value))}
          endContent={
            <Button className={"-right-2"} isIconOnly size={"sm"}>
              <Search className={"h-4 w-4"} />
            </Button>
          }
        />

        {session ? (
          <UserMenu />
        ) : (
          <Link href={"/auth"}>
            <Button size={"sm"} color={"primary"}>
              Sign In
            </Button>
          </Link>
        )}
      </NavbarContent>
    </Navbar>
  );
}

const UserMenu = () => {
  const { user } = useAuth();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="shrink-0 transition-transform"
          color="secondary"
          name={user!.username}
          size="sm"
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="max-w-[200px] whitespace-break-spaces font-semibold">
            Signed in as <span className={"italic"}>{user!.email}</span>
          </p>
        </DropdownItem>

        <DropdownItem key="settings" href={"/settings"}>
          My Settings
        </DropdownItem>
        <DropdownItem key="likes" href={"/liked"}>
          My Likes
        </DropdownItem>

        {user?.isAdmin ? (
          <DropdownItem key="admin" href={"/dashboard/car-posts"}>
            Admin Dashboard
          </DropdownItem>
        ) : (
          <DropdownItem key={"placeholder"}></DropdownItem>
        )}

        <DropdownItem
          key="logout"
          color="danger"
          onPress={() => {
            signOut()
              .then(() => toast.success("Signed out", { autoClose: 1000 }))
              .catch(() => toast.error("Could not sign out"));
          }}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
