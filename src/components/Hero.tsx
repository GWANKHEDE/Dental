import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Calendar, Heart, MapPin, MessageCircle, Phone } from 'lucide-react'
import { CLINIC, TOOTH_IMAGE } from '../lib/clinic'
import { Stars } from './Stars'
import { StoryStage, type StoryBeat } from './StoryStage'

const BEATS: StoryBeat[] = [
  {
    icon: Heart,
    eyebrow: 'Global Dental Hospital · Nanded',
    title: (
      <>
        Your Smile Deserves{' '}
        <span className="relative inline-block whitespace-nowrap">
          <em className="italic text-teal-700">Exceptional Care</em>
          <svg
            aria-hidden="true"
            viewBox="0 0 220 14"
            preserveAspectRatio="none"
            className="absolute -bottom-2 left-0 h-3 w-full text-teal-300"
          >
            <path
              d="M3 10.5C60 3.5 150 2.5 217 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </span>
        .
      </>
    ),
    text: 'Gentle, patient-focused dental care at Raj Mohammed Complex, Vivek Nagar Road — in the heart of Nanded.',
    chip: 'Patient-first care',
    heading: 'h1',
    badge: (
      <a
        href={CLINIC.googleReviews}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/70 py-1.5 pl-2 pr-4 text-xs font-extrabold text-ink-600 shadow-sm backdrop-blur transition-colors hover:border-teal-300 hover:text-teal-700"
      >
        <span className="flex items-center gap-1 rounded-full bg-mint-100 px-2.5 py-1">
          <Stars rating={CLINIC.rating} className="h-3 w-3" />
        </span>
        4.3/5 rated on Google
      </a>
    ),
  },
  {
    icon: Heart,
    eyebrow: 'How we care',
    title: (
      <>
        Gentle care, <em className="italic text-teal-700">first</em>.
      </>
    ),
    text: 'Every treatment begins with listening. We explain everything in plain language and respect your pace.',
    chip: 'Gentle & honest',
  },
  {
    icon: MessageCircle,
    eyebrow: 'Treatment planning',
    title: (
      <>
        Clear plans, <em className="italic text-teal-700">no surprises</em>.
      </>
    ),
    text: 'Transparent treatment options and pricing, discussed with you before anything begins.',
    chip: 'Transparent planning',
  },
  {
    icon: MapPin,
    eyebrow: 'Visit us',
    title: (
      <>
        In the heart of <em className="italic text-teal-700">Nanded</em>.
      </>
    ),
    text: 'Raj Mohammed Complex, Vivek Nagar Road, Nanded, Maharashtra 431605 — rated 4.3/5 on Google.',
    chip: 'Vivek Nagar Road',
  },
]

function ToothVisual() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 18 })
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7])

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      className="relative aspect-square"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - rect.left) / rect.width * 2 - 1)
        pointerY.set((event.clientY - rect.top) / rect.height * 2 - 1)
      }}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-4 rounded-[3rem] border border-white/70 bg-white/50 shadow-[0_24px_60px_-20px_rgba(13,148,136,0.22)] backdrop-blur-2xl"
      />
      <div aria-hidden="true" className="animate-spin-slow absolute inset-3">
        <svg viewBox="0 0 100 100" className="h-full w-full text-mint-300/60">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="1.5 4"
          />
        </svg>
      </div>
      <div className="relative p-5 sm:p-8">
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <img
            src={TOOTH_IMAGE.src}
            alt={TOOTH_IMAGE.alt}
            width={1280}
            height={1280}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full drop-shadow-2xl"
          />
        </motion.div>
      </div>
      <div
        aria-hidden="true"
        className="absolute -bottom-1 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-full bg-teal-900/10 blur-xl"
      />
    </motion.div>
  )
}

export function Hero() {
  return (
    <StoryStage
      id="top"
      ariaLabel="Introduction"
      className="bg-white"
      beats={BEATS}
      visual={<ToothVisual />}
      cta={
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#appointment" className="btn-primary">
            <Calendar className="h-4.5 w-4.5" strokeWidth={1.8} />
            Book Appointment
          </a>
          <a href={CLINIC.phoneHref} className="btn-outline">
            <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
            Call Now
            <span className="font-extrabold text-ink-400">{CLINIC.phone}</span>
          </a>
        </div>
      }
    />
  )
}
