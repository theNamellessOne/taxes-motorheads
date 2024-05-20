import { SortDirection } from "@react-types/shared";

export function convertSortDescriptorToPrisma(
  sortDescriptor: SortDirection | undefined,
) {
  if (sortDescriptor === "descending") {
    return "desc";
  }

  if (sortDescriptor === "ascending") {
    return "asc";
  }

  return "desc";
}

export function convertSortDescriptorToReact(sortDescriptor: "asc" | "desc") {
  if (sortDescriptor === "desc") {
    return "descending";
  }

  if (sortDescriptor === "asc") {
    return "ascending";
  }

  return "descending";
}
