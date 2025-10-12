import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-3">
      <p>Loading, please wait!</p>
      <Spinner />
    </div>
  );
}
