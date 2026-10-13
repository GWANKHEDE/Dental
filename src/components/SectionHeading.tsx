import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
}

export function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  return (
    <Reveal
      className={`${
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
      }`}
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-teal-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink-900 text-balance sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
