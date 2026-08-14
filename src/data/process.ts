export interface ProcessStep {
  number: string
  title: string
  description: string
  icon: string
}

export const PROCESS_DATA: ProcessStep[] = [
  {
    number: '01',
    title: 'Tell us about your event',
    description: 'Share your vision, preferred aesthetics, guest count, and date during your initial consultation.',
    icon: '✨',
  },
  {
    number: '02',
    title: 'Put your trust in our team',
    description: 'Our lead designers draft complete 3D spatial renders, custom floral concepts, and menu pairings.',
    icon: '💎',
  },
  {
    number: '03',
    title: 'Creating unforgettable moments',
    description: 'Our execution specialists transform your venue with surgical precision on event day.',
    icon: '🥂',
  },
  {
    number: '04',
    title: 'Celebrate & create memories',
    description: 'Immerse yourself in flawless hospitality while our team manages every detail smoothly.',
    icon: '🎉',
  },
]

export const PROCESS_STEPS = PROCESS_DATA
