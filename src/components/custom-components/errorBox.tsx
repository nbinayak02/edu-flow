import { Frown } from "lucide-react";

export default function ErrorBox() {
  return (
    <p className="dark:text-rose-300 text-rose-950 bg-rose-500/30 w-fit p-4 rounded-sm flex flex-row gap-3 items-center justify-center">
      <Frown />
      <span>Something went wrong. Please try again later!</span>
    </p>
  );
}
