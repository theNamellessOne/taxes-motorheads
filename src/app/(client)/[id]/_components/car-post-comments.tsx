import { CarPost, Comment } from "@prisma/client";
import { User } from "lucia";
import { fetchCommentsByCarPostId } from "~/server/service/comment-service";
import { CarPostCommentForm } from "./car-post-comment-form";
import { Avatar } from "@nextui-org/avatar";

export async function CarPostComments(carPost: CarPost) {
  const { data } = await fetchCommentsByCarPostId(carPost.id);

  return (
    <div className={"flex flex-col"}>
      <h4 className={"text-lg"}>Comments</h4>
      <CarPostCommentForm {...carPost} />
      <div className={"mt-2"}></div>
      {data.length === 0 && (
        <p className={"text-center italic"}>Not comments here yet..</p>
      )}

      <div className={"flex flex-col gap-2"}>
        {data.map((comment) => (
          <CarPostComment {...comment} />
        ))}
      </div>
    </div>
  );
}

function CarPostComment(comment: Comment & { author: User }) {
  return (
    <div className={"bg-content1 rounded-large flex gap-2 p-2"}>
      <Avatar
        isBordered
        color="secondary"
        name={comment.author.username}
        className={"m-2 shrink-0"}
        size="sm"
      />

      <div className={"mt-1 w-full"}>
        <p>{comment.content}</p>
        <p className={"ml-auto mt-4 w-fit text-xs italic"}>
          {comment.createdAt.toLocaleString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
