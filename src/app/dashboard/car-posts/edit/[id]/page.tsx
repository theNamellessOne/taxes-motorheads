import { redirect } from "next/navigation";
import { fetchPostById } from "~/server/service/car-post-service";
import { CarPostForm } from "../../_components/car-post-form";

export default async function ({ params }: { params: { id: string } }) {
  const data = await fetchPostById(Number(params.id));
  if (!data) redirect("/dashboard/car-posts");

  return <CarPostForm defaultValues={data} />;
}
