"use client";
import { SignupAction } from "@/app/_actions/auth";
import { FormState } from "@/app/auth/types";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useActionState, useState } from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const initialState: FormState = {
    errors: {},
    status: false,
    userId: null,
  };

  const [state, formAction, isPending] = useActionState(
    SignupAction,
    initialState
  );

  const [password, setPassword] = useState("");
  const [isConfPassMatch, setConfPassMatch] = useState(true);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">
          Sign up to EduFlow
        </CardTitle>
        <CardDescription>
          Enter your information below to sign up
        </CardDescription>
        {state?.errors?.otherErrorMessage && (
          <CardDescription className="bg-rose-500/60 rounded-sm p-3 text-white font-semibold">
            {state?.errors?.otherErrorMessage}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <form action={formAction}>
          <FieldGroup className="gap-8">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" name="fullName" />
              {state?.errors?.fullName && (
                <FieldDescription className="text-rose-500">
                  {state?.errors?.fullName}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" name="email" />
              {state?.errors?.email && (
                <FieldDescription className="text-rose-500">
                  {state?.errors?.email}
                </FieldDescription>
              )}
            </Field>

            <div className="flex flex-row gap-4">
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {state?.errors?.password && (
                  <FieldDescription className="text-rose-500">
                    {state?.errors?.password}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  onChange={(e) => {
                    e.target.value === password
                      ? setConfPassMatch(true)
                      : setConfPassMatch(false);
                  }}
                />

                {isConfPassMatch ? (
                  <></>
                ) : (
                  <FieldDescription className="text-rose-500">
                    Confirm password didn't match.
                  </FieldDescription>
                )}
              </Field>
            </div>
            <FieldGroup>
              <Field className="flex flex-col justify-center items-center">
                <Button
                  type="submit"
                  className="max-w-sm"
                  disabled={isPending || !isConfPassMatch}
                >
                  Sign Up
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link href="/auth/login">Log in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
