import { useState } from "react";
import { useSortDescriptor } from "~/app/hooks/use-sort-descriptor";
import { usePaginator } from "~/app/hooks/use-paginator";
import { useAsyncList } from "@react-stately/data";
import { SortDescriptor } from "~/util/sort-descriptor";

export type FetchFunctionProps<T> = {
  query?: string;
  page?: number;
  pageSize?: number;
  sortDescriptor?: SortDescriptor<T>;
};

export function useList<T>(
  props: FetchFunctionProps<T>,
  fetchFunction: (
    props: FetchFunctionProps<T>,
  ) => Promise<{ data: Iterable<T>; totalPages: number }>,
) {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const handleSort = useSortDescriptor<T>();
  const paginator = usePaginator(total, props.page || 1);
  console.log(props, total);

  const fetch = async () => {
    setLoading(true);
    const { data, totalPages } = await fetchFunction(props);

    setTotal(totalPages);
    setLoading(false);

    return { items: data };
  };

  const sort = (sortDescriptor: SortDescriptor<T>) => {
    setLoading(true);
    handleSort(sortDescriptor);
  };

  return {
    loading,
    setLoading,
    list: useAsyncList({
      async load() {
        return fetch();
      },
    }),
    sort,
    paginator,
  };
}
