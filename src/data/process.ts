export interface ProcessStep {
  number: string
  title: string
  description: string
  image: string
  icon?: string
}

export const PROCESS_DATA: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'We start with a thorough conversation about your occasion, guest experience, venue preferences, and creative vision.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
    icon: '✨',
  },
  {
    number: '02',
    title: 'Concept & Planning',
    description:
      'We shape a cohesive concept, draft master timelines, and outline vendor logistics tailored precisely around your date.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
    icon: '💎',
  },
  {
    number: '03',
    title: 'Design & Coordination',
    description:
      'Décor palettes, staging, florals, and lighting are finalized alongside vendor and venue coordination to build one seamless plan.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    icon: '🥂',
  },
  {
    number: '04',
    title: 'Event Day Execution',
    description:
      'Our team manages on-site setup, timing, live guest flow, and breakdown so you can be fully present as a host and guest.',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
    icon: '🎉',
  },
]

export const PROCESS_STEPS = PROCESS_DATA
