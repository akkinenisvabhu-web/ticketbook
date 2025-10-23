import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; // 1. Import the Footer

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
      <body className={sora.className}>
        {/* Wrap children in a flex container to push footer down */}
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <Footer /> {/* 2. Add the Footer here */}
        </div>
      </body>
    </html>
  );
}