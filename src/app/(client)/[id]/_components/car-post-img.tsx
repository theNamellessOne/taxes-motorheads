"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { CarPost } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function CarPostImg(carPost: CarPost) {
  const router = useRouter();

  return (
    <div className={"rounded-medium relative overflow-hidden "}>
      <div
        className={
          "bg-content1 absolute top-0 z-40 flex w-full items-center gap-4 p-2"
        }
      >
        <Button isIconOnly variant={"light"} size={"sm"} onPress={router.back}>
          <ArrowLeft className={"h-5 w-5"} />
        </Button>

        <h4 className={"text-lg font-semibold"}>{carPost.title}</h4>
      </div>

      <Image
        classNames={{
          wrapper: "!max-w-full w-full ",
          img: "w-full object-cover",
        }}
        src={carPost.imgUrl}
      />
    </div>
  );
}
