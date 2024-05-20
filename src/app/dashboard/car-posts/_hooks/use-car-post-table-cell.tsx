import { useCallback } from "react";
import { CarPost } from "@prisma/client";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deletePost } from "~/server/service/car-post-service";
import { toast } from "react-toastify";

export type CarPostTableCellKey = keyof CarPost | "actions";

export function useCarPostTableCell(reload: () => void) {
  const router = useRouter();
  return useCallback((carPost: CarPost, columnKey: CarPostTableCellKey) => {
    if (columnKey === "actions") {
      return (
        <div className={"flex items-center gap-2"}>
          <Button
            size={"sm"}
            variant={"light"}
            isIconOnly
            onPress={() => router.push(`car-posts/edit/${carPost.id}`)}
          >
            <Pencil className={"h-4 w-4"} />
          </Button>

          <Button
            size={"sm"}
            variant={"light"}
            color={"danger"}
            isIconOnly
            onPress={() => {
              deletePost(carPost.id)
                .then(() => {
                  toast.success("Post deleted", { autoClose: 1000 });
                  reload();
                })
                .catch((e) => toast.error(String(e)));
            }}
          >
            <Trash className={"h-4 w-4"} />
          </Button>
        </div>
      );
    }

    if (columnKey === "imgUrl") {
      return <Image src={carPost.imgUrl} className={"w-40"} />;
    }

    const returnValue = carPost[columnKey];
    if (!returnValue) return <p className={"italic"}>No data</p>;

    return String(returnValue);
  }, []);
}
