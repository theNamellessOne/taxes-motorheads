"use server";

import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import {
  UserLoginInput,
  UserRegisterInput,
  userLoginSchema,
  userRegisterSchema,
} from "~/schema/user-schema";
import { cookies } from "next/headers";
import { db } from "~/server/db";
import { lucia, validateRequest } from "~/server/auth";

export async function initializeSession(id: any) {
  const session = await lucia.createSession(id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

export async function signUp(input: UserRegisterInput) {
  const data = userRegisterSchema.parse(input);

  const emailExists = await db.user.findUnique({
    where: { email: data.email },
  });
  if (emailExists) throw new Error(`Email ${data.email} is already taken!`);

  const usernameExits = await db.user.findUnique({
    where: { username: data.username },
  });
  if (usernameExits)
    throw new Error(`Username ${data.username} is already taken!`);

  const id = generateId(15);
  const passwordHash = await new Argon2id().hash(data.password);

  await db.user.create({
    data: {
      ...data,
      id,
      isAdmin: false,
      password: passwordHash,
    },
  });

  await initializeSession(id);
}

export async function signIn(input: UserLoginInput) {
  const data = userLoginSchema.parse(input);

  const user = await db.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const validPassword = await new Argon2id().verify(
    user.password,
    data.password,
  );
  if (!validPassword) {
    throw new Error("Incorrect email or password");
  }

  await initializeSession(user.id);
}

export async function signOut() {
  const { session } = await validateRequest();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}
