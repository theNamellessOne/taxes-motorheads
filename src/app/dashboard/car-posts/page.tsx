import { CarPost } from "@prisma/client";
import { CarPostTable } from "./_components/cart-post-table";
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
  const params = readSearchParams<CarPost>(searchParams);

  return (
    <>
      <nav className={"flex w-full items-center justify-between pb-4"}>
        <h4 className={"text-xl font-bold"}>Car Posts</h4>

        <Link href={"car-posts/new"}>
          <Button color={"primary"} size={"sm"} isIconOnly>
            <Plus className={"h-5 w-5"} />
          </Button>
        </Link>
      </nav>

      <Suspense key={JSON.stringify(params)} fallback={<Loading />}>
        <CarPostTable {...params} />
      </Suspense>
    </>
  );
}
