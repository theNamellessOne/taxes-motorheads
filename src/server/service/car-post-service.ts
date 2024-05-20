"use server";

import { CarPost } from "@prisma/client";
import { FetchFunctionProps } from "~/app/hooks/use-list";
import {
  CarPostCreateInput,
  CarPostUpdateInput,
  carPostCreateSchema,
  carPostUpdateSchema,
} from "~/schema/car-post-schema";
import { db } from "~/server/db";

export async function createPost(input: CarPostCreateInput) {
  const data = carPostCreateSchema.parse(input);
  return db.carPost.create({ data });
}

export async function updatePost(id: number, input: CarPostUpdateInput) {
  const data = carPostUpdateSchema.parse(input);
  return db.carPost.update({
    where: { id },
    data,
  });
}

export async function fetchPostById(id: number) {
  return db.carPost.findUnique({ where: { id } });
}

export async function fetchPosts({
  page = 1,
  pageSize = 10,
  query = "",
  sortDescriptor = { column: "id", direction: "desc" },
}: FetchFunctionProps<CarPost>) {
  let where: {} = {};
  if (query) {
    where = {
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    };
  }

  const totalPages = Math.ceil((await db.carPost.count({ where })) / pageSize);
  const data = await db.carPost.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: { [sortDescriptor.column]: sortDescriptor.direction },
  });

  return { totalPages, data };
}

export async function deletePost(id: number) {
  return db.carPost.delete({ where: { id } });
}
