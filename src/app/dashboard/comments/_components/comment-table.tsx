"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Comment } from "@prisma/client";
import { FetchFunctionProps, useList } from "~/app/hooks/use-list";
import {
  CommentTableCellKey,
  useCommentTableCell,
} from "../_hooks/use-comment-table-cell";
import {
  convertSortDescriptorToPrisma,
  convertSortDescriptorToReact,
} from "~/app/util/sort-direction-converter";
import Loading from "~/app/loading";
import { DashboardSearch } from "../../_components/dashboard-search";
import { fetchComments } from "~/server/service/comment-service";

export type TableProps = {};

export function CommentTable(props: FetchFunctionProps<Comment>) {
  const { loading, list, sort, paginator } = useList<Comment>(
    props,
    fetchComments,
  );
  const renderCell = useCommentTableCell(list.reload);

  const columns = [
    { name: "Id", uid: "id" },
    { name: "UserId", uid: "authorId" },
    { name: "PostId", uid: "postId" },
    { name: "Content", uid: "content" },
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
            column: desc.column as keyof Comment,
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
                  {renderCell(item, columnKey as CommentTableCellKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
