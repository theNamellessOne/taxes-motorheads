"use client";

import { Input } from "@nextui-org/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "~/app/util/debounce";

export function DashboardSearch() {
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
    <Input
      autoFocus
      size={"sm"}
      type={"search"}
      label={"Type to search..."}
      defaultValue={searchParams.get("query")?.toString()}
      onChange={debounce((e: any) => handleSearch(e.target.value))}
    />
  );
}
