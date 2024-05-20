import { redirect } from "next/navigation";
import { validateRequest } from "~/server/auth";
import { fetchLikedPosts } from "~/server/service/like-service";
import { CarPostList } from "../_components/car-list";

export default async function () {
  const auth = await validateRequest();
  if (!auth.session) redirect("/");

  const data = await fetchLikedPosts(auth.session.userId);

  return (
    <div className={"mx-auto max-w-[1024px]"}>
      <h4 className={"my-4 text-xl font-semibold"}>Liked Posts</h4>
      <div className={"grid grid-cols-3 gap-2"}>
        <CarPostList
          totalPages={0}
          data={data.map((d) => d.carPost)}
          likes={data}
        />
      </div>
    </div>
  );
}
