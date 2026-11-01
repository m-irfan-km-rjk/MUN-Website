import { STATUS_STYLE } from './statusStyle';

/** @param {{ label: string, counts: Record<string, number> }} props */
export default function ProgressBar({ label, counts }) {
  const confirmed = counts.allotted;
  const pending = counts['allotted-not-confirmed'];
  const open = counts.available;
  const total = confirmed + pending + open;
  if (!total) return null;
  const pct = (n) => `${(n / total) * 100}%`;
  return (
    <div>
      <div
        className="flex h-2.5 w-full overflow-hidden rounded-full bg-black/30"
        role="img"
        aria-label={`${label}: ${confirmed} allotted, ${pending} not confirmed, ${open} available`}
      >
        <span className={STATUS_STYLE.allotted.bar} style={{ width: pct(confirmed) }} />
        <span className={STATUS_STYLE['allotted-not-confirmed'].bar} style={{ width: pct(pending) }} />
        <span className={STATUS_STYLE.available.bar} style={{ width: pct(open) }} />
      </div>
      <p className="mt-1 text-xs text-cream/80">
        {label}: {confirmed + pending} of {total} taken
      </p>
    </div>
  );
}
