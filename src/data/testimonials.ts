export interface Testimonial {
  id: string
  clientName: string
  location: string
  eventType: string
  rating: number
  quote: string
  date: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Aarav & Meera K.',
    location: 'Dehradun Palace Resort',
    eventType: 'Royal Wedding Celebration',
    rating: 5,
    quote:
      'Working with 11:11 Decor turned our wedding into a living fairytale. The mandap design with cascading white orchids left every single guest speechless.',
    date: 'November 2025',
  },
  {
    id: 't-2',
    clientName: 'Vikram S.',
    location: 'JW Marriott Mussoorie',
    eventType: 'Corporate Annual Gala',
    rating: 5,
    quote:
      'Surgical precision in stage management, sound production, and VIP hospitality. 11:11 Decor is the gold standard for luxury corporate galas.',
    date: 'January 2026',
  },
  {
    id: 't-3',
    clientName: 'Priya & Rohan M.',
    location: 'Rishikesh Ganga Retreat',
    eventType: 'Destination Sangeet & Reception',
    rating: 5,
    quote:
      'From guest resort check-in helpdesks to the energetic Sangeet lighting grid, every detail was handled with extraordinary warmth and calm precision.',
    date: 'December 2025',
  },
  {
    id: 't-4',
    clientName: 'Sunita D.',
    location: 'Private Villa Estate',
    eventType: '50th Milestone Soirée',
    rating: 5,
    quote:
      'They completely transformed our private lawn into an intimate candlelit botanical sanctuary. Highly recommended for milestone celebrations!',
    date: 'February 2026',
  },
]
