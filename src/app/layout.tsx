import type { Metadata } from "next";
import { Urbanist, Bebas_Neue } from "next/font/google";
import PageTransitionOverlay from "./components/PageTransitionOverlay";
import ParticleSpray from "./components/ParticleSpray";
import "../../globals.css";

// Fonts from Google Fonts (if you want dynamic loading, otherwise you already imported them manually in globals.css)
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-urbanist",
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "ThriftHood.cy",
  description:
    "Urban streetwear | Skateboard culture | Graffiti aesthetic | Cyprus based",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
