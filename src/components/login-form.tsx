"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormState } from "@/app/auth/types";
import { useActionState } from "react";
import { LoginAction } from "@/app/actions/auth";
import { Button } from "./ui/button";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const initialState: FormState = {
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    LoginAction,
    initialState
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Login to EduFlow
          </CardTitle>
          <CardDescription>
            Enter your details below to login to your account
          </CardDescription>
          {state?.errors?.otherErrorMessage && (
            <CardDescription className="bg-rose-500/60 rounded-sm p-3 text-white font-semibold">
              {state?.errors?.otherErrorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                />
                {state?.errors?.email && (
                  <FieldDescription className="text-rose-500">
                    {state?.errors?.email}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" />
                {state?.errors?.password && (
                  <FieldDescription className="text-rose-500">
                    {state?.errors?.password}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
