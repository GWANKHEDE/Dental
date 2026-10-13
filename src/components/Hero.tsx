import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'framer-motion'
import {
  Calendar,
  ChevronDown,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { CLINIC, HERO_IMAGE } from '../lib/clinic'
import { Stars } from './Stars'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

function AmbientOrbs() {
  const reduced = useReducedMotion()

  const orb = (
    className: string,
    x: number[],
    y: number[],
    duration: number,
  ) => (
    <motion.div
      aria-hidden="true"
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={reduced ? undefined : { x, y }}
      transition={
        reduced
          ? undefined
          : { duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
      }
    />
  )

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {orb('left-[8%] top-[12%] h-72 w-72 bg-mint-200/50', [0, 40], [0, -30], 18)}
      {orb('right-[6%] top-[38%] h-80 w-80 bg-teal-100/60', [0, -50], [0, 40], 22)}
      {orb('bottom-[8%] left-[30%] h-64 w-64 bg-mint-100/70', [0, 30], [0, -24], 20)}
    </div>
  )
}

function Chip({
  icon: Icon,
  label,
  className,
  delay = 0,
}: {
  icon: LucideIcon
  label: string
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()

  const inner = (
    <span
      className={`glass-strong inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold text-ink-900 ${className ?? ''}`}
    >
      <Icon className="h-4 w-4 text-teal-600" strokeWidth={1.8} />
      {label}
    </span>
  )

  if (reduced) {
    return inner
  }

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {inner}
    </motion.div>
  )
}

function HeroVisual() {
  const reduced = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 16 })
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 16 })
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6])

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[3.5rem] bg-gradient-to-br from-mint-200/70 via-teal-100/50 to-mint-100/70 blur-2xl"
      />

      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-4 sm:-inset-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full text-mint-300/70"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="1.5 4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>
      )}

      <motion.div
        style={reduced ? undefined : { rotateX, rotateY }}
        onPointerMove={
          reduced
            ? undefined
            : (event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                pointerX.set((event.clientX - rect.left) / rect.width * 2 - 1)
                pointerY.set((event.clientY - rect.top) / rect.height * 2 - 1)
              }
        }
        onPointerLeave={
          reduced
            ? undefined
            : () => {
                pointerX.set(0)
                pointerY.set(0)
              }
        }
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="glass relative rounded-[3rem] p-3 sm:p-4"
      >
        <div className="relative overflow-hidden rounded-[2.4rem]">
          <img
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            width={1200}
            height={1200}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="aspect-[4/5] w-full object-cover sm:aspect-square"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/10 via-transparent to-white/20"
          />
        </div>
      </motion.div>

      <Chip icon={Heart} label="Gentle care" className="absolute -left-3 top-10 sm:-left-8" delay={0.4} />
      <Chip
        icon={MessageCircle}
        label="Transparent plans"
        className="absolute -right-2 bottom-24 sm:-right-6"
        delay={1.1}
      />
    </div>
  )
}

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden">
      <AmbientOrbs />

      <div className="container-pad relative flex min-h-svh flex-col justify-center py-28 sm:py-32 lg:py-20">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <motion.div
            variants={containerVariants}
            initial={reduced ? false : 'hidden'}
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <a
                href={CLINIC.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong group inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-extrabold text-ink-600 transition-colors hover:text-teal-700"
              >
                <span className="flex items-center gap-1 rounded-full bg-mint-100 px-2.5 py-1">
                  <Stars rating={CLINIC.rating} className="h-3 w-3" />
                </span>
                {CLINIC.rating}/5 rated on Google
              </a>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-7 font-display text-[2.6rem] font-medium leading-[1.04] tracking-tight text-ink-900 text-balance sm:text-6xl lg:text-7xl"
            >
              Your smile deserves{' '}
              <span className="relative inline-block">
                <em className="whitespace-nowrap italic text-teal-600">exceptional care</em>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1.5 left-0 h-3 w-full text-teal-300"
                >
                  <motion.path
                    d="M3 10.5C60 3.5 150 2.5 217 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={reduced ? undefined : { pathLength: 0 }}
                    animate={reduced ? undefined : { pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 1.1, ease: 'easeOut' }}
                  />
                </svg>
              </span>
              .
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg"
            >
              Gentle, patient-focused dental care at Raj Mohammed Complex, Vivek
              Nagar Road — in the heart of Nanded.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#appointment" className="btn-primary">
                <Calendar className="h-4.5 w-4.5" strokeWidth={1.8} />
                Book Appointment
              </a>
              <a href={CLINIC.phoneHref} className="btn-outline">
                <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
                Call Now
                <span className="font-extrabold text-ink-400">{CLINIC.phone}</span>
              </a>
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-bold text-ink-600"
            >
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-teal-600" strokeWidth={1.8} />
                Mon–Sat · 10:00–20:30
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4.5 w-4.5 text-teal-600" strokeWidth={1.8} />
                Vivek Nagar Road, Nanded
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-teal-600" strokeWidth={1.8} />
                Transparent pricing
              </li>
            </motion.ul>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <motion.a
            href="#treatments"
            aria-label="Scroll to treatments"
            className="glass-strong pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full text-teal-700"
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5" strokeWidth={1.8} />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
