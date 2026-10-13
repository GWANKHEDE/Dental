import { Star } from 'lucide-react'

interface StarsProps {
  rating: number
  className?: string
  tone?: 'teal' | 'white'
}

export function Stars({ rating, className = 'h-5 w-5', tone = 'teal' }: StarsProps) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100))
  const emptyClass = tone === 'white' ? 'text-white/30' : 'text-mint-300'
  const filledClass = tone === 'white' ? 'text-white' : 'text-teal-500'

  return (
    <span className="relative inline-flex" role="img" aria-label={`Rated ${rating} out of 5`}>
      <span className={`flex gap-0.5 ${emptyClass}`} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={className} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <span
        className={`absolute inset-0 flex gap-0.5 overflow-hidden ${filledClass}`}
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={`${className} shrink-0`} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
    </span>
  )
}
