import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface StoryBeat {
  icon: LucideIcon
  eyebrow: string
  title: ReactNode
  text: string
  chip: string
  heading?: 'h1' | 'h2'
  badge?: ReactNode
}

interface StoryStageProps {
  id?: string
  ariaLabel: string
  className?: string
  beats: StoryBeat[]
  visual: ReactNode
  visualSide?: 'left' | 'right'
  cta?: ReactNode
}

function BeatContent({ beat, centered = false }: { beat: StoryBeat; centered?: boolean }) {
  const Icon = beat.icon
  const HeadingTag = beat.heading ?? 'h2'

  return (
    <div className={centered ? 'flex flex-col items-center text-center' : undefined}>
      {beat.badge ?? (
        <span className="icon-badge !h-14 !w-14 !rounded-2xl">
          <Icon className="h-7 w-7" strokeWidth={1.6} />
        </span>
      )}
      <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.22em] text-teal-600">
        {beat.eyebrow}
      </p>
      <HeadingTag className="mt-4 font-display text-4xl font-medium leading-[1.06] tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
        {beat.title}
      </HeadingTag>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
        {beat.text}
      </p>
    </div>
  )
}

export function StoryStage({
  id,
  ariaLabel,
  className = '',
  beats,
  visual,
  visualSide = 'right',
  cta,
}: StoryStageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setStep(Math.min(beats.length - 1, Math.floor(value * beats.length)))
  })

  const scrollToStep = (index: number) => {
    const el = containerRef.current
    if (!el) {
      return
    }
    const top = el.getBoundingClientRect().top + window.scrollY
    const segment = el.offsetHeight / beats.length
    window.scrollTo({
      top: top + segment * (index + 0.5),
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  if (reduced) {
    return (
      <section id={id} aria-label={ariaLabel} className={`relative overflow-hidden ${className}`}>
        <div className="container-pad py-20 lg:py-24">
          <div className="mx-auto mb-16 w-full max-w-md">{visual}</div>
          {beats.map((beat, index) => (
            <div key={beat.eyebrow} className="mx-auto max-w-2xl pb-16">
              <BeatContent beat={beat} centered />
              {index === 0 && cta ? <div className="mt-9 flex justify-center">{cta}</div> : null}
            </div>
          ))}
        </div>
      </section>
    )
  }

  const visualColumn = (
    <motion.div style={{ scale: visualScale }} className="relative mx-auto w-full max-w-[16rem] sm:max-w-md lg:max-w-lg">
      {visual}
      <div className="absolute -right-2 top-6 sm:-right-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="card flex items-center gap-2.5 rounded-2xl px-4 py-2.5"
            aria-hidden="true"
          >
            {(() => {
              const Icon = beats[step].icon
              return <Icon className="h-4.5 w-4.5 text-teal-600" strokeWidth={1.8} />
            })()}
            <span className="text-sm font-extrabold text-ink-900">{beats[step].chip}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )

  return (
    <div ref={containerRef} className="relative" style={{ height: `${beats.length * 100}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="container-pad relative z-10 m-auto w-full pt-24 pb-16">
          <div
            className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-6 ${
              visualSide === 'left' ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -26, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <BeatContent beat={beats[step]} />
                </motion.div>
              </AnimatePresence>
              {cta}
            </div>
            {visualColumn}
          </div>
        </div>

        <div className="relative z-10 flex justify-center pb-6">
          <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/50 p-1.5 backdrop-blur-xl">
            {beats.map((beat, index) => (
              <button
                key={beat.eyebrow}
                type="button"
                onClick={() => scrollToStep(index)}
                aria-label={`Go to ${beat.eyebrow}`}
                aria-current={index === step ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === step ? 'w-8 bg-teal-600' : 'w-2 bg-teal-600/25 hover:bg-teal-600/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
