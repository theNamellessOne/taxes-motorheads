import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div
      className={
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur"
      }
    >
      <Spinner color={"primary"} size={"lg"} />
    </div>
  );
}
