"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { User } from "@prisma/client";
import { FetchFunctionProps, useList } from "~/app/hooks/use-list";
import {
  convertSortDescriptorToPrisma,
  convertSortDescriptorToReact,
} from "~/app/util/sort-direction-converter";
import Loading from "~/app/loading";
import { fetchUsers } from "~/server/service/user-service";
import { UserTableCellKey, useUserTableCell } from "../_hooks/user-table-cell";
import { DashboardSearch } from "../../_components/dashboard-search";

export type TableProps = {};

export function UserTable(props: FetchFunctionProps<User>) {
  const { loading, list, sort, paginator } = useList<User>(props, fetchUsers);
  const renderCell = useUserTableCell(list.reload);

  const columns = [
    { name: "Id", uid: "id" },
    { name: "Username", uid: "username" },
    { name: "Email", uid: "email" },
    { name: "IsAdmin", uid: "isAdmin" },
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
            column: desc.column as keyof User,
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
                  {renderCell(item, columnKey as UserTableCellKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
