import { MapPin, MessageCircle, Phone, Star, Stethoscope, type LucideIcon } from 'lucide-react'
import { CLINIC, CLINIC_IMAGE } from '../lib/clinic'
import { Reveal } from './Reveal'
import { Stars } from './Stars'

interface Beat {
  icon: LucideIcon
  title: string
  text: string
}

const BEATS: Beat[] = [
  {
    icon: Stethoscope,
    title: 'Patient-first consultations',
    text: 'We listen first, then plan — with time for every question and care planned around your needs, whether it is a routine check-up or a complete smile restoration.',
  },
  {
    icon: MessageCircle,
    title: 'Clear, honest guidance',
    text: 'Straight explanations and transparent treatment planning — from your first call to your follow-up, every visit stays calm and transparent.',
  },
  {
    icon: MapPin,
    title: 'Easy to reach, easy to park',
    text: 'Located on Vivek Nagar Road in the heart of Nanded — convenient for patients across Maharashtra, with a rating of 4.3/5 on Google.',
  },
]

export function About() {
  return (
    <section
      id="about"
      aria-label="About us"
      className="scroll-mt-28 bg-mint-50/40 py-24 sm:py-28 lg:py-32"
    >
      <div className="container-pad grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-mint-200/70 via-mint-100/60 to-teal-100/50 blur-2xl"
          />
          <div className="glass relative rounded-[2.5rem] p-3 sm:p-4">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src={CLINIC_IMAGE.src}
                alt={CLINIC_IMAGE.alt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          <div className="glass-strong absolute -bottom-6 left-4 flex items-center gap-3.5 rounded-2xl p-4 sm:left-8">
            <span className="icon-badge-sm">
              <Star className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-base font-extrabold leading-tight text-ink-900">
                {CLINIC.rating}/5
              </p>
              <Stars rating={CLINIC.rating} className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="glass-strong absolute -right-3 top-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold text-ink-900 sm:-right-6">
            <MapPin className="h-4 w-4 text-teal-600" strokeWidth={1.8} />
            Nanded, Maharashtra
          </div>
        </Reveal>

        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.22em] text-teal-600">
            <span
              aria-hidden="true"
              className="h-px w-6 bg-gradient-to-r from-teal-400 to-transparent"
            />
            About us
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink-900 text-balance sm:text-5xl">
            A dental home in the heart of{' '}
            <em className="italic text-teal-600">Nanded</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">
            Global Dental Hospital is a patient-focused dental practice at Raj
            Mohammed Complex, Vivek Nagar Road — careful diagnosis, honest
            explanations, and treatment that puts your comfort first.
          </p>

          <ul className="mt-9 space-y-6">
            {BEATS.map((beat) => {
              const Icon = beat.icon
              return (
                <li key={beat.title} className="flex gap-4">
                  <span className="icon-badge">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      {beat.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">
                      {beat.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={CLINIC.phoneHref} className="btn-primary-sm">
              <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
              Call {CLINIC.phone}
            </a>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-sm"
            >
              <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.8} />
              WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
