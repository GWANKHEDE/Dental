import { ArrowRight } from 'lucide-react'
import { CLINIC, TREATMENTS } from '../lib/clinic'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Treatments() {
  return (
    <section
      id="treatments"
      aria-label="Treatments"
      className="scroll-mt-28 py-24 sm:py-28 lg:py-32"
    >
      <div className="container-pad">
        <SectionHeading
          eyebrow="Treatments"
          title={
            <>
              Care for every <em className="italic text-teal-600">smile</em>
            </>
          }
          description="From routine check-ups to advanced restorative care, planned around your comfort and long-term oral health. Call to confirm availability."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TREATMENTS.map((treatment, index) => {
            const Icon = treatment.icon
            return (
              <li key={treatment.title}>
                <Reveal delay={(index % 4) * 0.07} className="h-full">
                  <article className="card group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-lg">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-mint-100/0 via-mint-100/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span className="icon-badge relative">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <h3 className="relative mt-4 font-display text-lg font-semibold text-ink-900">
                      {treatment.title}
                    </h3>
                    <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                      {treatment.description}
                    </p>
                    <a
                      href={CLINIC.phoneHref}
                      className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-teal-700 transition-colors hover:text-teal-800"
                    >
                      Ask about this treatment
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </a>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
