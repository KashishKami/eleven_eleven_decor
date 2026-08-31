export interface ServiceItem {
  slug: string
  title: string
  shortDescription: string
  heroH1: string
  intro: string
  whatWeProvide: string[]
  whyChooseUs: string
  whatYouCanExpect: string
  relatedServices: { title: string; slug: string }[]
  faqs: { question: string; answer: string }[]
  ctaText: string
  image: string
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: 'event-management',
    title: 'Event Management',
    shortDescription: 'Full logistics and on-the-ground coordination so every element runs on schedule.',
    heroH1: 'Event Management Services',
    intro: 'Once the planning is done, event management is what makes the day actually run — vendors arriving on time, setup finishing on schedule, and every moving part coordinated in real time. 11:11 Decor manages events end to end, so nothing is left for you to chase on the day itself.',
    whatWeProvide: [
      'On-site coordination',
      'Vendor and supplier management',
      'Run-of-show timelines',
      'Setup and breakdown supervision',
      'A single point of contact throughout the event'
    ],
    whyChooseUs: "One team manages every vendor relationship, so instructions don't get lost between planner, decorator, and venue.",
    whatYouCanExpect: 'A detailed run-of-show shared before the event, a dedicated coordination team on-site, and a single contact for any last-minute changes.',
    relatedServices: [
      { title: 'Event Planning', slug: 'event-planning' },
      { title: 'Corporate Event Management', slug: 'corporate-event-management' },
      { title: 'Entertainment & Hospitality', slug: 'entertainment-hospitality' }
    ],
    faqs: [
      {
        question: "Do you manage events you didn't plan or decorate?",
        answer: 'Yes, event management can be booked as a standalone service.'
      },
      {
        question: 'How many people are on-site for a typical event?',
        answer: 'Team size scales with guest count and event complexity.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/event-management.jpg'
  },
  {
    slug: 'event-planning',
    title: 'Event Planning',
    shortDescription: 'Concept development, vendor sourcing, and timeline planning from day one.',
    heroH1: 'Event Planning Services',
    intro: "Good events are designed before they're decorated. Event planning covers everything that happens before the first flower is placed — concept, budget guidance, vendor sourcing, and a realistic timeline built around your date.",
    whatWeProvide: [
      'Concept development',
      'Budget planning support',
      'Vendor sourcing and negotiation liaison',
      'Master timeline covering every function'
    ],
    whyChooseUs: "Planning is handled by the same team that later manages décor and execution, so ideas don't get lost in translation between stages.",
    whatYouCanExpect: 'A written concept and timeline you can review and adjust before any vendor is booked.',
    relatedServices: [
      { title: 'Event Management', slug: 'event-management' },
      { title: 'Event Decoration', slug: 'event-decoration' },
      { title: 'Venue Decoration', slug: 'venue-decoration' }
    ],
    faqs: [
      {
        question: 'Can I book planning without décor?',
        answer: 'Yes, event planning can be reserved independently.'
      },
      {
        question: 'How early should I start planning?',
        answer: 'As early as possible for weddings and peak-season events.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/event-planning.jpg'
  },
  {
    slug: 'event-decoration',
    title: 'Event Decoration',
    shortDescription: 'Full décor design and setup — florals, staging, lighting, and styling.',
    heroH1: 'Event Decoration Services',
    intro: 'Décor is where the concept becomes visible — colour, texture, florals, and staging brought together across a venue. 11:11 Decor designs and installs décor for events of every size, either as a standalone service or as part of full event management.',
    whatWeProvide: [
      'Concept-to-installation décor design',
      'Floral and prop styling',
      'Staging and fabric draping',
      'Lighting coordination'
    ],
    whyChooseUs: 'Décor is designed around your actual venue and guest flow, not a fixed catalogue look.',
    whatYouCanExpect: 'A concept mood board and layout plan before installation day.',
    relatedServices: [
      { title: 'Wedding Decoration', slug: 'wedding-decoration' },
      { title: 'Stage Decoration', slug: 'stage-decoration' },
      { title: 'Floral Decoration', slug: 'floral-decoration' }
    ],
    faqs: [
      {
        question: 'Can I book décor only, without planning?',
        answer: 'Yes, décor services can be booked on their own.'
      },
      {
        question: 'Do you decorate outdoor venues?',
        answer: 'Yes, indoor, outdoor, and mixed spaces.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/event-decoration.jpg'
  },
  {
    slug: 'wedding-decoration',
    title: 'Wedding Decoration',
    shortDescription: "Mandap, stage, and venue décor designed around your wedding's palette and theme.",
    heroH1: 'Wedding Decoration',
    intro: 'Wedding décor spans multiple ceremonies, each with its own mood — from an intimate mehndi to a full mandap setup. 11:11 Decor designs décor across every function so the palette and style stay connected from start to finish.',
    whatWeProvide: [
      'Mandap and stage design',
      'Entrance and venue styling',
      'Floral installations',
      'Table and seating décor',
      'Lighting integration'
    ],
    whyChooseUs: 'A single design language is carried across every ceremony, rather than each function being decorated in isolation.',
    whatYouCanExpect: 'A palette and mood board for each ceremony, reviewed with you before installation.',
    relatedServices: [
      { title: 'Floral Decoration', slug: 'floral-decoration' },
      { title: 'Stage Decoration', slug: 'stage-decoration' },
      { title: 'Venue Decoration', slug: 'venue-decoration' }
    ],
    faqs: [
      {
        question: 'Can décor differ across ceremonies?',
        answer: 'Yes, while keeping a connected overall palette.'
      },
      {
        question: 'Do you handle mandap structures?',
        answer: 'Yes, custom mandap design and structural installation.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/wedding-decoration.jpg'
  },
  {
    slug: 'corporate-event-management',
    title: 'Corporate Event Management',
    shortDescription: 'Professional planning and execution for launches, conferences, and company events.',
    heroH1: 'Corporate Event Management',
    intro: 'Corporate events run on tighter timelines and higher expectations. 11:11 Decor plans and manages launches, conferences, and company celebrations with the coordination and polish they need.',
    whatWeProvide: [
      'Venue sourcing support',
      'Staging and branding coordination',
      'Run-of-show management',
      'Vendor and AV coordination'
    ],
    whyChooseUs: 'A dedicated coordination team keeps the schedule on track, which matters most when senior stakeholders or clients are in the room.',
    whatYouCanExpect: 'A detailed run-of-show and single point of contact for the entire event.',
    relatedServices: [
      { title: 'Event Management', slug: 'event-management' },
      { title: 'Lighting & Production', slug: 'lighting-production' },
      { title: 'Entertainment & Hospitality', slug: 'entertainment-hospitality' }
    ],
    faqs: [
      {
        question: 'Do you handle branded staging?',
        answer: 'Yes, coordinated strictly with your brand guidelines.'
      },
      {
        question: 'Can you manage multi-day conferences?',
        answer: 'Yes, multi-day schedules are fully supported.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/corporate-event-management.jpg'
  },
  {
    slug: 'stage-decoration',
    title: 'Stage Decoration',
    shortDescription: "Custom stage design and backdrops built around your event's theme and scale.",
    heroH1: 'Stage Decoration Services',
    intro: 'The stage is where attention naturally gathers. 11:11 Decor designs custom stage backdrops and setups scaled to your venue, theme, and guest count.',
    whatWeProvide: [
      'Custom backdrop design',
      'Floral and fabric staging',
      'Lighting integration',
      'Structural setup'
    ],
    whyChooseUs: 'Stage design is planned alongside the rest of the venue décor, so it reads as one cohesive space, not a separate installation.',
    whatYouCanExpect: 'A design render or mood board before installation.',
    relatedServices: [
      { title: 'Wedding Decoration', slug: 'wedding-decoration' },
      { title: 'Venue Decoration', slug: 'venue-decoration' },
      { title: 'Lighting & Production', slug: 'lighting-production' }
    ],
    faqs: [
      {
        question: 'Can stage design match a specific theme?',
        answer: 'Yes, built entirely around your concept.'
      },
      {
        question: 'Do you provide structural rigging?',
        answer: 'Coordinated with certified vendors as needed.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/stage-decoration.jpg'
  },
  {
    slug: 'venue-decoration',
    title: 'Venue Decoration',
    shortDescription: "Full-venue styling that transforms a space to match your event's concept.",
    heroH1: 'Venue Decoration',
    intro: 'Every venue has a starting layout; venue decoration is how it becomes your event. 11:11 Decor styles full spaces — entrances, seating, lighting, and flow — to match your concept.',
    whatWeProvide: [
      'Full-venue styling',
      'Entrance and pathway décor',
      'Seating layout design',
      'Ambient lighting'
    ],
    whyChooseUs: 'Layout and décor are planned together, so guest flow and visual design work as one plan, not two.',
    whatYouCanExpect: 'A floor plan and styling concept reviewed ahead of installation.',
    relatedServices: [
      { title: 'Event Decoration', slug: 'event-decoration' },
      { title: 'Stage Decoration', slug: 'stage-decoration' },
      { title: 'Floral Decoration', slug: 'floral-decoration' }
    ],
    faqs: [
      {
        question: "Do you work with venues we've already booked?",
        answer: "Yes, that's the most common setup."
      },
      {
        question: 'Can you decorate outdoor venues?',
        answer: 'Yes, we style both indoor and outdoor venues.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/venue-decoration.jpg'
  },
  {
    slug: 'floral-decoration',
    title: 'Floral Decoration',
    shortDescription: 'Fresh and artificial floral design, from mandaps to table centerpieces.',
    heroH1: 'Floral Decoration',
    intro: 'Florals set the tone of a space more than almost any other element. 11:11 Decor designs fresh and artificial floral installations, from mandaps and backdrops to table centerpieces.',
    whatWeProvide: [
      'Mandap and backdrop florals',
      'Table centerpieces',
      'Entrance and pathway arrangements',
      'Bouquets on request'
    ],
    whyChooseUs: "Florals are chosen to match your palette and season, and coordinated with the rest of the venue's décor.",
    whatYouCanExpect: 'A floral palette proposal before installation.',
    relatedServices: [
      { title: 'Wedding Decoration', slug: 'wedding-decoration' },
      { title: 'Stage Decoration', slug: 'stage-decoration' },
      { title: 'Venue Decoration', slug: 'venue-decoration' }
    ],
    faqs: [
      {
        question: 'Fresh or artificial florals?',
        answer: 'Both, depending on budget, season, and venue.'
      },
      {
        question: 'Can florals be reused across ceremonies?',
        answer: 'Often, yes — we plan for it where possible.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/floral-decoration.jpg'
  },
  {
    slug: 'lighting-production',
    title: 'Lighting & Production',
    shortDescription: 'Ambient and event lighting, sound, and production support for every space.',
    heroH1: 'Lighting & Production',
    intro: 'Lighting changes how every other décor element is seen after dark. 11:11 Decor coordinates ambient and event lighting, along with sound and production support, as part of a complete décor plan.',
    whatWeProvide: [
      'Ambient and accent lighting',
      'Stage and backdrop lighting',
      'Sound coordination',
      'Production support for cues and transitions'
    ],
    whyChooseUs: 'Lighting is planned alongside décor from the start, not added as an afterthought once the space is already set.',
    whatYouCanExpect: 'A lighting plan mapped to your venue and evening timeline.',
    relatedServices: [
      { title: 'Stage Decoration', slug: 'stage-decoration' },
      { title: 'Corporate Event Management', slug: 'corporate-event-management' },
      { title: 'Entertainment & Hospitality', slug: 'entertainment-hospitality' }
    ],
    faqs: [
      {
        question: 'Can lighting be booked without full décor?',
        answer: 'Yes, as a standalone service.'
      },
      {
        question: 'Do you handle outdoor lighting logistics?',
        answer: 'Yes, coordinated with venue power and access.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/lighting-production.jpg'
  },
  {
    slug: 'entertainment-hospitality',
    title: 'Entertainment & Hospitality',
    shortDescription: 'Guest experience planning, from entertainment bookings to hospitality coordination.',
    heroH1: 'Entertainment & Hospitality',
    intro: 'What guests experience beyond the décor — entertainment, service, and hospitality — shapes how an event is remembered. 11:11 Decor coordinates these guest-facing elements as part of the wider event plan.',
    whatWeProvide: [
      'Entertainment sourcing and booking liaison',
      'Guest hospitality coordination',
      'On-the-day guest management'
    ],
    whyChooseUs: 'Guest experience is planned alongside décor and timeline, so entertainment and hospitality fit the flow of the day rather than competing with it.',
    whatYouCanExpect: 'A guest-experience plan covering arrival through to departure.',
    relatedServices: [
      { title: 'Event Management', slug: 'event-management' },
      { title: 'Corporate Event Management', slug: 'corporate-event-management' },
      { title: 'Lighting & Production', slug: 'lighting-production' }
    ],
    faqs: [
      {
        question: 'Can you source performers or hosts?',
        answer: 'We coordinate bookings through vetted partners.'
      },
      {
        question: 'Is hospitality staffing included?',
        answer: 'Scoped per event based on guest count.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/entertainment-hospitality.jpg'
  },
  {
    slug: 'birthday-decoration',
    title: 'Birthday Decoration',
    shortDescription: 'Custom themed birthday styling, balloon architecture, stage backdrops, and table settings for all ages.',
    heroH1: 'Birthday Decoration Services',
    intro: "A birthday should reflect the person being celebrated. From milestone birthdays (1st, 18th, 21st, 50th) and intimate adult celebrations to lively themed children's parties, 11:11 Decor creates bespoke styling — custom photo backdrops, balloon art, luxury table styling, and ambient lighting.",
    whatWeProvide: [
      'Custom themed stage and photo backdrops',
      'Organic balloon arches and custom installations',
      'Cake and dessert table styling',
      'Table settings, linens, and floral accents',
      'Personalized neon signage and prop styling'
    ],
    whyChooseUs: 'Every birthday décor concept is built from scratch around your chosen theme and venue, avoiding cookie-cutter party packages.',
    whatYouCanExpect: 'A visual mood board and color palette proposal, complete layout planning, and punctual on-site installation before guests arrive.',
    relatedServices: [
      { title: 'Event Decoration', slug: 'event-decoration' },
      { title: 'Venue Decoration', slug: 'venue-decoration' },
      { title: 'Lighting & Production', slug: 'lighting-production' }
    ],
    faqs: [
      {
        question: 'Can you design custom themes?',
        answer: 'Yes, we create fully personalized themes tailored to your vision and age group.'
      },
      {
        question: 'Do you handle both indoor and outdoor birthday setups?',
        answer: 'Yes, we design for home lawns, banquet halls, private villas, and outdoor venues.'
      }
    ],
    ctaText: 'Get a Quote',
    image: '/images/services/birthday-party-decoration.jpg'
  }
]

export const SERVICES_HUB_FAQS = [
  {
    question: 'What types of events does 11:11 Decor manage?',
    answer: 'Weddings, corporate events, birthdays, engagements, private functions, and destination events.',
  },
  {
    question: 'Do you provide complete event planning?',
    answer: 'Yes — concept, vendors, timeline, décor, and on-site coordination.',
  },
  {
    question: 'Do you provide event decoration separately?',
    answer: 'Yes, décor can be booked on its own without full planning.',
  },
  {
    question: 'Can I customize an event service package?',
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
