import { Comment } from "@prisma/client";
import { readSearchParams, SearchParams } from "~/app/util/read-search-params";
import { Suspense } from "react";
import Loading from "~/app/loading";
import { CommentTable } from "./_components/comment-table";

export default async function ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = readSearchParams<Comment>(searchParams);

  return (
    <>
      <nav className={"flex w-full items-center justify-between pb-4"}>
        <h4 className={"text-xl font-bold"}>Comments</h4>
      </nav>

      <Suspense key={JSON.stringify(params)} fallback={<Loading />}>
        <CommentTable {...params} />
      </Suspense>
    </>
  );
}
