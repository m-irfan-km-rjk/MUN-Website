/** Status colours tuned for the maroon background (text >= 4.5:1 on maroon-card). */
export const STATUS_STYLE = {
  available: { icon: '✔', text: 'text-[#8fe3a0]', border: 'border-[#8fe3a0]/60', bar: 'bg-[#8fe3a0]', tile: 'ring-[#8fe3a0]' },
  'allotted-not-confirmed': { icon: '◐', text: 'text-[#f0c75e]', border: 'border-[#f0c75e]/60', bar: 'bg-[#f0c75e]', tile: 'ring-[#f0c75e]' },
  allotted: { icon: '✕', text: 'text-[#d6c6b6]', border: 'border-[#d6c6b6]/30', bar: 'bg-[#a8978a]', tile: 'ring-[#d6c6b6]' },
};
