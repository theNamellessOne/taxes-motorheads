import { CarPost } from "@prisma/client";
import { CarPostImg } from "./car-post-img";
import { CarPostContent } from "./car-post-content";
import { CarPostComments } from "./car-post-comments";

export function CarPostView(carPost: CarPost) {
  return (
    <div className={"flex flex-col gap-2"}>
      <CarPostImg {...carPost} />
      <CarPostContent {...carPost} />
      <CarPostComments {...carPost} />
    </div>
  );
}
