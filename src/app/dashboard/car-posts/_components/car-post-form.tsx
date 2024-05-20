"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CarPostCreateInput,
  carPostCreateSchema,
} from "~/schema/car-post-schema";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { createPost, updatePost } from "~/server/service/car-post-service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CarPost } from "@prisma/client";

export function CarPostForm(props: { defaultValues?: CarPost }) {
  const form = useForm<CarPostCreateInput>({
    mode: "onChange",
    resolver: zodResolver(carPostCreateSchema),
    defaultValues: props.defaultValues,
  });
  const { isSubmitSuccessful, isSubmitting, errors, isValid } = form.formState;

  useEffect(form.reset, [isSubmitSuccessful]);

  const handleSubmit = async (data: CarPostCreateInput) => {
    try {
      if (props.defaultValues?.id) {
        await updatePost(props.defaultValues.id, data);
      } else {
        await createPost(data);
      }

      toast.success("Post saved", { autoClose: 1000 });
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

      <Input
        {...form.register("title")}
        label={"Title"}
        size={"sm"}
        isDisabled={isSubmitting}
        isInvalid={!!errors.title}
        errorMessage={errors.title?.message}
      />

      <Input
        {...form.register("imgUrl")}
        label={"Image Url"}
        size={"sm"}
        isDisabled={isSubmitting}
        isInvalid={!!errors.imgUrl}
        errorMessage={errors.imgUrl?.message}
      />

      <Textarea
        {...form.register("preview")}
        label={"Preview"}
        size={"sm"}
        isDisabled={isSubmitting}
        isInvalid={!!errors.preview}
        errorMessage={errors.preview?.message}
      />
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
