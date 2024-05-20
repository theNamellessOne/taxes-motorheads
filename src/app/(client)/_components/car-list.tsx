"use client";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { CarPost, Like } from "@prisma/client";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { toggleLike } from "~/server/service/like-service";
import { useAuth } from "~/app/providers/auth-provider";
import { useRouter } from "next/navigation";

export function CarPostList(props: {
  data: CarPost[];
  totalPages: number;
  likes: Like[];
}) {
  return props.data.map((post) => {
    const isInLikes = !!props.likes.find((l) => l.carPostId === post.id);
    return <CarPostCard carPost={post} isInLikes={isInLikes} />;
  });
}

const CarPostCard = (props: { carPost: CarPost; isInLikes: boolean }) => {
  const { session } = useAuth();
  const router = useRouter();
  const [liked, setLiked] = useState(props.isInLikes);

  return (
    <div className={"relative"}>
      <Button
        isIconOnly
        className={"absolute right-1 top-1 z-40"}
        onPress={() => {
          if (!session) return router.push("/auth");

          setLiked(!liked);
          toggleLike(props.carPost.id).catch((r) => {
            setLiked(!liked);
            toast.error(String(r));
          });
        }}
      >
        <Heart className={`${liked && "fill-danger"} text-danger`} />
      </Button>

      <Link href={`/${props.carPost.id}`} className={"block h-full w-full"}>
        <Card className={"group h-full w-full"}>
          <CardBody className={"p-0"}>
            <Image
              classNames={{
                wrapper: "!max-w-full w-full h-full",
                img: "w-full h-full object-cover",
              }}
              src={props.carPost.imgUrl}
            />
          </CardBody>

          <CardFooter>
            <div className={"flex w-full flex-col"}>
              <h5 className={"text-lg font-semibold"}>{props.carPost.title}</h5>

              <p className={"mt-2 line-clamp-3 max-h-[100px] pl-px text-sm"}>
                {props.carPost.preview}
              </p>

              <p className={"ml-auto mt-4 text-xs italic"}>
                {props.carPost.createdAt.toLocaleString("uk-UA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};
