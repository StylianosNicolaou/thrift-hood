import "./globals.css";
export const metadata = {
  title: "ThriftHood",
  description: "90s streetwear + vintage fashion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-chineseRocks overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
