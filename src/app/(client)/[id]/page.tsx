import { redirect } from "next/navigation";
import { fetchPostById } from "~/server/service/car-post-service";
import { CarPostView } from "./_components/car-post-view";

export default async function ({ params }: { params: { id: string } }) {
  const post = await fetchPostById(Number(params.id));
  if (!post) redirect("/");

  return (
    <div className={"mx-auto my-4 max-w-[1024px]"}>
      <CarPostView {...post} />
    </div>
  );
}
