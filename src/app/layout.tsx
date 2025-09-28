import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AIProvider } from "@/components/ai/AIProvider";

export const metadata: Metadata = {
  title: "AI Email Browser",
  description: "Next-generation AI-enabled email browser with intelligent features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50">
        <AuthProvider>
          <AIProvider>
            {children}
          </AIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
