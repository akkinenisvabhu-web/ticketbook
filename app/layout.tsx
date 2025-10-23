import type { Metadata } from "next";
import { Sora } from "next/font/google"; // Import the new font
import "./globals.css";

// Configure the Sora font
const sora = Sora({ 
  subsets: ["latin"],
  weight: ['300', '400', '600', '700'] 
});

export const metadata: Metadata = {
  title: "electroflix",
  description: "book your tickets now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>{children}</body>
    </html>
  );
}