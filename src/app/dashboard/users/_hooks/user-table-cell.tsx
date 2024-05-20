import { useCallback } from "react";
import { User } from "@prisma/client";
import { Button } from "@nextui-org/button";
import { toggleAdmin } from "~/server/service/user-service";
import { toast } from "react-toastify";

export type UserTableCellKey = keyof User | "actions";

export function useUserTableCell(reload: () => void) {
  return useCallback((user: User, columnKey: UserTableCellKey) => {
    if (columnKey === "actions") {
      return (
        <Button
          variant={"light"}
          size={"sm"}
          onPress={() => {
            toggleAdmin(user.id)
              .then(() => {
                toast.success("Saved", { autoClose: 1000 });
                reload();
              })
              .catch((e) => toast.error(String(e)));
          }}
        >
          Toggle Admin
        </Button>
      );
    }

    const returnValue = user[columnKey];
    if (!returnValue) return <p className={"italic"}>No data</p>;

    return String(returnValue);
  }, []);
}
