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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">
          Sign up to EduFlow
        </CardTitle>
        <CardDescription>
          Enter your information below to sign up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup className="gap-8">
            <div className="flex flex-row gap-4">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" required />
              </Field>
            </div>
            <div className="flex flex-row gap-4">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" required />
              </Field>
            </div>

            <div className="flex flex-row gap-4">
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input id="confirm-password" type="password" required />
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
              </Field>
            </div>
            <FieldGroup>
              <Field className="flex flex-col justify-center items-center">
                <Button type="submit" className="max-w-sm">Sign Up</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/auth/login">Log in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
