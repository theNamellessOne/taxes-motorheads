import { redirect } from "next/navigation";
import { validateRequest } from "~/server/auth";
import { AuthTabs } from "./_components/auth-tabs";

export default async function () {
  const { session } = await validateRequest();

  if (session) redirect("/");

  return (
    <div className={"flex items-center justify-center"}>
      <AuthTabs />
    </div>
  );
}
