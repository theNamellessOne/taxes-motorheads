"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentUpdateInput,
  commentUpdateSchema,
} from "~/schema/comment-schema";
import { useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Comment } from "@prisma/client";
import { updateComment } from "~/server/service/comment-service";

export function CommentForm(props: { defaultValues: Comment }) {
  const form = useForm<CommentUpdateInput>({
    mode: "onChange",
    resolver: zodResolver(commentUpdateSchema),
    defaultValues: props.defaultValues,
  });
  const { isSubmitSuccessful, isSubmitting, errors, isValid } = form.formState;

  useEffect(form.reset, [isSubmitSuccessful]);

  const handleSubmit = async (data: CommentUpdateInput) => {
    try {
      await updateComment(props.defaultValues.id, data);
      toast.success("Comment saved", { autoClose: 1000 });
    } catch (e) {
      toast.error(String(e));
    }
  };

  const router = useRouter();

  return (
    <div className={"flex flex-col gap-3"}>
      <nav className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-4"}>
          <Button
            isIconOnly
            variant={"light"}
            size={"sm"}
            isDisabled={isSubmitting}
            onPress={router.back}
          >
            <ArrowLeft className={"h-5 w-5"} />
          </Button>

          <h4 className={"text-lg font-semibold"}>New Post</h4>
        </div>

        <Button
          size={"sm"}
          isDisabled={!isValid || isSubmitting}
          color={"secondary"}
          isLoading={isSubmitting}
          onPress={() => form.handleSubmit(handleSubmit)()}
        >
          Save
        </Button>
      </nav>

      <Textarea
        {...form.register("content")}
        label={"Content"}
        size={"sm"}
        isDisabled={isSubmitting}
        isInvalid={!!errors.content}
        errorMessage={errors.content?.message}
      />
    </div>
  );
}
