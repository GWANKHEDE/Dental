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
    if (!open) {
      return undefined
    }
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  const pill = (
    <div
      className={`flex items-center justify-between gap-3 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
        scrolled ? 'glass-strong' : 'border border-transparent'
      }`}
    >
      <a
        href="#top"
        className="flex items-center gap-2.5"
        aria-label="Global Dental Hospital — home"
      >
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
                className="rounded-full px-4 py-2 text-sm font-bold text-ink-600 transition-colors duration-300 hover:bg-white/70 hover:text-teal-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2.5">
        <a
          href={CLINIC.phoneHref}
          className="hidden items-center gap-2 text-sm font-extrabold text-ink-900 transition-colors hover:text-teal-700 xl:inline-flex"
        >
          <Phone className="h-4.5 w-4.5 text-teal-600" strokeWidth={1.8} />
          {CLINIC.phone}
        </a>
        <a href="#appointment" className="btn-primary-sm hidden sm:inline-flex">
          <Calendar className="h-4.5 w-4.5" strokeWidth={1.8} />
          Book Appointment
        </a>
        <button
          type="button"
          className="glass-strong inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`container-pad transition-[padding] duration-500 ${
          scrolled ? 'pt-2.5' : 'pt-4'
        }`}
      >
        {reduced ? (
          pill
        ) : (
          <motion.div
            initial={{ y: -28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {pill}
          </motion.div>
        )}
      </div>

      <div className="container-pad lg:hidden">
        <AnimatePresence initial={false}>
          {open &&
            (reduced ? (
              <nav id="mobile-menu" aria-label="Mobile" className="mt-2">
                <div className="glass-strong rounded-3xl">
                  <MobileMenuLinks onNavigate={() => setOpen(false)} />
                </div>
              </nav>
            ) : (
              <motion.nav
                id="mobile-menu"
                aria-label="Mobile"
                className="mt-2 overflow-hidden"
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="glass-strong rounded-3xl">
                  <MobileMenuLinks onNavigate={() => setOpen(false)} />
                </div>
              </motion.nav>
            ))}
        </AnimatePresence>
      </div>
    </header>
  )
}

function MobileMenuLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="space-y-1 px-4 pb-5 pt-3 sm:px-5">
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
