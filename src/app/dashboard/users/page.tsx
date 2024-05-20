import { User } from "@prisma/client";
import { UserTable } from "./_components/user-table";
import { readSearchParams, SearchParams } from "~/app/util/read-search-params";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "~/app/loading";

export default async function ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = readSearchParams<User>(searchParams);

  return (
    <>
      <nav className={"flex w-full items-center justify-between pb-4"}>
        <h4 className={"text-xl font-bold"}>Users</h4>
      </nav>

      <Suspense key={JSON.stringify(params)} fallback={<Loading />}>
        <UserTable {...params} />
      </Suspense>
    </>
  );
}
