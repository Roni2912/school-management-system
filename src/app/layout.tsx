import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Layout from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SchoolHub Pro - Professional School Management",
  description: "Enterprise-grade school management system for educational institutions. Streamline administration, manage schools, and enhance educational operations with professional tools.",
  keywords: ["school management", "education software", "school administration", "educational institutions", "professional", "enterprise"],
  authors: [{ name: "SchoolHub Pro Team" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "SchoolHub Pro - Professional School Management",
    description: "Enterprise-grade school management system for educational institutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SchoolHub Pro - Professional School Management",
    description: "Enterprise-grade school management system for educational institutions",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: "#2563eb", // Professional primary brand color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <PerformanceMonitor />
        <ErrorBoundary>
          <Providers>
            <Layout>
              {children}
            </Layout>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
