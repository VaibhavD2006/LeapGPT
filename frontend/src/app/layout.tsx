import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";

export const metadata: Metadata = {
  title: "LeapGPT - Entrepreneurial Insights",
  description: "AI-powered insights from consulting firm white papers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            input, textarea {
              color: #000000 !important;
            }
          `}
        </style>
      </head>
      <body>
        <SessionProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
} 