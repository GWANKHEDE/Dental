import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import { CLINIC, TREATMENTS } from '../lib/clinic'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { Stars } from './Stars'

interface FormState {
  name: string
  phone: string
  email: string
  treatment: string
  date: string
  time: string
  notes: string
}

const INITIAL_STATE: FormState = {
  name: '',
  phone: '',
  email: '',
  treatment: 'General check-up',
  date: '',
  time: '',
  notes: '',
}

const TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening']

type FormErrors = Partial<Record<keyof FormState, string>>

const TODAY = new Date().toISOString().split('T')[0]

function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  const normalized =
    digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits
  return /^[6-9]\d{9}$/.test(normalized)
}

export function Appointment() {
  const reduced = useReducedMotion()
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<FormErrors>({})
  const [booking, setBooking] = useState<FormState | null>(null)

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) {
        return prev
      }
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: FormErrors = {}
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.'
    }
    if (!validatePhone(form.phone)) {
      nextErrors.phone = 'Please enter a valid 10-digit mobile number.'
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.date) {
      nextErrors.date = 'Please choose a preferred date.'
    }
    if (!form.time) {
      nextErrors.time = 'Please choose a preferred time.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const message = [
      'Hello Global Dental Hospital, I would like to book an appointment.',
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : '',
      `Treatment: ${form.treatment}`,
      `Preferred date: ${form.date}`,
      `Preferred time: ${form.time}`,
      form.notes.trim() ? `Notes: ${form.notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(
      `https://wa.me/919096968440?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    )
    setBooking(form)
  }

  const reset = () => {
    setForm(INITIAL_STATE)
    setErrors({})
    setBooking(null)
  }

  return (
    <section
      id="appointment"
      aria-label="Book an appointment"
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-pad">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              eyebrow="Appointment"
              title={
                <>
                  Book your <em className="italic text-teal-700">visit</em>
                </>
              }
              description="Send a request and we will confirm your slot by WhatsApp or phone. For urgent concerns, please call us directly."
            />

            <Reveal delay={0.1}>
              <ul className="mt-7 space-y-3.5">
                <li>
                  <a
                    href={CLINIC.phoneHref}
                    className="card group flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-mint-300/80"
                  >
                    <span className="icon-badge">
                      <Phone className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-ink-400">
                        Call us
                      </span>
                      <span className="block text-base font-extrabold text-ink-900 transition-colors group-hover:text-teal-700">
                        {CLINIC.phone}
                      </span>
                    </span>
                    <ArrowRight className="ml-auto h-5 w-5 text-ink-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-teal-600" strokeWidth={1.8} />
                  </a>
                </li>
                <li>
                  <a
                    href={CLINIC.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-mint-300/80"
                  >
                    <span className="icon-badge">
                      <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-ink-400">
                        WhatsApp
                      </span>
                      <span className="block text-base font-extrabold text-ink-900 transition-colors group-hover:text-teal-700">
                        Message us anytime
                      </span>
                    </span>
                    <ArrowRight className="ml-auto h-5 w-5 text-ink-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-teal-600" strokeWidth={1.8} />
                  </a>
                </li>
                <li>
                  <div className="card flex items-center gap-4 p-4">
                    <span className="icon-badge">
                      <MapPin className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-ink-400">
                        Visit us
                      </span>
                      <span className="block text-base font-extrabold text-ink-900">
                        Vivek Nagar Road, Nanded
                      </span>
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-2.5 px-1 text-sm font-bold text-ink-600">
                  <Stars rating={CLINIC.rating} className="h-4 w-4" />
                  Rated {CLINIC.rating}/5 on Google
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:col-span-3">
            <div className="card overflow-hidden">
              <div className="border-b border-mint-100 bg-mint-50/60 px-6 py-5 sm:px-8">
                <h3 className="font-display text-2xl font-semibold text-ink-900">
                  Request an appointment
                </h3>
                <p className="mt-1 text-sm font-semibold text-ink-600">
                  Fill in your details — it takes less than a minute.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  {booking ? (
                    <motion.div
                      key="success"
                      initial={reduced ? undefined : { opacity: 0, y: 16 }}
                      animate={reduced ? undefined : { opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex flex-col items-start gap-4">
                        <span className="icon-badge !h-12 !w-12 !rounded-2xl !bg-teal-600 !text-white">
                          <Check className="h-6 w-6" strokeWidth={2} />
                        </span>
                        <div>
                          <h4 className="font-display text-2xl font-semibold text-ink-900">
                            Request sent, {booking.name.trim().split(' ')[0]}
                          </h4>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                            WhatsApp opened with your details so you can send them
                            to us. We will confirm your slot shortly. If WhatsApp
                            did not open, please call {CLINIC.phone}.
                          </p>
                        </div>
                        <dl className="w-full divide-y divide-mint-100 rounded-2xl border border-mint-100 bg-mint-50/50 px-4 py-1 text-sm">
                          {[
                            ['Treatment', booking.treatment],
                            ['Preferred date', booking.date],
                            ['Preferred time', booking.time],
                            ['Phone', booking.phone],
                          ].map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4 py-2.5">
                              <dt className="font-bold text-ink-400">{label}</dt>
                              <dd className="text-right font-extrabold text-ink-900">{value}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="flex flex-wrap gap-3">
                          <a href={CLINIC.phoneHref} className="btn-primary !px-5 !py-2.5">
                            <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
                            Call to confirm
                          </a>
                          <button type="button" onClick={reset} className="btn-outline !px-5 !py-2.5">
                            Book another appointment
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={reduced ? undefined : { opacity: 0, y: 16 }}
                      animate={reduced ? undefined : { opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="appt-name" className="label">
                            Full name <span aria-hidden="true" className="text-teal-600">*</span>
                          </label>
                          <input
                            id="appt-name"
                            type="text"
                            value={form.name}
                            onChange={(event) => update('name', event.target.value)}
                            className="input"
                            placeholder="Your full name"
                            autoComplete="name"
                            required
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'appt-name-error' : undefined}
                          />
                          {errors.name ? (
                            <p id="appt-name-error" role="alert" className="mt-1.5 text-xs font-bold text-rose-600">
                              {errors.name}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <label htmlFor="appt-phone" className="label">
                            Mobile number <span aria-hidden="true" className="text-teal-600">*</span>
                          </label>
                          <input
                            id="appt-phone"
                            type="tel"
                            inputMode="numeric"
                            value={form.phone}
                            onChange={(event) => update('phone', event.target.value)}
                            className="input"
                            placeholder="98765 43210"
                            autoComplete="tel"
                            required
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? 'appt-phone-error' : undefined}
                          />
                          {errors.phone ? (
                            <p id="appt-phone-error" role="alert" className="mt-1.5 text-xs font-bold text-rose-600">
                              {errors.phone}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="appt-email" className="label">
                            Email <span className="font-semibold normal-case tracking-normal text-ink-400">(optional)</span>
                          </label>
                          <input
                            id="appt-email"
                            type="email"
                            value={form.email}
                            onChange={(event) => update('email', event.target.value)}
                            className="input"
                            placeholder="you@example.com"
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'appt-email-error' : undefined}
                          />
                          {errors.email ? (
                            <p id="appt-email-error" role="alert" className="mt-1.5 text-xs font-bold text-rose-600">
                              {errors.email}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <label htmlFor="appt-treatment" className="label">
                            Treatment
                          </label>
                          <select
                            id="appt-treatment"
                            value={form.treatment}
                            onChange={(event) => update('treatment', event.target.value)}
                            className="input"
                          >
                            <option>General check-up</option>
                            {TREATMENTS.map((treatment) => (
                              <option key={treatment.title}>{treatment.title}</option>
                            ))}
                            <option>Other / not sure</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="appt-date" className="label">
                            Preferred date <span aria-hidden="true" className="text-teal-600">*</span>
                          </label>
                          <input
                            id="appt-date"
                            type="date"
                            min={TODAY}
                            value={form.date}
                            onChange={(event) => update('date', event.target.value)}
                            className="input"
                            required
                            aria-invalid={Boolean(errors.date)}
                            aria-describedby={errors.date ? 'appt-date-error' : undefined}
                          />
                          {errors.date ? (
                            <p id="appt-date-error" role="alert" className="mt-1.5 text-xs font-bold text-rose-600">
                              {errors.date}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <label htmlFor="appt-time" className="label">
                            Preferred time <span aria-hidden="true" className="text-teal-600">*</span>
                          </label>
                          <select
                            id="appt-time"
                            value={form.time}
                            onChange={(event) => update('time', event.target.value)}
                            className="input"
                            required
                            aria-invalid={Boolean(errors.time)}
                            aria-describedby={errors.time ? 'appt-time-error' : undefined}
                          >
                            <option value="">Select a time</option>
                            {TIME_OPTIONS.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                          {errors.time ? (
                            <p id="appt-time-error" role="alert" className="mt-1.5 text-xs font-bold text-rose-600">
                              {errors.time}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="appt-notes" className="label">
                          Notes <span className="font-semibold normal-case tracking-normal text-ink-400">(optional)</span>
                        </label>
                        <textarea
                          id="appt-notes"
                          rows={2}
                          value={form.notes}
                          onChange={(event) => update('notes', event.target.value)}
                          className="input resize-none"
                          placeholder="Anything we should know about your visit?"
                        />
                      </div>

                      <button type="submit" className="btn-primary w-full sm:w-auto">
                        <Send className="h-4.5 w-4.5" strokeWidth={1.8} />
                        Send appointment request
                      </button>
                      <p className="text-xs font-semibold leading-relaxed text-ink-400">
                        By submitting, your details are sent to the clinic via WhatsApp to
                        confirm your appointment. We do not store them on this website.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
