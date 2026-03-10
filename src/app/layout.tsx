import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import IntroLoader from "@/components/animations/IntroLoader";
import { IntroProvider } from "@/components/providers/IntroProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chan Jeon | UI | UX Visual Designer",
  description: "UI | UX Visual Designer building scalable, high-density interfaces for complex systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-foreground selection:text-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <IntroProvider>
            <IntroLoader />
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
