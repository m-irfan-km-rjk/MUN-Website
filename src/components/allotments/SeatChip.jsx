import { STATUSES, committeeLabel } from '@/lib/filterSeats';
import { STATUS_STYLE } from './statusStyle';

/** @param {{ seat: import('@/lib/filterSeats').Seat, showCommittee: boolean, onSelect: (seat: import('@/lib/filterSeats').Seat) => void }} props */
export default function SeatChip({ seat, showCommittee, onSelect }) {
  const style = STATUS_STYLE[seat.status];
  const status = STATUSES.find((s) => s.key === seat.status);
  return (
    <button
      type="button"
      onClick={() => onSelect(seat)}
      title={seat.detail || undefined}
      className={`flex h-full w-full flex-col items-start rounded-lg border bg-maroon-card px-3 py-2 text-left transition-colors hover:bg-maroon-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light ${style.border}`}
    >
      <span className="w-full truncate text-sm font-semibold text-cream">{seat.name}</span>
      {showCommittee ? <span className="text-[10px] uppercase tracking-wider text-gold-light">{committeeLabel(seat.committee)}</span> : null}
      {seat.detail ? <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gold-light">{seat.detail}</span> : null}
      <span className={`mt-1 flex items-center gap-1.5 text-[11px] ${style.text}`}>
        <span aria-hidden="true">{style.icon}</span>
        {status?.short}
      </span>
    </button>
  );
}
