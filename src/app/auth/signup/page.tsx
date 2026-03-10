import { SignupForm } from "@/components/feature/auth/signup-form";

export default function Page() {
  return (
    <div className="w-full min-h-svh flex flex-row items-center justify-center">
      <div className="w-full md:w-1/2 min-h-svh flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>

      <div className="hidden md:flex w-1/2 min-h-svh items-center justify-center bg-gradient-to-br from-rose-400 to-rose-500 p-10">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Welcome to EduFlow
          </h2>
          <p className="text-lg text-gray-100">
            Manage your classes, track grades, and stay on top of everything
            from one place.
          </p>
        </div>
      </div>
    </div>
  );
}
