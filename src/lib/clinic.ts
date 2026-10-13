import {
  Baby,
  Crown,
  ShieldCheck,
  Smile,
  Sparkles,
  Screw,
  Target,
  Toothbrush,
  type LucideIcon,
} from 'lucide-react'

export const CLINIC = {
  name: 'Global Dental Hospital',
  address: 'Raj Mohammed Complex, Vivek Nagar Road, Nanded, Maharashtra 431605',
  phone: '+91 90969 68440',
  phoneHref: 'tel:+919096968440',
  whatsapp: 'https://wa.me/919096968440',
  rating: 4.3,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Global+Dental+Hospital+Nanded+Maharashtra',
  mapsEmbed:
    'https://www.google.com/maps?q=Raj+Mohammed+Complex,+Vivek+Nagar+Road,+Nanded,+Maharashtra+431605&output=embed',
  googleReviews: 'https://www.google.com/maps/search/Global+Dental+Hospital+Nanded+Maharashtra',
} as const

export interface WebImage {
  src: string
  alt: string
  credit: string
}

export const HERO_IMAGE: WebImage = {
  src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  alt: 'Dentist gently examining a patient’s teeth in a modern dental clinic',
  credit: 'Photo via Unsplash',
}

export const CLINIC_IMAGE: WebImage = {
  src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
  alt: 'Dental professional performing a routine check-up in a bright clinic',
  credit: 'Photo via Unsplash',
}

export const BANNER_IMAGE: WebImage = {
  src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80',
  alt: 'Modern dental clinic interior with a comfortable treatment chair',
  credit: 'Photo via Unsplash',
}

export interface Treatment {
  icon: LucideIcon
  title: string
  description: string
}

export const TREATMENTS: Treatment[] = [
  {
    icon: Toothbrush,
    title: 'General Dentistry',
    description: 'Routine check-ups, fillings, and preventive care for the whole family.',
  },
  {
    icon: Target,
    title: 'Root Canal Treatment',
    description: 'Gentle treatment to save damaged teeth and relieve pain.',
  },
  {
    icon: Crown,
    title: 'Crowns & Bridges',
    description: 'Custom restorations that rebuild strength and appearance.',
  },
  {
    icon: Screw,
    title: 'Dental Implants',
    description: 'Sturdy, natural-looking replacements for missing teeth.',
  },
  {
    icon: Smile,
    title: 'Orthodontics',
    description: 'Braces and alignment care for straighter, healthier smiles.',
  },
  {
    icon: Sparkles,
    title: 'Teeth Whitening',
    description: 'Professional whitening for a brighter, confident smile.',
  },
  {
    icon: Baby,
    title: 'Pediatric Dentistry',
    description: 'Patient, friendly care designed around children.',
  },
  {
    icon: ShieldCheck,
    title: 'Gum Care',
    description: 'Gum health treatments to protect your smile long term.',
  },
]
