import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Codezy API",
  description: "Backend API for Codezy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}