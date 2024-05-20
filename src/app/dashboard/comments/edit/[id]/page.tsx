import { redirect } from "next/navigation";
import { CommentForm } from "../../_components/comment-form";
import { fetchCommentById } from "~/server/service/comment-service";

export default async function ({ params }: { params: { id: string } }) {
  const data = await fetchCommentById(Number(params.id));
  if (!data) redirect("/dashboard/comments");

  return <CommentForm defaultValues={data} />;
}
