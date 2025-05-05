import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootProvider from "@/providers/root/root-provider";
import { getServerSession } from "next-auth";
import NEXT_AUTH_OPTIONS from "@/configs/next-auth.config";

const inter = Inter({ subsets: ["latin" ], weight: "400" });

export const metadata: Metadata = {
  title: "Ứng dụng aqinow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(NEXT_AUTH_OPTIONS);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
      >
        <RootProvider session={session}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}