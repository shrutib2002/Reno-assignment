import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // Import the Navbar component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Management App",
  description: "A mini-project for managing school data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Render the Navbar component */}
        {children}
      </body>
    </html>
  );
}
