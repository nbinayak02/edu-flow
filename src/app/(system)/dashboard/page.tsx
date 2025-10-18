"use client";
import { useUserContext } from "@/context/user-context";

export default function Page() {
  const { userId } = useUserContext();

  return <div>hello Your user id is {userId}</div>;
}
