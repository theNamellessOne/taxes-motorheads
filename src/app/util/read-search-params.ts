import { SortDescriptor } from "~/util/sort-descriptor";

export type SearchParams = {
  query?: string;
  page?: string;
  pageSize?: string;
  sortDescriptor?: string;
};

export function readSearchParams<T>(
  searchParams: SearchParams | undefined,
  defaultSortDescriptor?: SortDescriptor<T>,
) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 12;
  const sortDescriptor = searchParams?.sortDescriptor
    ? JSON.parse(searchParams?.sortDescriptor)
    : {
        column: defaultSortDescriptor?.column ?? "id",
        direction: defaultSortDescriptor?.direction ?? "desc",
      };

  return { query, page, pageSize, sortDescriptor };
}
