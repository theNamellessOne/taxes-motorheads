"use server";

import { CarPost } from "@prisma/client";
import {
  CarPostCreate,
  CarPostUpdate,
  carPostCreateSchema,
  carPostUpdateSchema,
} from "~/schema/car-post";
import { db } from "~/server/db";
import { SortDescriptor } from "~/util/sort-descriptor";

export async function createPost(input: CarPostCreate) {
  const data = carPostCreateSchema.parse(input);
  return db.carPost.create({ data });
}

export async function updatePost(id: number, input: CarPostUpdate) {
  const data = carPostUpdateSchema.parse(input);
  return db.carPost.update({
    where: { id },
    data,
  });
}

export async function fetchPostById(id: number) {
  return db.carPost.findUnique({ where: { id } });
}

export async function fetchPosts(
  page: number = 1,
  pageSize: number = 10,
  query: string = "",
  sortDescriptor: SortDescriptor<CarPost> = { column: "id", direction: "desc" },
) {
  let where: {} = {};
  if (query) {
    where = {
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    };
  }

  const totalPages = await db.carPost.count({ where });
  const data = db.carPost.findMany({
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
