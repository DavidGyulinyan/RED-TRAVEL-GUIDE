import { Geist, Geist_Mono } from "next/font/google";
import { I18nProvider } from "./components/i18n-provider";
import SiteFrame from "./components/site-frame";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Red Travel Guide",
  description:
    "4x4 mountain adventures across Armenia with scenic routes, short expeditions, and custom private tours.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <I18nProvider>
          <SiteFrame>{children}</SiteFrame>
        </I18nProvider>
      </body>
    </html>
  );
}
