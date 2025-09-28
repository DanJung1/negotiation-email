import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AIProvider } from "@/components/ai/AIProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <AIProvider>
              {children}
            </AIProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
