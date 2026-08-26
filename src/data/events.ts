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
  intro: string
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

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    slug: 'wedding-events',
    title: 'Wedding Event Planning & Management',
    subtitle: 'Royal Mandaps, Seamless Run-of-Show & Full Celebration Design',
    description:
      'Comprehensive wedding planning, design, and management services across pre-wedding rituals, grand reception evenings, and multi-day festivities.',
    heroImage: '/events/weddings-hero.jpg',
    intro:
      'At 11:11 Decor, we craft bespoke wedding experiences where timeless elegance meets surgical operational execution. From intricate mandap floral installations to multi-venue guest management, our team oversees every single detail so you can savor your dream day.',
    planningServices: [
      'Multi-Day Master Itinerary & Timeline Architecture',
      'Vendor Sourcing, Contract Negotiation & On-Site Alignment',
      'Custom Theme Conceptualization & Moodboard Curation',
      'Budget Structuring & Allocation Optimization',
      'Guest RSVPs, Seating Layouts & Welcome Logistics',
    ],
    decorationOptions: [
      'Signature Mandap Architecture & Overhead Floral Canopies',
      'Grand Entrance Arches & Walkway Light Passages',
      'Stage Backdrops, Sangeet Light Scapes & Table Centerpieces',
      'Themed Haldi & Mehendi Color Palette Styling',
    ],
    eventManagement: [
      'Dedicated On-Site Event Director & Run-of-Show Stage Manager',
      'Artist, DJ & Choreographer Soundcheck Coordination',
      'Bridal Entry Timing & Special Effects Alignment',
      'Hospitality Desk & VIP Escort Services',
    ],
    whatWeHandle: [
      'Pre-wedding site inspections & spatial layout drafting',
      'Vendor load-in schedules and venue clearance compliance',
      'Live timeline adjustments for ceremony muhurat timings',
      'Post-event breakdown, asset teardown, and venue handover',
    ],
    processSteps: [
      {
        title: 'Initial Vision & Discovery',
        description: 'We explore your love story, preferred aesthetics, guest count, and budget preferences.',
      },
      {
        title: 'Design & Spatial Plan',
        description: '3D spatial layouts, color palettes, and vendor production timelines are crafted for approval.',
      },
      {
        title: 'Production & Vendor Coordination',
        description: 'Custom fabrication, floral orders, and vendor run-of-show synchronization.',
      },
      {
        title: 'Flawless Execution',
        description: 'Our on-site crew manages every ritual, performance, and guest touchpoint seamlessly.',
      },
    ],
    whyChooseUs: [
      '10+ years executing luxury weddings across India and destination venues',
      'In-house floral designers and master stage architects',
      'Zero-stress, single point of contact throughout the planning journey',
      'Transparent budgeting with clear itemized line items',
    ],
    faqs: [
      {
        question: 'How far in advance should we book wedding planning services?',
        answer:
          'We recommend booking 6 to 12 months prior to your wedding date to secure premium venues, top artists, and custom fabrication capacity.',
      },
      {
        question: 'Do you manage destination weddings outside Dehradun?',
        answer:
          'Yes, we specialize in destination wedding planning across Rajasthan, Goa, Uttarakhand, and international venues.',
      },
      {
        question: 'What is the difference between wedding planning and wedding decoration?',
        answer:
          'Wedding decoration focuses on visual aesthetics (flowers, stage, lighting), while wedding planning encompasses full end-to-end logistics, vendor contracts, guest management, and run-of-show timelines.',
      },
    ],
    metaTitle: 'Wedding Event Planning & Management | 11:11 Decor',
    metaDescription:
      'Bespoke wedding event planning, royal mandap design, vendor logistics, and seamless multi-day celebration management by 11:11 Decor.',
  },
  {
    slug: 'corporate-events',
    title: 'Corporate Event Planning & Management',
    subtitle: 'Brand Galas, Award Nights, Product Launches & Executive Summits',
    description:
      'High-impact corporate event production delivering impeccable brand alignment, seamless AV technology, and polished executive hospitality.',
    heroImage: '/events/corporate-hero.jpg',
    intro:
      '11:11 Decor partners with leading corporate brands and enterprises to execute flawless galas, annual conferences, award ceremonies, and product unveilings. We translate corporate values into unforgettable live experiences.',
    planningServices: [
      'Executive Summit & Gala Concept Development',
      'Venue Procurement & Technical Rider Compliance',
      'Stage Production, LED Wall & AV Engineering',
      'Keynote Speaker & Celebrity Host Management',
      'Sponsor Activation & Brand Booth Fabrications',
    ],
    decorationOptions: [
      'Minimalist Luxury Stage Sets & Illuminated Brand Walls',
      'Sophisticated Gala Table Centerpieces & Linen Styling',
      'Immersive Entrance Tunnel Lighting & Dynamic LED Passages',
      'VIP Lounge & Executive Networking Suite Styling',
    ],
    eventManagement: [
      'Precision Cue-to-Cue Stage Direction & Show Calling',
      'Delegate Registration & RFID Badge Check-In Flow',
      'Security, Crowd Flow & Protocol Management',
      'Catering & Executive Bar Coordination',
    ],
    whatWeHandle: [
      'Technical rehearsals and teleprompter cueing',
      'Media press wall setup and red carpet photo ops',
      'Sound and lighting level compliance for speeches and awards',
      'Post-event analytical debrief and attendance reporting',
    ],
    processSteps: [
      {
        title: 'Corporate Briefing & Objectives',
        description: 'We align on brand guidelines, audience demographics, and key event KPIs.',
      },
      {
        title: 'Production Blueprinting',
        description: 'Stage floorplans, lighting plots, and cue sheets are finalized.',
      },
      {
        title: 'Technical Run-Through',
        description: 'Complete AV check, presenter rehearsals, and safety compliance audit.',
      },
      {
        title: 'Live Event Direction',
        description: 'Precision show control ensuring every cue fires right on time.',
      },
    ],
    whyChooseUs: [
      'Proven track record with Fortune 500 companies and premier brands',
      'Integrated AV, stage fabrication, and luxury floral decor teams',
      'Strict adherence to brand identity guidelines and corporate security',
      'Full post-event reconciliation and executive feedback loops',
    ],
    faqs: [
      {
        question: 'Can you handle corporate events with over 1,000 attendees?',
        answer:
          'Absolutely. Our team has engineered and managed large-scale corporate summits, expos, and galas for up to 3,000 guests.',
      },
      {
        question: 'Do you provide audio-visual and stage lighting production?',
        answer:
          'Yes, we provide end-to-end stage fabrication, LED screens, line-array audio systems, and intelligent lighting setups.',
      },
    ],
    metaTitle: 'Corporate Event Planning & Management | 11:11 Decor',
    metaDescription:
      'Premier corporate event planning, brand galas, product launches, and high-tech stage production by 11:11 Decor.',
  },
  {
    slug: 'birthday-events',
    title: 'Birthday Event Planning',
    subtitle: 'Milestone Celebrations, Themed Soirees & Immersive Decor',
    description:
      'Custom birthday party planning for 1st birthdays, sweet sixteens, 30th milestones, and 50th golden jubilees with signature styling.',
    heroImage: '/events/birthdays-hero.jpg',
    intro:
      'Whether celebrating a child’s magical 1st birthday or honoring a 50th milestone jubilee, 11:11 Decor brings creativity, flair, and effortless execution to private birthday celebrations.',
    planningServices: [
      'Theme Selection & Custom Concept Illustration',
      'Venue Sourcing (Ballrooms, Lawns, Private Villas)',
      'Entertainment & Artist Booking (DJs, Live Bands, Magicians)',
      'Custom Cake & Dessert Station Coordination',
    ],
    decorationOptions: [
      'Organic Balloon Arch Canopies & Neon Backdrop Walls',
      'Custom Marquee Light Letters & Photo Op Corners',
      'Themed Tableware, Centerpieces & Favor Boxes',
      'Ambient LED Fairy Light & Ceiling Canopy Drape Styling',
    ],
    eventManagement: [
      'On-site Guest Welcome & Gift Station Oversight',
      'Cake Cutting Ceremony Cueing & Sound FX',
      'Activity Station & Children’s Entertainment Coordination',
    ],
    whatWeHandle: [
      'Personalized party favors and guest welcome kits',
      'Sound system setup and custom party playlist curation',
      'On-time cake delivery and climate-controlled display',
    ],
    processSteps: [
      {
        title: 'Theme & Concept Selection',
        description: 'Brainstorming unique themes tailored to the guest of honor.',
      },
      {
        title: 'Design Approval',
        description: 'Previewing color palettes, balloon sculptures, and dessert tables.',
      },
      {
        title: 'Set Up & Styling',
        description: 'On-site installation completed hours before guests arrive.',
      },
      {
        title: 'Party Time!',
        description: 'Relax and enjoy while our event coordinator manages the flow.',
      },
    ],
    whyChooseUs: [
      'Bespoke themes tailored to every age and passion',
      'High-quality eco-friendly balloons and structural props',
      'Full catering and entertainment integration',
    ],
    faqs: [
      {
        question: 'Do you offer customized birthday themes?',
        answer:
          'Yes! Every birthday celebration is designed from scratch to match your preferred theme, color palette, and personal style.',
      },
    ],
    metaTitle: 'Birthday Event Planning Services | 11:11 Decor',
    metaDescription:
      'Unforgettable birthday party planning, custom themes, milestone balloon arches, and entertainment by 11:11 Decor.',
  },
  {
    slug: 'engagement-events',
    title: 'Engagement Event Planning & Decoration',
    subtitle: 'Roka Ceremonies, Ring Exchanges, Cocktail Nights & Sangeet',
    description:
      'Elegant engagement party planning, romantic ring exchange stages, and vibrant Sangeet celebration management.',
    heroImage: '/events/engagements-hero.jpg',
    intro:
      'Mark the beginning of your wedding journey with an intimate Roka, glamorous engagement ring ceremony, or energetic Sangeet night designed and managed by 11:11 Decor.',
    planningServices: [
      'Engagement Party Concept & Venue Selection',
      'Choreographer & Anchor Booking for Sangeet',
      'Catering Menu Selection & Bar Service Alignment',
      'Guest Seating & Family Protocol Planning',
    ],
    decorationOptions: [
      'Floral Backdrop Frames & Candlelight Pathways',
      'Glamorous Ring Ceremony Stage Sets',
      'Vibrant Sangeet Dance Floor & Truss Lighting',
      'Customized Couple Monogram Projections',
    ],
    eventManagement: [
      'Ring Exchange Sequence & Special Effects Sparklers',
      'Sangeet Dance Sequence Cueing & DJ Synchronization',
      'Family Greeting & Photography Flow Control',
    ],
    whatWeHandle: [
      'Cold pyro and fog entry effects coordination',
      'Sound check for live performers and anchors',
      'Gifts and family ring box safety protocol',
    ],
    processSteps: [
      {
        title: 'Ceremony Planning',
        description: 'Aligning tradition with modern party flair.',
      },
      {
        title: 'Stage & Lighting Design',
        description: 'Creating stunning backdrops for ring exchange photos.',
      },
      {
        title: 'Seamless Execution',
        description: 'Managing timing from entries to late-night dancing.',
      },
    ],
    whyChooseUs: [
      'Specialized experience in North Indian Roka & Ring ceremonies',
      'Stunning photography-focused lighting and backdrop setups',
      'Full coordination between families and event vendors',
    ],
    faqs: [
      {
        question: 'Can you organize an outdoor engagement party?',
        answer:
          'Yes, we design garden engagements, poolside cocktail nights, and resort lawn setups complete with weather contingency plans.',
      },
    ],
    metaTitle: 'Engagement & Pre-Wedding Event Planning | 11:11 Decor',
    metaDescription:
      'Elegant engagement party planning, Roka ceremony styling, Sangeet staging, and ring exchange management by 11:11 Decor.',
  },
  {
    slug: 'private-events',
    title: 'Private Event Planning',
    subtitle: 'Anniversaries, Housewarmings, Soirees & Baby Showers',
    description:
      'Intimate private party planning offering discreet luxury, customized catering, and refined home or venue transformation.',
    heroImage: '/events/parties-hero.jpg',
    intro:
      'From silver wedding anniversaries to warm home Griha Pravesh gatherings and baby showers, 11:11 Decor elevates private home and venue celebrations into exquisite, stress-free occasions.',
    planningServices: [
      'Private Residence Space Transformation Planning',
      'Bespoke Fine Dining & Mixology Coordination',
      'Acoustic Musician & Valet Service Booking',
      'RSVP & Guest Transport Scheduling',
    ],
    decorationOptions: [
      'Refined Table Setting with Fine Crystal & Fresh Florals',
      'Warm Ambient Lantern & Garden String Lighting',
      'Custom Welcome Signage & Memory Photo Galleries',
      'Soft Lounge Seating & Drape Accent Cabanas',
    ],
    eventManagement: [
      'Discreet On-Site Host Assistance & Butler Coordination',
      'TIMELY Setup & Clean Breakdown Without Home Damage',
      'Guest Comfort & Ambient Sound Control',
    ],
    whatWeHandle: [
      'Protection of home flooring, lawn, and private furniture',
      'Trash removal and full post-event cleanliness audit',
      'Valet parking coordination for quiet residential streets',
    ],
    processSteps: [
      {
        title: 'Home / Venue Walkthrough',
        description: 'Assessing spatial layout and electrical access points.',
      },
      {
        title: 'Bespoke Proposal',
        description: 'Selecting tableware, floral arrangements, and menu courses.',
      },
      {
        title: 'Careful Setup',
        description: 'Transforming your space with complete structural safety.',
      },
      {
        title: 'Hosted Perfection',
        description: 'Overseeing service while you enjoy your guests.',
      },
    ],
    whyChooseUs: [
      'Discreet and respectful staff accustomed to luxury private residences',
      'Tailored dining and floral packages for intimate gatherings',
      'Clean, fast setup and restoration',
    ],
    faqs: [
      {
        question: 'Can you transform a home backyard into an event space?',
        answer:
          'Yes, we regularly convert private lawns, terrace gardens, and living rooms into high-end event spaces with flooring, lighting, and decor.',
      },
    ],
    metaTitle: 'Private Party & Milestone Event Planning | 11:11 Decor',
    metaDescription:
      'Intimate private party planning, anniversary soirees, baby showers, and home venue transformations by 11:11 Decor.',
  },
  {
    slug: 'destination-events',
    title: 'Destination Event Planning',
    subtitle: 'Mussoorie, Rishikesh, Rajasthan & Global Celebrations',
    description:
      'Turnkey destination wedding and event management handling travel, guest hospitality, local sourcing, and multi-day production.',
    heroImage: '/events/destinations-hero.jpg',
    intro:
      'Planning an event away from home requires seasoned remote logistics management. 11:11 Decor specializes in destination weddings and retreats in Mussoorie, Rishikesh, Jim Corbett, Jaipur, Udaipur, and beyond.',
    planningServices: [
      'Destination Venue Scouting & Resort Contracting',
      'Guest Travel Logistics, Flight Transfers & Airport Desks',
      'Multi-Day Welcome Hampers & Travel Itineraries',
      'Local Vendor Procurement & Equipment Haulage',
    ],
    decorationOptions: [
      'Hills & Valley Backdrop Mandaps with Scenic Panoramic Views',
      'Riverside Floral Installations & Eco-Friendly Decor',
      'Heritage Palace Illumination & Royal Lantern Pathways',
      'Weather-Resistant Outdoor Staging & Canopy Drapes',
    ],
    eventManagement: [
      'Command Center & 24/7 Guest Hospitality Helpdesk',
      'Luggage Tracking & Resort Check-in Coordination',
      'Multi-Venue Shuttle Bus & Transport Dispatch',
      'Local Authority Permits & Noise Exemption Certificates',
    ],
    whatWeHandle: [
      'Interstate trucking logistics and fragile floral transit',
      'Weather backup plans (rain covers, indoor hall conversions)',
      'Medical emergency and local doctor-on-call arrangements',
    ],
    processSteps: [
      {
        title: 'Destination Selection & Recce',
        description: 'Evaluating resort capabilities, room blocks, and travel routes.',
      },
      {
        title: 'Master Logistics Plan',
        description: 'Scheduling travel, staging cargo shipments, and vendor travel.',
      },
      {
        title: 'Destination Setup',
        description: 'Advance team arrives 48 hours early for full venue buildout.',
      },
      {
        title: 'Unforgettable Experience',
        description: 'Complete hospitality and event production oversight.',
      },
    ],
    whyChooseUs: [
      'Extensive network across Uttarakhand, Rajasthan, and Goa luxury resorts',
      'In-house logistics managers dedicated solely to guest hospitality',
      'Proven expertise in mountain and outdoor weather contingencies',
    ],
    faqs: [
      {
        question: 'Do you manage guest accommodation and airport transfers for destination weddings?',
        answer:
          'Yes! We manage full guest hospitality including hotel room allocation, welcome gifts, airport shuttle buses, and helpdesks.',
      },
    ],
    metaTitle: 'Destination Event Planning Services | 11:11 Decor',
    metaDescription:
      'Turnkey destination event planning, hill station weddings in Mussoorie & Rishikesh, palace celebrations, and travel logistics by 11:11 Decor.',
  },
]

export const EVENTS_PAGE_FAQS: FAQItem[] = [
  {
    question: 'What types of events does 11:11 Decor specialize in?',
    answer:
      'We plan, manage, and decorate weddings, corporate galas, milestone birthdays, engagement ceremonies, private home soirees, and destination events across India.',
  },
  {
    question: 'Can I hire 11:11 Decor for planning only or decor only?',
    answer:
      'Yes! We offer standalone wedding/event planning services, standalone visual decoration services, or complete turnkey packages combining planning and decor.',
  },
  {
    question: 'How do you handle unexpected weather during outdoor events?',
    answer:
      'Every outdoor event plan includes a structural weather contingency strategy — such as waterproof canopy drapes, fast indoor hall migration plans, and heavy-duty staging.',
  },
  {
    question: 'How do we get started with planning our event?',
    answer:
      'Simply reach out via our contact page or WhatsApp. We will schedule an initial discovery consultation to understand your date, venue, guest count, and visual vision.',
  },
]
