'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SeatChip from './SeatChip';
import { STATUSES, committeeLabel } from '@/lib/filterSeats';
import { STATUS_STYLE } from './statusStyle';

/**
 * @param {{ result: ReturnType<typeof import('@/lib/filterSeats').filterSeats>, committee: string, animateKey: string,
 *           onSelectSeat: (seat: import('@/lib/filterSeats').Seat) => void, onClear: () => void }} props
 */
export default function SeatGrid({ result, committee, animateKey, onSelectSeat, onClear }) {
  const reduce = useReducedMotion();
  const empty = result.mode === 'search' ? result.groups.length === 0 : result.seats.length === 0;

  if (empty) {
    return (
      <div className="rounded border border-dashed border-gold/40 py-10 text-center text-cream/80">
        <p>No matches, try another country or clear filters.</p>
        <button type="button" onClick={onClear} className="mt-3 rounded border border-gold px-4 py-1.5 text-sm text-gold-light hover:bg-maroon-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light">
          Clear filters
        </button>
      </div>
    );
  }

  const motionProps = reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25 } };

  if (result.mode === 'search') {
    return (
      <motion.ul key={animateKey} {...motionProps} className="space-y-3">
        {result.groups.map((g) => (
          <li key={g.name} className="rounded-lg border border-gold/25 bg-black/10 p-3">
            <p className="text-sm text-cream">
              <span className="font-semibold">{g.name}</span>: {g.summary}
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {g.seats.map((seat) => (
                <li key={seat.committee}>
                  <button
                    type="button"
                    onClick={() => onSelectSeat(seat)}
                    className={`flex w-full items-center justify-between gap-2 rounded border bg-maroon-card px-2.5 py-1.5 text-xs hover:bg-maroon-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light ${STATUS_STYLE[seat.status].border}`}
                  >
                    <span className="truncate text-cream">{committeeLabel(seat.committee)}</span>
                    <span className={`${STATUS_STYLE[seat.status].text} whitespace-nowrap`}>
                      <span aria-hidden="true">{STATUS_STYLE[seat.status].icon} </span>
                      {STATUSES.find((s) => s.key === seat.status)?.short}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </motion.ul>
    );
  }

  return (
    <motion.ul key={animateKey} {...motionProps} className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {result.seats.map((seat) => (
        <li key={`${seat.committee}-${seat.name}`}>
          <SeatChip seat={seat} showCommittee={committee === 'all'} onSelect={onSelectSeat} />
        </li>
      ))}
    </motion.ul>
  );
}
