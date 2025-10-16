import { Poppins } from "next/font/google";
import "./globals.css";
import BackgroundAnimation from "@/components/BackgroundAnimation"; // 1. Import it here

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata = {
  title: "TKM MUN: The International Cricket Council",
  description: "The official website for the TKM College of Engineering Mock UN, focusing on the International Cricket Council.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased relative`}>
        {/* 2. Place it here, just inside the body tag */}
        <BackgroundAnimation /> 
        
        {/* This div ensures your page content sits on top of the animation */}
        <div className="relative z-10"> 
          {children}
        </div>
      </body>
    </html>
  );
}

