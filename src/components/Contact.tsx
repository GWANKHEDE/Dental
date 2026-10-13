import {
  ArrowRight,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Star,
} from 'lucide-react'
import { CLINIC } from '../lib/clinic'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { Stars } from './Stars'

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact and location"
      className="scroll-mt-28 bg-mint-50/40 py-24 sm:py-28 lg:py-32"
    >
      <div className="container-pad">
        <SectionHeading
          eyebrow="Contact & location"
          title={
            <>
              Visit us in <em className="italic text-teal-600">Nanded</em>
            </>
          }
          description="Raj Mohammed Complex, Vivek Nagar Road — easy to reach from anywhere in the city. Call, WhatsApp, or drop by."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Reveal>
            <article className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-lg">
              <span className="icon-badge">
                <MapPin className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
                Our address
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                {CLINIC.address}
              </p>
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-teal-700 transition-colors hover:text-teal-800"
              >
                <Navigation className="h-4.5 w-4.5" strokeWidth={1.8} />
                Get directions
              </a>
            </article>
          </Reveal>

          <Reveal delay={0.07}>
            <article className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-lg">
              <span className="icon-badge">
                <Phone className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
                Call or WhatsApp
              </h3>
              <a
                href={CLINIC.phoneHref}
                className="mt-2 text-lg font-extrabold text-ink-900 transition-colors hover:text-teal-700"
              >
                {CLINIC.phone}
              </a>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-600">
                Reach us by phone or WhatsApp for appointments and queries.
              </p>
              <div className="mt-4 flex gap-3">
                <a href={CLINIC.phoneHref} className="btn-primary-sm">
                  <Phone className="h-4 w-4" strokeWidth={1.8} />
                  Call now
                </a>
                <a
                  href={CLINIC.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-sm"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                  WhatsApp
                </a>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.14}>
            <article className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-lg">
              <span className="icon-badge">
                <Star className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
                Patient rating
              </h3>
              <div className="mt-2 flex items-center gap-2.5">
                <span className="font-display text-3xl font-semibold text-ink-900">
                  {CLINIC.rating}
                </span>
                <Stars rating={CLINIC.rating} className="h-5 w-5" />
              </div>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-600">
                Rated by patients on Google.
              </p>
              <a
                href={CLINIC.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-teal-700 transition-colors hover:text-teal-800"
              >
                Read reviews
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass mt-6 overflow-hidden rounded-[2rem] p-2">
            <div className="overflow-hidden rounded-[1.6rem]">
              <iframe
                title="Map showing Global Dental Hospital on Vivek Nagar Road, Nanded"
                src={CLINIC.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 sm:h-80"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
