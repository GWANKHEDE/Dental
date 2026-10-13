import { Calendar, Heart, MapPin, MessageCircle, Phone, Star, type LucideIcon } from 'lucide-react'
import { CLINIC, BANNER_IMAGE } from '../lib/clinic'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const REASONS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: Heart,
    title: 'Patient-first care',
    text: 'Every treatment begins with listening. We explain options in plain language and respect your decisions.',
  },
  {
    icon: MessageCircle,
    title: 'Clear communication',
    text: 'Transparent treatment plans and pricing, discussed with you before anything begins.',
  },
  {
    icon: Star,
    title: 'Community trusted',
    text: `Rated ${CLINIC.rating}/5 on Google by the patients we serve across Nanded and beyond.`,
  },
  {
    icon: MapPin,
    title: 'Convenient location',
    text: 'At Raj Mohammed Complex, Vivek Nagar Road — easy to reach from across Nanded, Maharashtra.',
  },
]

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      aria-label="Why choose us"
      className="scroll-mt-28 py-24 sm:py-28 lg:py-32"
    >
      <div className="container-pad">
        <SectionHeading
          eyebrow="Why choose us"
          title={
            <>
              Why patients choose <em className="italic text-teal-600">us</em>
            </>
          }
          description="A calm, welcoming clinic where your comfort and trust come first."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div key={reason.title} className="relative">
                <Reveal delay={index * 0.07} className="h-full">
                  <article className="card group relative flex h-full flex-col items-start overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-lg">
                    <span
                      aria-hidden="true"
                      className="absolute right-6 top-5 font-display text-5xl font-semibold text-mint-100 transition-colors duration-300 group-hover:text-mint-200"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="icon-badge relative">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <h3 className="relative mt-4 font-display text-xl font-semibold text-ink-900">
                      {reason.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-ink-600">
                      {reason.text}
                    </p>
                  </article>
                </Reveal>
              </div>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_28px_64px_-24px_rgb(13_148_136/0.45)]">
            <img
              src={BANNER_IMAGE.src}
              alt={BANNER_IMAGE.alt}
              width={1600}
              height={640}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-teal-800/90 via-teal-700/80 to-teal-600/70"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]"
            />
            <div className="relative px-8 py-12 text-center sm:px-14 sm:py-16">
              <p className="font-display text-2xl font-medium text-white text-balance sm:text-3xl">
                Ready to experience exceptional care?
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-relaxed text-teal-50 sm:text-base">
                Booking takes less than a minute — call us or send an appointment
                request and we will confirm your visit.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#appointment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-teal-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Calendar className="h-4.5 w-4.5" strokeWidth={1.8} />
                  Book Appointment
                </a>
                <a
                  href={CLINIC.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
                  {CLINIC.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
