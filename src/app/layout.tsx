import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/user-context";
import { getUserFromToken } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eduflow",
  description:
    "Student Marks Management System | Marksheet Generation | Certificate Generation | AI Integrated",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserFromToken();

  return (
    <html lang="en" className="dark">
      <meta name="apple-mobile-web-app-title" content="EduFlow" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider user={Number(userId)}>{children}</UserProvider>
      </body>
    </html>
  );
}
