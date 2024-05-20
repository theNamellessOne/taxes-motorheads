"use client";

import { Button } from "@nextui-org/button";
import { useAuth } from "~/app/providers/auth-provider";
import { useForm } from "react-hook-form";
import {
  CommentCreateInput,
  commentCreateSchema,
} from "~/schema/comment-schema";
import { CarPost } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { Send } from "lucide-react";
import { createComment } from "~/server/service/comment-service";
import { toast } from "react-toastify";

export function CarPostCommentForm(carPost: CarPost) {
  const auth = useAuth();

  if (!auth.session || !auth.user)
    return (
      <div
        className={
          "bg-content1 rounded-large flex items-center justify-between p-2"
        }
      >
        <p>You must be signed in to comment here</p>
        <Button variant={"solid"} color={"secondary"}>
          Sign In
        </Button>
      </div>
    );

  const form = useForm<CommentCreateInput>({
    mode: "onChange",
    resolver: zodResolver(commentCreateSchema),
    defaultValues: {
      postId: carPost.id,
    },
  });
  const { isSubmitting, errors, isValid } = form.formState;

  const handleSubmit = async (data: CommentCreateInput) => {
    try {
      await createComment(data);
      toast.success("Comment saved", { autoClose: 1000 });
    } catch (e) {
      toast.error(String(e));
    }
  };

  return (
    <div className={"bg-content1 rounded-large flex gap-2 p-2"}>
      <Avatar
        isBordered
        color="secondary"
        name={auth.user.username}
        className={"m-2 shrink-0"}
        size="sm"
      />

      <Textarea
        {...form.register("content")}
        label={"Content"}
        size={"sm"}
        isDisabled={isSubmitting}
        isInvalid={!!errors.content}
        errorMessage={errors.content?.message}
      />

      <Button
        size={"sm"}
        isDisabled={!isValid || isSubmitting}
        color={"secondary"}
        isLoading={isSubmitting}
        isIconOnly
        onPress={() => form.handleSubmit(handleSubmit)()}
      >
        <Send className={"h-4 w-4"} />
      </Button>
    </div>
  );
}
