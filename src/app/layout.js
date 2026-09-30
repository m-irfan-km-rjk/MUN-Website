import { Cinzel, Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";
import Atmosphere from "@/components/Atmosphere";
import TornLetterLoader from "@/components/TornLetterLoader";

// Runs before first paint: hides the intro loader if it already played in this tab session.
// The key must match SEEN_KEY in components/TornLetterLoader.jsx.
const LOADER_SEEN_SCRIPT = `try{if(sessionStorage.getItem('tkm-dispatch-seen'))document.documentElement.classList.add('tl-seen')}catch(e){}`;

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

export const metadata = {
  title: "TKM MUN: Collegium Diplomaticum",
  description: "The official website for the TKM College of Engineering Model United Nations conference.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${garamond.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SEEN_SCRIPT }} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body className={`font-sans antialiased relative selection:bg-gold selection:text-maroon-dark`}>
        <TornLetterLoader />
        <Atmosphere />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
