"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <ArrowLeft />
    </button>
  );
}
