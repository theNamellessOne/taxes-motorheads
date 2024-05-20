"use server";

import { db } from "~/server/db";
import { validateRequest } from "~/server/auth";

export async function toggleLike(postId: number) {
  const { session } = await validateRequest();
  if (!session) throw new Error("Unauthorized");

  const userId = session.userId;
  const exists = await db.like.findFirst({
    where: { userId, carPostId: postId },
  });

  return exists ? removeLike(postId, userId) : createLike(postId, userId);
}

async function createLike(carPostId: number, userId: string) {
  return db.like.create({
    data: { userId, carPostId },
  });
}

async function removeLike(carPostId: number, userId: string) {
  return db.like.delete({
    where: { userId_carPostId: { userId, carPostId } },
  });
}

export async function fetchUserLikes(userId: string) {
  return db.like.findMany({ where: { userId } });
}

export async function fetchLikedPosts(userId: string) {
  return db.like.findMany({
    where: { userId },
    include: { carPost: true },
  });
}
