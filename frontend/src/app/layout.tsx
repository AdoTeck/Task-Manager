import type { Metadata } from "next";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "Task Manager",
  description: "Next Js + Node Js Application for Demo Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
