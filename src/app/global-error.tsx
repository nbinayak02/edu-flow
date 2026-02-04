"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function GlobalError() {
  const router = useRouter();
  const handleContact = () => {
    router.push("https://www.facebook.com/nbinayak02");
  };
  return (
    <html className="dark">
      <body className="w-full h-screen flex flex-col justify-center items-center">
        <Card className="bg-rose-500/20">
          <CardHeader>
            <CardTitle className="text-xl">Something went wrong!</CardTitle>
          </CardHeader>
          <CardContent>
            Please try refreshing the page or contact support if the problem
            persists.
          </CardContent>
          <CardFooter className="space-x-2">
            <Button onClick={() => location.reload()}>Reload Page</Button>
            <Button variant={"outline"} onClick={handleContact}>
              Contact Support
            </Button>
          </CardFooter>
        </Card>
      </body>
    </html>
  );
}
