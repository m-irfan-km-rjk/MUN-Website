import { STATUSES } from '@/lib/filterSeats';
import { STATUS_STYLE } from './statusStyle';

export default function Legend() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-cream/85" aria-label="Status legend">
      {STATUSES.map((s) => (
        <li key={s.key} className="flex items-center gap-2">
          <span aria-hidden="true" className={`${STATUS_STYLE[s.key].text} text-sm leading-none`}>{STATUS_STYLE[s.key].icon}</span>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
