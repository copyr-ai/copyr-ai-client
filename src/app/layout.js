import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "copyr.ai - The smart layer between copyright and clarity",
  description: "Structured copyright metadata infrastructure for the modern creator economy. Build trust, ensure compliance, and unlock new revenue streams.",
  keywords: "copyright, metadata, legal-tech, creator-economy, rights-management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
