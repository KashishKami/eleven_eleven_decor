export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

export const TEAM_DATA: TeamMember[] = [
  {
    id: '1',
    name: 'Elena Rostova',
    role: 'Founder & Chief Event Architect',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    bio: '20+ years designing luxury galas and high-profile celebrity weddings worldwide.',
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Executive Culinary Director',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    bio: 'Michelin-trained chef specializing in bespoke dining & multi-sensory gastronomy.',
  },
  {
    id: '3',
    name: 'Sophia Laurent',
    role: 'Head Floral & Spatial Designer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    bio: 'Master of architectural floral installations and immersive lighting design.',
  },
  {
    id: '4',
    name: 'Julian Sterling',
    role: 'Director of Guest Operations',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    bio: 'Ensuring white-glove service standards and flawless execution across all events.',
  },
]
