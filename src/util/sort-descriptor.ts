import { Prisma } from "@prisma/client";

export type SortDescriptor<T> = {
  column: keyof T;
  direction: Prisma.SortOrder;
};
