"use client";

const links = [
  { href: '#about', label: 'About' },
  { href: '#assemblies', label: 'Committees' },
  { href: '#secretariat', label: 'Secretariat' },
  { href: '#contact', label: 'Contact' },
];

export default function MFooter() {
  return (
    <footer className="relative z-10 w-full bg-maroon-dark border-t border-gold/60 text-center">
      <div className="h-2 w-full footer-braid-drift" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-sm uppercase tracking-[0.3em] text-gold-light font-bold mb-2">
          ◆ Collegium Diplomaticum TKM ◆
        </h2>
        <p className="font-cormorant italic text-xl text-gold mb-2">“Unire · Discere · Progredere”</p>
        <p className="text-base text-muted mb-6">
          Inspiring leadership, diplomacy, and global collaboration.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {links.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="font-display text-[10px] uppercase tracking-[0.25em] text-[#d1c5b2] hover:text-gold-light transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="border-t border-gold/20 pt-5 text-sm text-muted/70">
          © {new Date().getFullYear()} TKM MUN. Under the patronage of TKM College of Engineering, Kollam, Kerala.
        </div>
      </div>
    </footer>
  );
}
