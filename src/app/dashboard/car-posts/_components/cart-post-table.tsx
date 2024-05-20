"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { CarPost } from "@prisma/client";
import { FetchFunctionProps, useList } from "~/app/hooks/use-list";
import {
  CarPostTableCellKey,
  useCarPostTableCell,
} from "../_hooks/use-car-post-table-cell";
import {
  convertSortDescriptorToPrisma,
  convertSortDescriptorToReact,
} from "~/app/util/sort-direction-converter";
import { fetchPosts } from "~/server/service/car-post-service";
import Loading from "~/app/loading";
import { DashboardSearch } from "../../_components/dashboard-search";

export type TableProps = {};

export function CarPostTable(props: FetchFunctionProps<CarPost>) {
  const { loading, list, sort, paginator } = useList<CarPost>(
    props,
    fetchPosts,
  );
  const renderCell = useCarPostTableCell(list.reload);

  const columns = [
    { name: "Id", uid: "id" },
    { name: "Title", uid: "title" },
    { name: "Preview", uid: "preview" },
    { name: "Image", uid: "imgUrl" },
    { name: "", uid: "actions" },
  ];

  return (
    <>
      <Table
        topContent={<DashboardSearch />}
        bottomContent={paginator}
        sortDescriptor={{
          ...props.sortDescriptor,
          direction: convertSortDescriptorToReact(
            props.sortDescriptor?.direction || "desc",
          ),
        }}
        onSortChange={(desc) => {
          sort({
            column: desc.column as keyof CarPost,
            direction: convertSortDescriptorToPrisma(desc.direction),
          });
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn allowsSorting key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          loadingContent={<Loading />}
          isLoading={loading}
          items={list.items}
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as CarPostTableCellKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
