import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Calendar, Menu, Phone, X } from 'lucide-react'
import { CLINIC } from '../lib/clinic'
import { ToothArt } from './ToothArt'

const NAV_LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'About Us', href: '#about' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'border-white/60 bg-white/70 shadow-[0_8px_30px_-12px_rgba(13,148,136,0.18)] backdrop-blur-2xl'
          : 'border-transparent bg-white/40 backdrop-blur-xl'
      }`}
    >
      <div className="container-pad">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Global Dental Hospital — home">
            <ToothArt className="h-9 w-9 drop-shadow-sm" />
            <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
              Global Dental <span className="text-teal-600">Hospital</span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-bold text-ink-600 transition-colors hover:bg-white/70 hover:text-teal-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CLINIC.phoneHref}
              className="hidden items-center gap-2 text-sm font-extrabold text-ink-900 transition-colors hover:text-teal-700 xl:inline-flex"
            >
              <Phone className="h-4.5 w-4.5 text-teal-600" strokeWidth={1.8} />
              {CLINIC.phone}
            </a>
            <a href="#appointment" className="btn-primary hidden !px-6 !py-2.5 sm:inline-flex">
              <Calendar className="h-4.5 w-4.5" strokeWidth={1.8} />
              Book Appointment
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/60 text-ink-900 backdrop-blur-xl transition-colors hover:bg-white/80 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open &&
          (reduced ? (
            <nav
              id="mobile-menu"
              aria-label="Mobile"
              className="border-b border-white/60 bg-white/80 backdrop-blur-2xl lg:hidden"
            >
              <MobileMenuLinks onNavigate={() => setOpen(false)} />
            </nav>
          ) : (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-b border-white/60 bg-white/80 backdrop-blur-2xl lg:hidden"
            >
              <MobileMenuLinks onNavigate={() => setOpen(false)} />
            </motion.nav>
          ))}
      </AnimatePresence>
    </header>
  )
}

function MobileMenuLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="space-y-1 px-6 pb-6 pt-3">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onNavigate}
            className="block rounded-xl px-4 py-3 text-base font-bold text-ink-900 transition-colors hover:bg-white/70 hover:text-teal-700"
          >
            {link.label}
          </a>
        </li>
      ))}
      <li className="pt-3">
        <a href="#appointment" onClick={onNavigate} className="btn-primary w-full">
          <Calendar className="h-4.5 w-4.5" strokeWidth={1.8} />
          Book Appointment
        </a>
      </li>
      <li>
        <a href={CLINIC.phoneHref} onClick={onNavigate} className="btn-outline w-full">
          <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
          Call {CLINIC.phone}
        </a>
      </li>
    </ul>
  )
}
