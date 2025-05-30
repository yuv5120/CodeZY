import "../styles/globals.css";
import type { Metadata } from "next";
import Providers from "@/components/Providers";


export const metadata: Metadata = {
  title: "Codezy - Online Compiler",
  description: "Run code in your browser",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}