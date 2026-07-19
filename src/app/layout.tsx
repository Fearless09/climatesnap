import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import WeatherProvider from "@/context/WeatherContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClimateSnap",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          enableSystem
          defaultTheme="system"
          attribute={"data-theme"}
          disableTransitionOnChange
          storageKey="climate-snap-theme"
        >
          <WeatherProvider>
            <section className="transition-300 flex min-h-dvh flex-col bg-zinc-50 font-sans text-zinc-800 antialiased dark:bg-black dark:text-zinc-100">
              <Navbar />
              <section className="flex flex-1 flex-col">{children}</section>
              <Footer />
            </section>
          </WeatherProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
