import "./globals.css";
import { Rubik, Permanent_Marker } from "next/font/google";

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

export const metadata = {
  title: "ThriftHood.cy | Vintage Chaos Meets Street Culture",
  description:
    "A visual playground born from the grit of 90s streetwear and the spirit of thrift culture. Stay raw. Stay recycled. Stay hood.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rubik.variable} ${permanentMarker.variable}`}>
      <body>{children}</body>
    </html>
  );
}
