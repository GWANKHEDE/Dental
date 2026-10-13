import { useEffect, useState, type FormEvent } from 'react'
import { Check, MessageCircle, Send, Star, Trash2 } from 'lucide-react'
import { CLINIC } from '../lib/clinic'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { Stars } from './Stars'

interface FeedbackEntry {
  name: string
  rating: number
  comment: string
  date: string
}

const STORAGE_KEY = 'gdh-patient-feedback'

function isValidEntry(value: unknown): value is FeedbackEntry {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const entry = value as Record<string, unknown>
  return (
    typeof entry.name === 'string' &&
    typeof entry.rating === 'number' &&
    typeof entry.comment === 'string' &&
    typeof entry.date === 'string'
  )
}

function loadFeedback(): FeedbackEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isValidEntry) : []
  } catch {
    return []
  }
}

function saveFeedback(entries: FeedbackEntry[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    return
  }
}

export function Reviews() {
  const [entries, setEntries] = useState<FeedbackEntry[]>(() => loadFeedback())
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState<{ name?: string; comment?: string }>({})
  const [notice, setNotice] = useState(false)

  useEffect(() => {
    if (!notice) {
      return undefined
    }
    const timer = window.setTimeout(() => setNotice(false), 5000)
    return () => window.clearTimeout(timer)
  }, [notice])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: { name?: string; comment?: string } = {}
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.'
    }
    if (comment.trim().length < 4) {
      nextErrors.comment = 'Please share a few words about your experience.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const entry: FeedbackEntry = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
    }
    const next = [entry, ...entries].slice(0, 3)
    setEntries(next)
    saveFeedback(next)
    setName('')
    setComment('')
    setRating(5)
    setNotice(true)
  }

  const removeEntry = (date: string) => {
    const next = entries.filter((entry) => entry.date !== date)
    setEntries(next)
    saveFeedback(next)
  }

  return (
    <section
      id="reviews"
      aria-label="Patient reviews"
      className="scroll-mt-28 bg-mint-50/40 py-24 sm:py-28 lg:py-32"
    >
      <div className="container-pad">
        <SectionHeading
          eyebrow="Patient reviews"
          title={
            <>
              Trusted by our <em className="italic text-teal-600">patients</em>
            </>
          }
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-7 text-white shadow-[0_28px_64px_-24px_rgb(13_148_136/0.5)] sm:p-9">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]"
              />

              <div className="relative">
                <div className="flex items-end gap-4">
                  <span className="font-display text-7xl font-semibold leading-none">
                    {CLINIC.rating}
                  </span>
                  <div className="pb-1.5">
                    <Stars rating={CLINIC.rating} className="h-6 w-6" tone="white" />
                    <p className="mt-1.5 text-sm font-bold text-teal-50">
                      out of 5 on Google
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-teal-50">
                  Patients rate Global Dental Hospital {CLINIC.rating} out of 5
                  stars on Google. Read their reviews, or share your own
                  experience after your visit.
                </p>
                <div className="mt-7 flex flex-wrap gap-3.5">
                  <a
                    href={CLINIC.googleReviews}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-teal-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Star className="h-4.5 w-4.5" strokeWidth={1.8} />
                    Read Google reviews
                  </a>
                  <a
                    href={CLINIC.googleReviews}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.8} />
                    Share your experience
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3">
            <div className="card p-6 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-ink-900">
                Share your experience
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                Stored on this device — you can also post it on Google.
              </p>

              {notice ? (
                <p
                  role="status"
                  className="mt-4 flex items-center gap-2.5 rounded-xl border border-mint-200 bg-mint-50 px-4 py-2.5 text-sm font-bold text-teal-800"
                >
                  <Check className="h-4.5 w-4.5 shrink-0" strokeWidth={2} />
                  Thank you — your feedback has been saved on this device.
                </p>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="review-name" className="label">
                      Your name
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="input"
                      placeholder="e.g. Ankita S."
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'review-name-error' : undefined}
                    />
                    {errors.name ? (
                      <p id="review-name-error" role="alert" className="mt-1.5 text-xs font-bold text-rose-600">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="review-rating" className="label">
                      Your rating
                    </label>
                    <select
                      id="review-rating"
                      value={rating}
                      onChange={(event) => setRating(Number(event.target.value))}
                      className="input"
                    >
                      <option value={5}>5 — Excellent</option>
                      <option value={4}>4 — Good</option>
                      <option value={3}>3 — Average</option>
                      <option value={2}>2 — Poor</option>
                      <option value={1}>1 — Very poor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="review-comment" className="label">
                    Your feedback
                  </label>
                  <textarea
                    id="review-comment"
                    rows={3}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    className="input resize-none"
                    placeholder="How was your visit?"
                    aria-invalid={Boolean(errors.comment)}
                    aria-describedby={errors.comment ? 'review-comment-error' : undefined}
                  />
                  {errors.comment ? (
                    <p id="review-comment-error" role="alert" className="mt-1.5 text-xs font-bold text-rose-600">
                      {errors.comment}
                    </p>
                  ) : null}
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  <Send className="h-4.5 w-4.5" strokeWidth={1.8} />
                  Save feedback
                </button>
              </form>

              {entries.length > 0 ? (
                <div className="mt-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-400">
                    Recent feedback from this device
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {entries.map((entry) => (
                      <li
                        key={entry.date}
                        className="rounded-2xl border border-mint-100 bg-mint-50/50 p-3.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-extrabold text-ink-900">
                              {entry.name}
                            </p>
                            <div className="mt-0.5">
                              <Stars rating={entry.rating} className="h-3.5 w-3.5" />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeEntry(entry.date)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-white hover:text-rose-600"
                            aria-label={`Delete feedback from ${entry.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </button>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                          {entry.comment}
                        </p>
                        <p className="mt-1.5 text-xs font-semibold text-ink-400">
                          {new Date(entry.date).toLocaleDateString('en-IN', {
                            dateStyle: 'medium',
                          })}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
