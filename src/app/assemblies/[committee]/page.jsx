import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { committees } from "@/data/committees";

export function generateStaticParams() {
  return committees.map((committee) => ({ committee: committee.slug }));
}

export async function generateMetadata({ params }) {
  const { committee: slug } = await params;
  const committee = committees.find((item) => item.slug === slug);
  return {
    title: committee ? `${committee.fullName} | TKM MUN'26` : "Committee | TKM MUN'26",
  };
}

export default async function CommitteePage({ params }) {
  const { committee: slug } = await params;
  const committee = committees.find((item) => item.slug === slug);
  if (!committee) notFound();

  return (
    <main className="min-h-screen bg-[#24130f] text-cream">
      <header className="sticky top-0 z-40 border-b border-gold/40 bg-maroon-dark/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
          <Link href="/#assemblies" className="inline-flex items-center gap-2 font-display text-[10px] md:text-xs uppercase tracking-[0.16em] text-gold-light hover:text-cream">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to committees
          </Link>
          <span className="hidden sm:block font-display text-xs uppercase tracking-[0.18em] text-gold-light">TKM MUN&apos;26</span>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-center border-b border-gold/30 pb-10">
          <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto lg:mx-0 rounded-full border-2 border-gold bg-maroon-dark overflow-hidden">
            <Image src={committee.logoUrl} alt={`${committee.fullName} emblem`} fill sizes="176px" className="object-contain p-5" />
          </div>
          <div>
            <p className="font-display text-xs text-gold-light uppercase tracking-[0.25em]">{committee.name}</p>
            <h1 className="font-cormorant text-4xl md:text-6xl text-cream leading-tight mt-2">{committee.fullName}</h1>
            <p className="text-gold-light italic mt-4 max-w-3xl">“{committee.agenda}”</p>
          </div>
        </div>

        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 py-10 border-b border-gold/30">
          <div>
            <p className="font-display text-[10px] text-gold-light uppercase tracking-[0.2em]">Committee Overview</p>
            <p className="text-lg text-cream/80 mt-3 leading-relaxed">{committee.description}</p>
            <p className="mt-6 text-sm"><span className="font-display text-[10px] text-gold-light uppercase tracking-wider mr-2">Allocations</span>{committee.allocations}</p>
          </div>
          <div className="rounded-lg border border-gold/40 bg-maroon-dark/50 p-5 md:p-7">
            <p className="font-display text-xs text-gold-light uppercase tracking-[0.2em]">The Secretariat</p>
            <p className="text-cream/60 text-sm mt-2">Meet the team presiding over this committee.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 py-12">
          {committee.executiveBoard.map((member) => (
            <article key={member.name} className="border border-gold/40 bg-maroon-dark rounded-lg overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
              <div className="relative z-10 h-72 bg-[#120b09] overflow-hidden">
                {member.imageUrl ? (
                  <Image src={member.imageUrl} alt={member.name} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-center" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#3f261e] to-[#120b09] text-gold-light font-cormorant text-6xl font-bold">
                    {member.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="p-5 md:p-6">
                <h2 className="font-cormorant text-2xl text-cream">{member.name}</h2>
                <p className="font-display text-[10px] uppercase tracking-[0.16em] text-gold-light mt-1">{member.role}</p>
                <p className="text-base text-cream/75 mt-4 leading-relaxed">{member.biography}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
