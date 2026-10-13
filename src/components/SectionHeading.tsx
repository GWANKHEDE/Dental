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
      className={
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
      }
    >
      <p className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.22em] text-teal-600">
        <span
          aria-hidden="true"
          className="h-px w-6 bg-gradient-to-r from-teal-400 to-transparent"
        />
        {eyebrow}
        {align === 'center' ? (
          <span
            aria-hidden="true"
            className="h-px w-6 bg-gradient-to-l from-teal-400 to-transparent"
          />
        ) : null}
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
