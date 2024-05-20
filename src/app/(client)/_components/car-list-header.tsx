"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CarPost } from "@prisma/client";
import { SortDescriptor } from "~/util/sort-descriptor";

export function CarListHeader() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handle(descriptor: string) {
    const params = new URLSearchParams(searchParams);
    if (descriptor) {
      params.set("sortDescriptor", descriptor);
    } else {
      params.delete("sortDescriptor");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function read() {
    return searchParams.get("sortDescriptor");
  }

  const sortOptions: (SortDescriptor<CarPost> & { name: string })[] = [
    { column: "id", direction: "desc", name: "Default" },
    { column: "createdAt", direction: "asc", name: "Newer first" },
    { column: "createdAt", direction: "desc", name: "Older first" },
  ];

  return (
    <div className={"my-4 flex items-center justify-between"}>
      <h4 className={"text-xl font-semibold"}>Posts</h4>
      <Select
        size={"sm"}
        className={"max-w-[150px]"}
        selectedKeys={new Set([read() || JSON.stringify(sortOptions[0])])}
        onSelectionChange={(s) => {
          handle((Array.from(s)[0] ?? "") as string);
        }}
      >
        {sortOptions.map((opt) => {
          return <SelectItem key={JSON.stringify(opt)}>{opt.name}</SelectItem>;
        })}
      </Select>
    </div>
  );
}
