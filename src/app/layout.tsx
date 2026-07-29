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
  title: {
    default: "ClimateSnap - Real-Time Weather & Climate Insights",
    template: "%s | ClimateSnap",
  },
  description:
    "ClimateSnap is a modern, high-fidelity weather dashboard offering real-time local updates, 5-day forecasts, global city search, and a personalized favorites watchlist.",
  keywords: [
    "ClimateSnap",
    "weather forecast",
    "weather",
    "real-time weather",
    "local weather",
    "meteorology",
    "climate snap",
    "weather dashboard",
    "weather tracker",
    "global weather",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  authors: [{ name: "ClimateSnap Team" }],
  creator: "ClimateSnap",
  publisher: "ClimateSnap",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://climatesnap.vercel.app",
    title: "ClimateSnap - Real-Time Weather & Climate Insights",
    description:
      "Get immediate, high-fidelity local weather updates, 5-day forecasts, and manage your favorite cities in real-time.",
    siteName: "ClimateSnap",
    images: [
      {
        url: "https://climatesnap.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "ClimateSnap - Real-Time Weather & Climate Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClimateSnap - Real-Time Weather & Climate Insights",
    description:
      "Get immediate, high-fidelity local weather updates, 5-day forecasts, and manage your favorite cities in real-time.",
    creator: "@climatesnap",
    images: [
      {
        url: "https://climatesnap.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "ClimateSnap - Real-Time Weather & Climate Insights",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
