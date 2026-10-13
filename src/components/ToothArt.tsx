import { useId } from 'react'

interface ToothArtProps {
  className?: string
}

export function ToothArt({ className }: ToothArtProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')

  return (
    <svg
      viewBox="0 0 200 214"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="55%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M100 24c-15 0-23 8.5-35 8.5S42 24 33 37.5C24.5 50.5 27.5 68 34 81c6.5 13 8.5 27 9.5 41.5 1 13.5 4.5 23.5 15 23.5 11.5 0 9.5-15.5 14.5-26.5 3-8 7-12 14-12s11 4 14 12c5 11 3 26.5 14.5 26.5 10.5 0 14-10 15-23.5 1-14.5 3-28 9.5-41.5 6.5-13 9.5-30.5 1-43.5C158 24 138 32.5 123 32.5S115 24 100 24Z"
        fill={`url(#${id}-body)`}
      />
      <path
        d="M100 24c-15 0-23 8.5-35 8.5S42 24 33 37.5C24.5 50.5 27.5 68 34 81c6.5 13 8.5 27 9.5 41.5 1 13.5 4.5 23.5 15 23.5 11.5 0 9.5-15.5 14.5-26.5 3-8 7-12 14-12s11 4 14 12c5 11 3 26.5 14.5 26.5 10.5 0 14-10 15-23.5 1-14.5 3-28 9.5-41.5 6.5-13 9.5-30.5 1-43.5C158 24 138 32.5 123 32.5S115 24 100 24Z"
        fill={`url(#${id}-shade)`}
      />
      <path
        d="M74 44c-4 2-6.5 6-6.8 10.8-.3 5 .6 9.6 2.4 13.4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M126 44c4 2 6.5 6 6.8 10.8.3 5-.6 9.6-2.4 13.4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}
