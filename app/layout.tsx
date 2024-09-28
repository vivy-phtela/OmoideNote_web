import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppProvider } from "@/context/AppContext";
import { Noto_Serif_JP } from "next/font/google";

export const metadata: Metadata = {
  title: "OmoideNote",
  description: "CREATED BY AITOTO PROJECT",
};

const NoteSerifJP = Noto_Serif_JP({
  weight: "600",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={NoteSerifJP.className}>
        <AppProvider>
          <Header />
          <main className="mt-20">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
