import { COMMITTEES } from '@/lib/filterSeats';

/** @param {{ openByCommittee: Record<string, number>, openTotal: number, active: string, onChange: (key: string) => void }} props */
export default function CommitteeTabs({ openByCommittee, openTotal, active, onChange }) {
  const tabs = [{ key: 'all', label: 'All', open: openTotal }, ...COMMITTEES.map((c) => ({ ...c, open: openByCommittee[c.key] ?? 0 }))];
  return (
    <div role="tablist" aria-label="Committee" className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const on = active === t.key;
        return (
          <button
            key={t.key}
            role="tab"
            type="button"
            aria-selected={on}
            onClick={() => onChange(t.key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light ${
              on ? 'border-gold-light bg-gold text-maroon-dark font-semibold' : 'border-gold/40 text-cream hover:bg-maroon-hover'
            }`}
          >
            {t.label}
            <span className={`ml-2 text-xs ${on ? 'text-maroon-dark/80' : 'text-[#8fe3a0]'}`}>{t.open} open</span>
          </button>
        );
      })}
    </div>
  );
}
