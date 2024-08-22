import type { Viewport, Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Guard from "@/components/auth/guard";

const grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  themeColor: "#FFFFFF",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${grotesk.className} md:flex items-cente md:h-[100vh] justify-center`}
      >
        <Guard>
          <main className="flex overflow-hidden screen bg-white md:h-[80dvh] ih:h-[65dvh] relative ih:w-[40dvw] md:w-[30dvw]   flex-col items-center justify-between">
            {children}
          </main>
        </Guard>
      </body>
    </html>
  );
}
