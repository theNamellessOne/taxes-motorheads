import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SortDescriptor } from "~/util/sort-descriptor";

export function useSortDescriptor<T>() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return function handleSort(sortDescriptor: SortDescriptor<T>) {
    const params = new URLSearchParams(searchParams);
    if (sortDescriptor) {
      params.set("sortDescriptor", JSON.stringify(sortDescriptor));
    } else {
      params.delete("sortDescriptor");
    }
    replace(`${pathname}?${params.toString()}`);
  };
}
