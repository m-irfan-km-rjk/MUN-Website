import { STATUSES } from '@/lib/filterSeats';
import { STATUS_STYLE } from './statusStyle';

/**
 * @param {{ counts: Record<string, number>, active: string | null, onToggle: (key: string) => void,
 *           updatedLabel: string, failed: boolean }} props
 */
export default function StatTiles({ counts, active, onToggle, updatedLabel, failed }) {
  const total = counts.available + counts.allotted + counts['allotted-not-confirmed'];
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {STATUSES.map((s) => {
        const on = active === s.key;
        const style = STATUS_STYLE[s.key];
        return (
          <button
            key={s.key}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(s.key)}
            className={`rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light ${
              on ? `bg-maroon-hover border-gold-light ring-2 ${style.tile}` : 'bg-maroon-card border-gold/20 hover:border-gold/60'
            }`}
          >
            <p className={`text-2xl font-bold ${style.text}`}>
              <span aria-hidden="true" className="mr-2 text-base">{style.icon}</span>
              {counts[s.key]}
              <span className="ml-1 text-xs font-normal text-cream/60">of {total}</span>
            </p>
            <p className="text-[10px] uppercase tracking-wider text-cream/80">
              {s.label}
              {on ? ' · click to clear' : ''}
            </p>
          </button>
        );
      })}
      <div className="flex flex-col justify-center rounded-xl border border-gold/20 bg-maroon-card px-4 py-3" role="status">
        <p className="flex items-center text-[10px] uppercase tracking-wider text-gold-light">
          <i className="mr-2 h-2 w-2 rounded-full bg-gold motion-safe:animate-pulse" aria-hidden="true" />
          Live · Last updated
        </p>
        <p className="mt-1 text-lg font-semibold text-cream">{failed ? 'Update failed, retrying' : updatedLabel}</p>
      </div>
    </div>
  );
}
