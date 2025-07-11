import "./globals.css";
import type { Metadata } from "next";
import {
  Outfit,
  Playfair_Display,
  Source_Code_Pro,
  Noto_Sans_JP,
} from "next/font/google";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["sans-serif"],
  display: "swap",
  weight: ["100", "200", "300", "400"],
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const mono = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Engineering at Omnissa",
  description: "Elevate the Digital Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
