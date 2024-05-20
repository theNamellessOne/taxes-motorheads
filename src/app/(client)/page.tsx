import { fetchPosts } from "~/server/service/car-post-service";
import { fetchUserLikes } from "~/server/service/like-service";
import { validateRequest } from "~/server/auth";
import { CarPost, Like } from "@prisma/client";
import { CarPostList } from "./_components/car-list";
import { CarListHeader } from "./_components/car-list-header";
import { readSearchParams, SearchParams } from "~/app/util/read-search-params";
import { Suspense } from "react";
import Loading from "../loading";
import { CarListPaginator } from "./_components/car-list-paginator";

export default async function ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const { session } = await validateRequest();
  const params = readSearchParams<CarPost>(searchParams);

  const postData = await fetchPosts(params);
  const likes: Like[] = session ? await fetchUserLikes(session.userId) : [];

  return (
    <Suspense key={JSON.stringify(params)} fallback={<Loading />}>
      <div className={"mx-auto max-w-[1024px]"}>
        <CarListHeader />
        <div className={"grid grid-cols-3 gap-2"}>
          <CarPostList {...postData} likes={likes} />
        </div>
        <div className={"mt-2"}></div>
        <CarListPaginator page={params.page || 1} total={postData.totalPages} />
      </div>
    </Suspense>
  );
}
