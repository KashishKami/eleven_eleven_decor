export interface ServiceItem {
  slug: string
  title: string
  shortDescription: string
  heroH1: string
  intro: string
  editorialStory?: string[]
  whatWeProvide: string[]
  whyChooseUs: string
  whatYouCanExpect: string
  relatedServices: { title: string; slug: string }[]
  faqs: { question: string; answer: string }[]
  ctaText: string
  image: string
  imagePosition?: string
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: 'event-management',
    title: 'Event Management',
    shortDescription: 'Full logistics and on-the-ground coordination so every element runs on schedule.',
    heroH1: 'Event Management Services',
    intro: 'Once the planning is done, event management is what makes the day actually run — vendors arriving on time, setup finishing on schedule, and every moving part coordinated in real time. 11:11 Decor manages events end to end, so nothing is left for you to chase on the day itself.',
    editorialStory: [
      "At 11:11 Decor, our event management brings every moving part of your celebration together with clarity and complete coordination. From the earliest discussions, we understand your venue, atmosphere, and guest priorities, aligning vendor timelines, décor logistics, and on-site operations into one unified flow.",
      "Our goal is simple: to make your event feel effortless. We oversee setup, coordinate transitions discreetly, and resolve challenges before they arise, creating structure around the experience so you can be fully present with your guests."
    ],
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
    image: '/images/services/event-management.png'
  },
  {
    slug: 'event-planning',
    title: 'Event Planning',
    shortDescription: 'Concept development, vendor sourcing, and timeline planning from day one.',
    heroH1: 'Event Planning Services',
    intro: "Good events are designed before they're decorated. Event planning covers everything that happens before the first flower is placed — concept, budget guidance, vendor sourcing, and a realistic timeline built around your date.",
    editorialStory: [
      "Planning for the event is not just about picking the right date and venue but it’s about weaving together every detail so the day unfolds what you exactly want. At 11:11 Decor we truly believe that “Your Wish Our creation is more than just a tagline.",
      "Our event planning services are designed to take the stress off your shoulders and replacing it with excitement. Our team make sure the planning should feel more like a fun part rather than a frustrated job. So, whether you are organising a small family meet, product launch or celebrating a milestone achieved, we got your back."
    ],
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
    editorialStory: [
      "Light, colour, design – the magic of the moment when it is combined in a beautiful way to transform an ordinary room into an extraordinary experience. Event decoration is not something that we just do, it's an art form, and something that we have honed over many years of dedication, creativity and a strong sense of vision with the ability to see our clients vision through to fruition.",
      "We design every balloon arch, floral arrangement and lighting to reflect the theme of \"Your Wish Our Creation\". We provide event decoration for many events, such as baby showers, religious events, wedding, anniversaries, baby, graduation, retirement and so much more, making your moments immensely magical."
    ],
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
    image: '/images/services/event-decoration.png'
  },
  {
    slug: 'wedding-decoration',
    title: 'Wedding Decoration',
    shortDescription: "Mandap, stage, and venue décor designed around your wedding's palette and theme.",
    heroH1: 'Wedding Decoration',
    intro: 'Wedding décor spans multiple ceremonies, each with its own mood — from an intimate mehndi to a full mandap setup. 11:11 Decor designs décor across every function so the palette and style stay connected from start to finish.',
    editorialStory: [
      "Wedding décor should reflect your story across every meaningful ceremony. 11:11 Decor designs cohesive visual environments—from elegant mandaps and royal stages to welcoming entrances, dining tablescapes, and photo corners—balancing traditional grandeur with contemporary sophistication and seamless functionality.",
      "For multi-function celebrations, we create distinct personalities for Haldi, Mehendi, Sangeet, and Reception while preserving an overarching aesthetic harmony. Our on-site styling team inspects every bloom and fabric drape beforehand, ensuring your setting looks breathtaking in person and on film."
    ],
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
    image: '/images/services/wedding-decoration.jpg',
    imagePosition: 'center center',
  },
  {
    slug: 'corporate-event-management',
    title: 'Corporate Event Management',
    shortDescription: 'Professional planning and execution for launches, conferences, and company events.',
    heroH1: 'Corporate Event Management',
    intro: 'Corporate events run on tighter timelines and higher expectations. 11:11 Decor plans and manages launches, conferences, and company celebrations with the coordination and polish they need.',
    editorialStory: [
      "At 11:11 Decor, we design and execute corporate event decor that is both eye-catching and effective, making you leave the last impression and reflection of your brand. Our professionals are highly creative when it comes to creating setups for product launches, conferences, award shows, office inaugurations, anniversaries, networks, and corporate parties.",
      "Our services include branded backdrops, stage décor, lighting, signage, entrance displays, table arrangements and customized themes. Collaborate effortlessly with the technical team, venue managers and event professionals to ensure smooth, timely and efficient execution. From intimate gathering for the executive to a lavish corporate event, we have the perfect decor for every event and a vision to create your wish into reality."
    ],
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
    image: '/images/services/corporate-event-management.png'
  },
  {
    slug: 'stage-decoration',
    title: 'Stage Decoration',
    shortDescription: "Custom stage design and backdrops built around your event's theme and scale.",
    heroH1: 'Stage Decoration Services',
    intro: 'The stage is where attention naturally gathers. 11:11 Decor designs custom stage backdrops and setups scaled to your venue, theme, and guest count.',
    editorialStory: [
      "The stage is the centre of attraction of all the events. At 11:11 decor we set stage backdrop for speeches, ceremonies, performances and photographs. We design stage sets that compliments on all your event themes, style and venue.",
      "From elegant flower arrangements to stylish fabrics, balloons, lighting and personalized backdrops, we belief to craft every detail thoughtfully. Focusing on the stage dimension, audience visibility and lighting our team ensures the setup looks stunning from every angle that is picture ready."
    ],
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
    image: '/images/services/stage_decor.png'
  },
  {
    slug: 'venue-decoration',
    title: 'Venue Decoration',
    shortDescription: "Full-venue styling that transforms a space to match your event's concept.",
    heroH1: 'Venue Decoration',
    intro: 'Every venue has a starting layout; venue decoration is how it becomes your event. 11:11 Decor styles full spaces — entrances, seating, lighting, and flow — to match your concept.',
    editorialStory: [
      "A beautiful venue is all that you require to set the vibe of an event, therefore a perfect decoration can help you create a thoughtful impression on the audiences. At 11:11 Decor we transform ordinary spaces into beautiful entrance, lounges, ceremony areas and dinning spaces.",
      "Staying on to our tagline Your Wish Our Creation, we stay persistent towards warm hospitality, decoration, lightning and all your needs so that you can cherish each moment to the fullest. Standing as one of the best event planners in Dehradun we specialise in curating unforgettable experiences that remains with you throughout your life."
    ],
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
    image: '/images/services/venue.png'
  },
  {
    slug: 'floral-decoration',
    title: 'Floral Decoration',
    shortDescription: 'Fresh and artificial floral design, from mandaps to table centerpieces.',
    heroH1: 'Floral Decoration',
    intro: 'Florals set the tone of a space more than almost any other element. 11:11 Decor designs fresh and artificial floral installations, from mandaps and backdrops to table centerpieces.',
    editorialStory: [
      "Flowers have a power to instantly shape your mood. From colour, texture and natural elegance to instantly transforming the emotional atmosphere of an event. At 11:11 Decor, we excel in customizing floral arrangements for majestic mandaps, grand entrance, floral walls, hanging foliage to everything that aligns your theme, season, venue and celebration.",
      "We carefully consider installation timing, flower longevity and venue atmosphere so that arrangement remains fresh throughout. Whether you prefer traditional floral styling or botanical styling 11:11 Decor make sure every place blooms with special care and visual harmony so that you walk in with confidence."
    ],
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
    image: '/images/services/floral-2.png'
  },
  {
    slug: 'lighting-production',
    title: 'Lighting & Production',
    shortDescription: 'Ambient and event lighting, sound, and production support for every space.',
    heroH1: 'Lighting & Production',
    intro: 'Lighting changes how every other décor element is seen after dark. 11:11 Decor coordinates ambient and event lighting, along with sound and production support, as part of a complete décor plan.',
    editorialStory: [
      "Lighting is essential in forming the atmosphere and making your event decor come alive. We help to enhance decor, architecture and ambience with creative lighting solutions at 11:11 Decor, using professional production techniques. Everything from ambient lighting, architecture washes, through to stage lighting, sound systems and visual effects – everything is planned around for your event.",
      "Whether it's a formal dinner, an office party, or a lively celebration, our technical team ensures seamless transitions between each event making you feel energetic after every effect. Along with careful equipment testing and precise coordination, we create visually stunning experiences while ensuring hassle free event production."
    ],
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
    image: '/images/services/lighting-copy.jpg',
    imagePosition: 'center center',
  },
  {
    slug: 'entertainment-hospitality',
    title: 'Entertainment & Hospitality',
    shortDescription: 'Guest experience planning, from entertainment bookings to hospitality coordination.',
    heroH1: 'Entertainment & Hospitality',
    intro: 'What guests experience beyond the décor — entertainment, service, and hospitality — shapes how an event is remembered. 11:11 Decor coordinates these guest-facing elements as part of the wider event plan.',
    editorialStory: [
      "While decor create the overall impression of the venue: entertainment and hospitality defines how your guests feels throughout the event. At 11:11 Decor we prioritize to make each guest feel comfortable and special. From professional performers to live music, DJs hosts and fun entertainment we arrange everything to match your requirements.",
      "Performances are planned to complement each ceremony flow, dinner services keeping in mind your event seems more natural rather than being disruptive. Our teams of dedicated professionals are dedicated to show extra care and affection to all the VIPs and guest so that they feel truly cherished throughout the event."
    ],
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
    image: '/images/services/entertainment-hospitality.png'
  },
  {
    slug: 'birthday-decoration',
    title: 'Birthday Decoration',
    shortDescription: 'Custom themed birthday styling, balloon architecture, stage backdrops, and table settings for all ages.',
    heroH1: 'Birthday Decoration Services',
    intro: "A birthday should reflect the person being celebrated. From milestone birthdays (1st, 18th, 21st, 50th) and intimate adult celebrations to lively themed children's parties, 11:11 Decor creates bespoke styling — custom photo backdrops, balloon art, luxury table styling, and ambient lighting.",
    editorialStory: [
      "Imagine celebrating your birthday exactly the way you want to — with perfect happiness and moment that feels truly a bliss. Whether it’s a grand celebration with your family, friends and your loved ones or a small intimate gathering, a beautiful decor can make your special day feel more memorable.",
      "At 11:11 Decor we specialise in creating beautiful and magical moments with beautiful theme based decorations for all the age groups. Our services include customized backdrops, personalised banners, cake table decor, ambient lights, floral arrangements and themed props. With attention to every detail we make sure to deliver a picture-perfect decor that suits your imagination before your guests arrives."
    ],
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
    image: '/images/services/birthday-event.png',
    imagePosition: 'center bottom'
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
