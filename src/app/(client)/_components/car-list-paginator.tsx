"use client";

import { usePaginator } from "~/app/hooks/use-paginator";

export function CarListPaginator(props: { total: number; page: number }) {
  return usePaginator(props.total, props.page);
}
