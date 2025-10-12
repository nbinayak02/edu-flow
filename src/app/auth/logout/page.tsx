import { Logout } from "@/app/_actions/auth";
import { redirect } from "next/navigation";

export default function LogoutPage() {
  <form action={Logout}></form>;
  redirect("/auth/login");
}
