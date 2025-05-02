// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ThriftHood.cy | 90s Streetwear & Vintage Fashion",
  description:
    "90s-inspired skatewear and vintage streetwear based in Cyprus. Authentic urban threads with graffiti soul and skate culture attitude.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* Very lightweight noise texture overlay */}
        <div className="fixed inset-0 css-noise pointer-events-none z-50 opacity-5"></div>

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
