"use server";

import { User } from "@prisma/client";
import { Argon2id } from "oslo/password";
import { FetchFunctionProps } from "~/app/hooks/use-list";
import { UserRegisterInput, userRegisterSchema } from "~/schema/user-schema";
import { db } from "~/server/db";
import { lucia } from "../auth";
import { initializeSession } from "./auth-service";

export async function fetchUsers({
  page = 1,
  pageSize = 10,
  query = "",
  sortDescriptor = { column: "id", direction: "desc" },
}: FetchFunctionProps<User>) {
  let where: {} = {};
  if (query) {
    where = {
      OR: [{ username: { contains: query } }, { email: { contains: query } }],
    };
  }

  const totalPages = Math.ceil((await db.user.count({ where })) / pageSize);
  const data = await db.user.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: { [sortDescriptor.column]: sortDescriptor.direction },
  });

  return { totalPages, data };
}

export async function toggleAdmin(id: string) {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) throw new Error("No such user");

  return db.user.update({ where: { id }, data: { isAdmin: !user.isAdmin } });
}

export async function deleteUser(id: string) {
  return db.user.delete({ where: { id } });
}

export async function updateUser(id: string, input: UserRegisterInput) {
  const data = userRegisterSchema.parse(input);

  const user = await db.user.findUnique({ where: { id } });
  if (!user) throw new Error("No such user");

  const emailExists = await db.user.findUnique({
    where: { email: data.email },
  });
  if (emailExists && data.email !== user.email)
    throw new Error(`Email ${data.email} is already taken!`);

  const usernameExits = await db.user.findUnique({
    where: { username: data.username },
  });
  if (usernameExits && data.username !== user.username)
    throw new Error(`Username ${data.username} is already taken!`);

  const passwordHash = await new Argon2id().hash(data.password);

  await db.user.update({
    where: { id },
    data: {
      ...data,
      password: passwordHash,
    },
  });

  await lucia.invalidateSession(user.id);
  await initializeSession(user.id);
}
