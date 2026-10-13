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

export const TOOTH_IMAGE: WebImage = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Basic_anatomy_tooth.jpg/1280px-Basic_anatomy_tooth.jpg',
  alt: 'Anatomical illustration of a human molar showing crown and roots',
  credit: 'Basic anatomy tooth by Time3000 & Ian Furst, CC BY-SA 3.0',
}

export const TEETH_TYPES_IMAGE: WebImage = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/3D_Medical_Animation_Still_Showing_Types_of_Teeth.jpg/1280px-3D_Medical_Animation_Still_Showing_Types_of_Teeth.jpg',
  alt: '3D illustration showing the types of human teeth — incisors, canines, premolars and molars',
  credit: '3D Medical Animation Still Showing Types of Teeth by Scientific Animations, CC BY-SA 4.0',
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
