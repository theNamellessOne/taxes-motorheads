"use server";

import { Comment } from "@prisma/client";
import {
  CommentCreateInput,
  CommentUpdateInput,
  commentCreateSchema,
  commentUpdateSchema,
} from "~/schema/comment-schema";
import { db } from "~/server/db";
import { SortDescriptor } from "~/util/sort-descriptor";
import { validateRequest } from "~/server/auth";
import { FetchFunctionProps } from "~/app/hooks/use-list";

export async function createComment(input: CommentCreateInput) {
  const { session } = await validateRequest();
  if (!session) throw new Error("Unauthorized");

  const authorId = session.userId;
  const data = commentCreateSchema.parse(input);
  return db.comment.create({
    data: { ...data, authorId },
  });
}

export async function fetchCommentsByCarPostId(
  postId: number,
  page: number = 1,
  pageSize: number = 10,
  query: string = "",
  sortDescriptor: SortDescriptor<Comment> = { column: "id", direction: "desc" },
) {
  let where: {} = {};
  if (query) {
    where = {
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    };
  }
  where = { ...where, postId };

  const totalPages = await db.comment.count({ where });
  const data = await db.comment.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: { [sortDescriptor.column]: sortDescriptor.direction },
    include: {
      author: true,
    },
  });

  return { totalPages, data };
}

export async function deleteComment(id: number) {
  const { session } = await validateRequest();
  if (!session) throw new Error("Unauthorized");

  return db.comment.delete({ where: { id } });
}

export async function fetchComments({
  page = 1,
  pageSize = 10,
  query = "",
  sortDescriptor = { column: "id", direction: "desc" },
}: FetchFunctionProps<Comment>) {
  let where: {} = {};
  if (query) {
    where = {
      OR: [{ content: { contains: query } }],
    };
  }

  const totalPages = Math.ceil((await db.comment.count({ where })) / pageSize);
  const data = await db.comment.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: { [sortDescriptor.column]: sortDescriptor.direction },
  });

  return { totalPages, data };
}

export async function updateComment(id: number, input: CommentUpdateInput) {
  const data = commentUpdateSchema.parse(input);
  return db.comment.update({
    where: { id },
    data,
  });
}

export async function fetchCommentById(id: number) {
  return db.comment.findUnique({ where: { id } });
}
