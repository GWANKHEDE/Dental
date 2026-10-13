import { motion } from 'framer-motion'
import { MapPin, MessageCircle, Phone, Star, Stethoscope } from 'lucide-react'
import { CLINIC, TEETH_TYPES_IMAGE } from '../lib/clinic'
import { Stars } from './Stars'
import { StoryStage, type StoryBeat } from './StoryStage'

const BEATS: StoryBeat[] = [
  {
    icon: Stethoscope,
    eyebrow: 'About us',
    title: (
      <>
        A dental home in the heart of <em className="italic text-teal-700">Nanded</em>
      </>
    ),
    text: 'Global Dental Hospital is a dental care practice at Raj Mohammed Complex, Vivek Nagar Road, Nanded, Maharashtra — careful diagnosis, honest explanations, and treatment that puts your comfort first.',
    chip: 'Raj Mohammed Complex',
  },
  {
    icon: Star,
    eyebrow: 'How we work',
    title: (
      <>
        Patient-first <em className="italic text-teal-700">consultations</em>
      </>
    ),
    text: 'We listen first, then plan — with time for every question and care planned around your needs, whether it is a routine check-up or a complete smile restoration.',
    chip: 'Patient-first',
  },
  {
    icon: MessageCircle,
    eyebrow: 'Our promise',
    title: (
      <>
        Clear, honest <em className="italic text-teal-700">guidance</em>
      </>
    ),
    text: 'Straight explanations and transparent treatment planning — from your first call to your follow-up, every visit stays calm and transparent.',
    chip: 'Transparent',
  },
  {
    icon: MapPin,
    eyebrow: 'Find us',
    title: (
      <>
        Easy to reach, <em className="italic text-teal-700">easy to park</em>
      </>
    ),
    text: 'Located on Vivek Nagar Road in the heart of Nanded — convenient for patients across Maharashtra, with a rating of 4.3/5 on Google.',
    chip: 'Nanded, Maharashtra',
  },
]

function TeethVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-mint-200/70 via-mint-100 to-teal-100/60"
      />
      <div className="card relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint-100"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={TEETH_TYPES_IMAGE.src}
            alt={TEETH_TYPES_IMAGE.alt}
            width={1280}
            height={969}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="relative w-full rounded-2xl drop-shadow-xl"
          />
        </motion.div>
        <div className="relative mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="icon-badge !h-10 !w-10 !rounded-xl">
              <Star className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-base font-extrabold leading-tight text-ink-900">4.3/5</p>
              <Stars rating={CLINIC.rating} className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-base font-extrabold leading-tight text-ink-900">Nanded</p>
            <p className="text-xs font-semibold leading-tight text-ink-400">
              Maharashtra 431605
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function About() {
  return (
    <StoryStage
      id="about"
      ariaLabel="About us"
      className="bg-mint-50/40"
      beats={BEATS}
      visualSide="left"
      visual={<TeethVisual />}
      cta={
        <div className="mt-9 flex flex-wrap gap-4">
          <a href={CLINIC.phoneHref} className="btn-primary !px-6 !py-3">
            <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
            Call {CLINIC.phone}
          </a>
          <a
            href={CLINIC.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !px-6 !py-3"
          >
            <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.8} />
            WhatsApp us
          </a>
        </div>
      }
    />
  )
}
