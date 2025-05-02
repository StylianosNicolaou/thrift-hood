import { Rubik, Permanent_Marker, VT323 } from "next/font/google";
import "./globals.css";

// Font configurations
const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  variable: "--font-permanent-marker",
  display: "swap",
  weight: ["400"],
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: ["400"],
});

export const metadata = {
  title: "ThriftHood.cy | Vintage Chaos Meets Street Culture",
  description:
    "A visual playground born from the grit of 90s streetwear and the spirit of thrift culture. Stay raw. Stay recycled. Stay hood.",
  icons: {
    icon: "/thrifthood_logo.png", // Can also be .png or .svg
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${permanentMarker.variable} ${vt323.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-thrift-black text-white">{children}</body>
    </html>
  );
}
