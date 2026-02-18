import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "600"],
});

export const metadata = {
  title: "Inkwell's Journal",
  description: "simple, no-fuss journalling app :)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
