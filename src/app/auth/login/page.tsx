import { LoginForm } from "@/components/login-form";

export default async function LoginPage() {
  await new Promise((resolve) => {
    setTimeout(() => resolve("delay"), 3000);
  });
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
