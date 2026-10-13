import { Calendar, MapPin, MessageCircle, Phone, Star } from 'lucide-react'
import { CLINIC } from '../lib/clinic'
import { ToothArt } from './ToothArt'

const QUICK_LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'About Us', href: '#about' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Book Appointment', href: '#appointment' },
  { label: 'Contact & Location', href: '#contact' },
]

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-mint-100/80 bg-white/55 backdrop-blur-xl">
      <div className="container-pad py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <a
              href="#top"
              className="flex items-center gap-2.5"
              aria-label="Global Dental Hospital — back to top"
            >
              <ToothArt className="h-9 w-9" />
              <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
                Global Dental <span className="text-teal-600">Hospital</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
              Patient-focused dental care at Raj Mohammed Complex, Vivek Nagar
              Road, Nanded, Maharashtra.
            </p>
            <a
              href={CLINIC.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-mint-200 bg-white/70 px-3.5 py-1.5 text-xs font-bold text-ink-600 transition-colors hover:border-teal-300 hover:text-teal-700"
            >
              <Star className="h-3.5 w-3.5 text-teal-500" strokeWidth={1.8} />
              {CLINIC.rating}/5 on Google
            </a>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-700">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-ink-600 transition-colors hover:text-teal-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-700">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={CLINIC.phoneHref}
                  className="flex items-center gap-3 text-sm font-semibold text-ink-600 transition-colors hover:text-teal-700"
                >
                  <Phone className="h-4.5 w-4.5 shrink-0 text-teal-600" strokeWidth={1.8} />
                  {CLINIC.phone}
                </a>
              </li>
              <li>
                <a
                  href={CLINIC.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-ink-600 transition-colors hover:text-teal-700"
                >
                  <MessageCircle className="h-4.5 w-4.5 shrink-0 text-teal-600" strokeWidth={1.8} />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href={CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm font-semibold text-ink-600 transition-colors hover:text-teal-700"
                >
                  <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal-600" strokeWidth={1.8} />
                  <span>{CLINIC.address}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-700">
              Book a visit
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              Appointments take less than a minute to request.
            </p>
            <div className="mt-4 space-y-3">
              <a href="#appointment" className="btn-primary-sm w-full">
                <Calendar className="h-4 w-4" strokeWidth={1.8} />
                Book Appointment
              </a>
              <a href={CLINIC.phoneHref} className="btn-outline-sm w-full">
                <Phone className="h-4 w-4" strokeWidth={1.8} />
                Call {CLINIC.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-mint-100 pt-7 sm:flex-row">
          <p className="text-xs font-semibold text-ink-400">
            © {CURRENT_YEAR} Global Dental Hospital. All rights reserved.
          </p>
          <p className="text-xs font-semibold text-ink-400">
            Nanded, Maharashtra 431605 · Imagery via Unsplash · For urgent
            concerns, call {CLINIC.phone}
          </p>
        </div>
      </div>
    </footer>
  )
}
