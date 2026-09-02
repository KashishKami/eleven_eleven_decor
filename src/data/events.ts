export interface FAQItem {
  question: string
  answer: string
}

export interface EventCategory {
  slug: string
  title: string
  subtitle: string
  description: string
  heroImage: string
  heroImagePosition?: string
  intro: string
  editorialStory?: string[]
  planningServices: string[]
  decorationOptions: string[]
  eventManagement: string[]
  whatWeHandle: string[]
  processSteps: { title: string; description: string }[]
  whyChooseUs: string[]
  faqs: FAQItem[]
  metaTitle: string
  metaDescription: string
}

const COMMON_PROCESS_STEPS = [
  {
    title: '01 Consultation',
    description: 'We begin with a conversation about your occasion, priorities, guest count, and the feeling you want to create.',
  },
  {
    title: '02 Concept & Planning',
    description: 'We draft the concept, schedule, and vendor requirements so every logistical detail is defined early.',
  },
  {
    title: '03 Design & Coordination',
    description: 'Décor plans, staging, florals, and vendor timelines are aligned into one unified master plan.',
  },
  {
    title: '04 Event Day Execution',
    description: 'Our on-site team manages setup, cueing, and live coordination so you are free to enjoy your celebration.',
  },
]

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    slug: 'wedding-events',
    title: 'Wedding Event Planning & Management',
    subtitle: 'End-to-end wedding planning and décor across every ceremony',
    description:
      'End-to-end wedding planning and décor — mandap, stage, venue styling, and coordination across every ceremony.',
    heroImage: '/images/events/wedding-events.png',
    heroImagePosition: 'center center',
    intro:
      'A wedding is several events inside one celebration. 11:11 Decor plans and manages every function — from the first consultation through to the final send-off — so timing, vendors, and décor stay connected across the whole event.',
    editorialStory: [
      "A wedding celebration encompasses countless decisions across multiple ceremonies. 11:11 Decor connects design and logistics from the start—crafting personalized mandaps, royal stages, and cohesive floral styling that reflect your heritage and aesthetic rather than a generic catalogue look.",
      "We align vendor arrivals, ceremony timelines, lighting moods, and smooth room transitions behind the scenes. With our on-site management team supervising every moment, you and your families can celebrate freely, knowing every logistical detail is handled with calm expertise."
    ],
    planningServices: [
      'Function-by-function timeline planning',
      'Vendor sourcing and contract alignment',
      'Budget guidance across the full wedding',
    ],
    decorationOptions: [
      'Mandap & royal stage design',
      'Entrance & pathway styling',
      'Table & seating floral décor',
      'Consistent styling across all ceremonies (full details on our [Wedding Decoration](/services/wedding-decoration/) service page)',
    ],
    eventManagement: [
      'On-ground coordination across every function',
      'Vendor and venue liaison on the day',
      'Ceremony timeline & guest flow management',
    ],
    whatWeHandle: [
      'Guest flow management',
      'Vendor scheduling and arrivals',
      'Ceremony timing and cueing',
      'On-site troubleshooting',
    ],
    processSteps: COMMON_PROCESS_STEPS,
    whyChooseUs: [
      'One team plans and manages every function, rather than each ceremony being handled in isolation.',
    ],
    faqs: [
      {
        question: 'Do you manage multi-day weddings?',
        answer: 'Yes, we coordinate multi-day weddings across all ceremonies.',
      },
      {
        question: 'Can we book décor only, without planning?',
        answer: 'Yes — see our Wedding Decoration service page for décor-only bookings.',
      },
    ],
    metaTitle: 'Wedding Event Planning & Management | 11:11 Decor',
    metaDescription:
      'End-to-end wedding planning and décor — mandap, stage, venue styling, and coordination across every ceremony with 11:11 Decor.',
  },
  {
    slug: 'corporate-events',
    title: 'Corporate Event Planning',
    subtitle: 'Product launches, conferences, and company celebrations',
    description:
      'Product launches, conferences, and company celebrations planned and staged with a professional finish.',
    heroImage: '/images/events/corporate-events.png',
    intro:
      'Launches, conferences, and company celebrations each need a different kind of planning. 11:11 Decor plans corporate events around your objective — brand visibility, hospitality, or internal culture — not a one-size format.',
    editorialStory: [
      "Every corporate gathering represents the organization hosting it, from branding consistency to operational flow. Whether executing product launches, executive summits, conferences, or annual company galas, 11:11 Decor aligns professional stage design, clear presentation acoustics, and comfortable seating with your core business objectives.",
      "We manage tight schedules, guest registration flow, AV cues, and vendor coordination with strict punctuality. By eliminating backstage friction, we allow internal teams to engage with stakeholders and clients while we ensure the occasion runs on schedule."
    ],
    planningServices: [
      'Objective-led concept planning',
      'Venue sourcing and layout support',
      'Vendor and AV coordination',
    ],
    decorationOptions: [
      'Branded staging & backdrop design',
      'Entrance and registration styling',
      'Full styling coordination (details on [Corporate Event Management](/services/corporate-event-management/) & [Stage Decoration](/services/stage-decoration/))',
    ],
    eventManagement: [
      'Run-of-show management and on-site coordination for the full event',
      'AV, sound, and lighting cue direction',
    ],
    whatWeHandle: [
      'Vendor logistics and schedule management',
      'Guest registration flow',
      'Run-of-show timing',
      'AV/production coordination',
    ],
    processSteps: COMMON_PROCESS_STEPS,
    whyChooseUs: [
      'A dedicated coordination team keeps schedules on track under time-sensitive corporate conditions.',
    ],
    faqs: [
      {
        question: 'Can you manage multi-day conferences?',
        answer: 'Yes, we manage multi-day corporate conferences and summit schedules.',
      },
      {
        question: 'Do you handle brand-specific staging?',
        answer: 'Yes, all staging is coordinated according to your brand guidelines.',
      },
    ],
    metaTitle: 'Corporate Event Planning | 11:11 Decor',
    metaDescription:
      'Product launches, conferences, and company celebrations planned and staged with a professional finish by 11:11 Decor.',
  },
  {
    slug: 'birthday-events',
    title: 'Birthday Event Planning',
    subtitle: 'Milestone birthdays and intimate parties',
    description:
      'Milestone birthdays and intimate parties, themed and decorated to match the celebration in mind.',
    heroImage: '/images/events/birthday-event.png',
    heroImagePosition: 'center bottom',
    intro:
      'From a first birthday to a milestone celebration, 11:11 Decor plans and decorates birthday events sized and styled to the occasion.',
    editorialStory: [
      "Birthday celebrations are inherently personal and free from rigid formulas. 11:11 Decor designs birthday events around the guest of honor—crafting themed photo backdrops, organic balloon installations, elegant dining tablescapes, and personalized lighting tailored to milestone celebrations, children’s themed parties, or intimate family dinners.",
      "We organize cake reveal moments, entry surprises, and entertainment logistics with punctual timing. Our on-site team oversees setup and breakdown completely, letting hosts relax and celebrate without having to coordinate vendors or monitor arrangements on the day."
    ],
    planningServices: [
      'Theme development and styling concept',
      'Venue and vendor coordination',
      'Guest list logistics support',
    ],
    decorationOptions: [
      'Themed backdrops and photo areas',
      'Balloon and floral styling',
      'Table and seating décor (see our [Event Decoration](/services/event-decoration/) service for décor-only options)',
    ],
    eventManagement: [
      'Setup, timing, and on-site coordination for the celebration',
      'Activity and entertainment flow management',
    ],
    whatWeHandle: [
      'Vendor scheduling and deliveries',
      'Entertainment coordination',
      'Setup and breakdown',
    ],
    processSteps: COMMON_PROCESS_STEPS,
    whyChooseUs: [
      "Décor and planning are matched to the celebration's scale, from an intimate family gathering to a large milestone party.",
    ],
    faqs: [
      {
        question: 'Do you plan themed birthdays?',
        answer: 'Yes, built entirely around your chosen theme.',
      },
      {
        question: 'Can this be décor-only?',
        answer: 'Yes, see our Event Decoration service page.',
      },
    ],
    metaTitle: 'Birthday Event Planning | 11:11 Decor',
    metaDescription:
      'Milestone birthdays and intimate parties, themed and decorated to match the celebration in mind with 11:11 Decor.',
  },
  {
    slug: 'engagement-events',
    title: 'Engagement Event Planning & Decoration',
    subtitle: 'Ring ceremonies and engagement functions',
    description:
      'Ring ceremonies and engagement functions styled with décor that photographs as beautifully as it feels.',
    heroImage: '/events/engagements-new.jpeg',
    intro:
      'An engagement sets the tone for everything that follows. 11:11 Decor plans and decorates ring ceremonies and engagement functions with décor that photographs as well as it feels in person.',
    editorialStory: [
      "An engagement bridges family traditions and the couple’s personal aesthetic. 11:11 Decor focuses on the celebration's most cherished focal points—curating romantic ring ceremony platforms, personalized couple backdrops, ambient lighting, and floral styling that photographs beautifully while creating a warm, celebratory atmosphere.",
      "We coordinate the entry sequence, family seating, and ceremony timing to keep proceedings relaxed and unhurried. By managing vendor logistics and photography-ready staging in advance, we ensure both families can focus on celebrating the upcoming wedding journey together."
    ],
    planningServices: [
      'Timeline and vendor planning for the ceremony and related functions',
      'Vendor coordination and guest layout',
    ],
    decorationOptions: [
      'Stage and backdrop styling',
      'Floral arrangements and centerpieces',
      'Seating and entrance décor (details on [Floral Decoration](/services/floral-decoration/) & [Stage Decoration](/services/stage-decoration/))',
    ],
    eventManagement: [
      'On-site coordination for setup, timing, and vendor management',
      'Ring ceremony timing & photography coordination',
    ],
    whatWeHandle: [
      'Ceremony flow and timing',
      'Photography-friendly staging',
      'Vendor scheduling',
    ],
    processSteps: COMMON_PROCESS_STEPS,
    whyChooseUs: [
      'Décor is designed with photography and guest experience in mind from the start.',
    ],
    faqs: [
      {
        question: 'Can this lead into full wedding planning later?',
        answer: 'Yes, many clients continue with us into their wedding celebrations.',
      },
      {
        question: 'Do you decorate outdoor engagement venues?',
        answer: 'Yes, we design for both indoor and outdoor spaces.',
      },
    ],
    metaTitle: 'Engagement Event Planning & Decoration | 11:11 Decor',
    metaDescription:
      'Ring ceremonies and engagement functions styled with décor that photographs as beautifully as it feels with 11:11 Decor.',
  },
  {
    slug: 'private-events',
    title: 'Private Event Planning',
    subtitle: 'Anniversaries, family functions, and personal celebrations',
    description:
      'Anniversaries, family functions, and personal celebrations planned with the same attention as our largest events.',
    heroImage: '/images/events/private-events.jpg',
    intro:
      'Anniversaries, family functions, and personal milestones get the same level of planning and décor as our largest events. 11:11 Decor scales its process to fit intimate, private celebrations.',
    editorialStory: [
      "Private milestones and family anniversaries call for warmth, comfort, and refined restraint rather than overwhelming commercial setups. 11:11 Decor scales its design and planning discipline to intimate settings—enhancing living rooms, private villas, and dining tables with soft ambient lighting and tailored floral accents.",
      "With smaller guest counts, every subtle touch—from place settings to personalized playlists—is deeply felt. Our team manages vendor deliveries and discreet setup behind the scenes, allowing you to host an effortless, beautifully appointed evening with your closest loved ones."
    ],
    planningServices: [
      'Concept planning and design',
      'Vendor coordination',
      'Timeline support sized to smaller guest counts',
    ],
    decorationOptions: [
      'Table, seating, and space styling tailored to the occasion',
      'Ambient lighting and centerpiece accents (details on [Venue Decoration](/services/venue-decoration/))',
    ],
    eventManagement: [
      'Setup and on-site coordination for the day',
      'Dedicated single point of contact on-site',
    ],
    whatWeHandle: [
      'Vendor scheduling and arrivals',
      'Layout and guest flow',
      'Event-day logistics',
    ],
    processSteps: COMMON_PROCESS_STEPS,
    whyChooseUs: [
      'Smaller events receive the same planning discipline as large ones, without unnecessary scale or cost.',
    ],
    faqs: [
      {
        question: 'Is there a minimum guest count?',
        answer: 'No — private events of any size are welcome.',
      },
      {
        question: 'Can décor-only be booked for a private event?',
        answer: 'Yes, décor can be booked as a standalone service.',
      },
    ],
    metaTitle: 'Private Event Planning | 11:11 Decor',
    metaDescription:
      'Anniversaries, family functions, and personal celebrations planned with the same attention as our largest events by 11:11 Decor.',
  },
  {
    slug: 'destination-events',
    title: 'Destination Event Planning',
    subtitle: 'Planning and décor coordination away from home',
    description:
      'Planning and décor coordination for events held away from home, with logistics handled end to end.',
    heroImage: '/events/destinations-card.jpg',
    intro:
      "Events held away from home add a layer of logistics most planners don't handle daily. 11:11 Decor plans and coordinates destination events end to end, including travel-dependent vendor and décor logistics.",
    editorialStory: [
      "Moving a celebration to a mountain resort, heritage palace, or coastal retreat turns an event into an unforgettable multi-day journey. 11:11 Decor designs destination styling that embraces its surroundings—using natural landscapes and architectural character to enrich every function from arrival welcomes to the final reception.",
      "Handling events away from home requires rigorous logistics. We manage long-distance supplier transport, local vendor coordination, guest hospitality schedules, and contingency planning, ensuring every function runs smoothly while you and your guests enjoy the destination experience."
    ],
    planningServices: [
      'Destination-specific vendor sourcing',
      'Travel and logistics coordination',
      'Multi-day timeline planning',
    ],
    decorationOptions: [
      'Décor designed around the destination venue',
      'Transported or locally sourced elements',
      'Complete staging & production (details on [Event Management](/services/event-management/))',
    ],
    eventManagement: [
      'On-site coordination for the full duration of the event',
      'Setup and travel logistics management',
      'Multi-day schedule supervision',
    ],
    whatWeHandle: [
      'Vendor travel coordination',
      'Local sourcing where useful',
      'Multi-day scheduling',
      'On-site troubleshooting away from home base',
    ],
    processSteps: COMMON_PROCESS_STEPS,
    whyChooseUs: [
      "Logistics for a destination event are planned as carefully as the décor itself, so nothing is left to chance once you've left home.",
    ],
    faqs: [
      {
        question: 'Which destinations do you cover?',
        answer: "Reach out with your location and we'll confirm coverage.",
      },
      {
        question: 'Do you handle guest travel coordination?',
        answer: 'We can coordinate with your chosen travel partners.',
      },
    ],
    metaTitle: 'Destination Event Planning | 11:11 Decor',
    metaDescription:
      'Planning and décor coordination for events held away from home, with logistics handled end to end with 11:11 Decor.',
  },
]

export const EVENTS_PAGE_FAQS: FAQItem[] = [
  {
    question: 'What types of events does 11:11 Decor manage?',
    answer:
      'Weddings, corporate events, birthdays, engagements, private functions, and destination events.',
  },
  {
    question: 'Do you provide complete event planning?',
    answer: 'Yes — concept, vendors, timeline, décor, and on-site coordination.',
  },
  {
    question: 'Do you provide event decoration separately?',
    answer: 'Yes, décor can be booked on its own.',
  },
  {
    question: 'Can I customize an event package?',
    answer: 'Every package is a starting point and adjusted to your event and budget.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'As early as possible, especially for weddings and peak-season dates.',
  },
  {
    question: 'Do you manage corporate events?',
    answer: 'Yes, including launches, conferences, and company celebrations.',
  },
  {
    question: 'Do you work outside [CITY]?',
    answer: 'Yes, including destination events — confirm coverage on inquiry.',
  },
  {
    question: 'How do I request a quote?',
    answer: 'Contact form or WhatsApp with event type, date, and guest count.',
  },
]
