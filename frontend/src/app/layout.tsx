import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RootProvider from "@/providers/root/root-provider";
import { getServerSession } from "next-auth";
import NEXT_AUTH_OPTIONS from "@/configs/next-auth.config";

const poppins = Poppins({ subsets: ["latin" ], weight: "400" });

export const metadata: Metadata = {
  title: "Application Name",
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
        className={poppins.className}
      >
        <RootProvider session={session}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}