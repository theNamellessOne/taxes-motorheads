import { validateRequest } from "~/server/auth";
import { UpdateDataForm } from "./_components/update-data-form";
import { redirect } from "next/navigation";

export default async function () {
  const auth = await validateRequest();
  if (!auth.user) redirect("/");

  return (
    <div className="mx-auto max-w-[1024px]">
      <h4 className={"my-4 text-xl font-semibold"}>Data</h4>
      <UpdateDataForm {...auth.user} />
    </div>
  );
}
