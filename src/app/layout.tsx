import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OmniFlow CX",
  description: "Free-Tier Contact Center AI Simulation System",
};

import {
  ClerkProvider
} from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>

          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
