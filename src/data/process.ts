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
    image: '/images/process/consultation.png',
    icon: '✨',
  },
  {
    number: '02',
    title: 'Concept & Planning',
    description:
      'We shape a cohesive concept, draft master timelines, and outline vendor logistics tailored precisely around your date.',
    image: '/images/process/planning.png',
    icon: '💎',
  },
  {
    number: '03',
    title: 'Design & Coordination',
    description:
      'Décor palettes, staging, florals, and lighting are finalized alongside vendor and venue coordination to build one seamless plan.',
    image: '/images/process/design.png',
    icon: '🥂',
  },
  {
    number: '04',
    title: 'Event Day Execution',
    description:
      'Our team manages on-site setup, timing, live guest flow, and breakdown so you can be fully present as a host and guest.',
    image: '/images/process/execution.jpg',
    icon: '🎉',
  },
]

export const PROCESS_STEPS = PROCESS_DATA
