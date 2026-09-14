import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./convexClientProvider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "TripGenie",
  description: "Tell me what you want, and I'll handle the rest: hotel, itineraries - all in seconds",
  icons:{
    icon:'/logo.svg',
  }
};

const outfit = Outfit({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en" className={cn("font-sans", inter.variable)}
      >
        <body className={outfit.className}>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider >
  );
}
