import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chronos",
  description: "Web application of smart watch",
  icons: {
    icon: "assets/clock.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
      >
        {children}
      </body>
    </html>
  );
}
