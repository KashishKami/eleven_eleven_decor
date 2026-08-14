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
    title: 'TELL US ABOUT YOUR EVENT',
    description: 'We take pride in audience matching menus, custom-designed to connect with your guests.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    icon: '✨',
  },
  {
    number: '02',
    title: 'CHOOSE YOUR PACKAGE',
    description: 'We take pride in audience matching menus, custom-designed to connect with your guests.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    icon: '💎',
  },
  {
    number: '03',
    title: 'MEET YOUR COORDINATOR',
    description: 'We take pride in audience matching menus, custom-designed to connect with your guests.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    icon: '🥂',
  },
  {
    number: '04',
    title: 'WALK THROUGH AND POLISH DETAILS',
    description: 'We take pride in audience matching menus, custom-designed to connect with your guests.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    icon: '🎉',
  },
]

export const PROCESS_STEPS = PROCESS_DATA
