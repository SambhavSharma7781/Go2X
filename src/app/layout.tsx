import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { NotificationManager } from "@/components/NotificationManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Go2X Learn | AI-Powered Learning",
  description: "Gamified learning platform for the future.",
  icons: {
    icon: "/favicon-go2x.png",
    shortcut: "/favicon-go2x.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="bg-background text-foreground h-full overflow-hidden flex flex-col md:flex-row font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden mb-16 md:mb-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-[#0B0B0B]">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-rose-500/5 blur-[120px] pointer-events-none rounded-full" />
            <div className="relative z-10">{children}</div>
          </main>
        </div>
        <NotificationManager />
      </body>
    </html>
  );
}
