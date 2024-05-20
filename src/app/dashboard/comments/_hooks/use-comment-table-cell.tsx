import { useCallback } from "react";
import { Comment } from "@prisma/client";
import { Button } from "@nextui-org/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deletePost } from "~/server/service/car-post-service";
import { toast } from "react-toastify";
import { deleteComment } from "~/server/service/comment-service";

export type CommentTableCellKey = keyof Comment | "actions";

export function useCommentTableCell(reload: () => void) {
  const router = useRouter();
  return useCallback((comment: Comment, columnKey: CommentTableCellKey) => {
    if (columnKey === "actions") {
      return (
        <div className={"flex items-center gap-2"}>
          <Button
            size={"sm"}
            variant={"light"}
            isIconOnly
            onPress={() => router.push(`comments/edit/${comment.id}`)}
          >
            <Pencil className={"h-4 w-4"} />
          </Button>

          <Button
            size={"sm"}
            variant={"light"}
            color={"danger"}
            isIconOnly
            onPress={() => {
              deleteComment(comment.id)
                .then(() => {
                  toast.success("Comment deleted", { autoClose: 1000 });
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

    const returnValue = comment[columnKey];
    if (!returnValue) return <p className={"italic"}>No data</p>;

    return String(returnValue);
  }, []);
}
