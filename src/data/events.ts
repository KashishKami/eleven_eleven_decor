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
      "Planning a wedding event involves far more than picking a venue and a date. Somewhere between the guest list, the décor choices, and the dozens of small logistics that hold everything together, most couples realize just how many decisions a single day actually requires. What kind of atmosphere do you want guests to walk into? Should the mandap or stage reflect a traditional look, or something more contemporary? How do the colors, lighting, and seating flow from one part of the venue to another? These aren't small questions, and getting them right is what turns a wedding event from a nice gathering into something that genuinely feels like your day. For many couples, the hardest part isn't imagining what they want, it's translating that vision into something that comes together smoothly on the actual day, without last-minute stress pulling focus away from the celebration itself.",
      "This is where thoughtful planning and decoration work together. A wedding event benefits enormously from décor that's designed around the couple's personality rather than a generic template, whether that means a floral-heavy mandap, a minimalist reception backdrop, or an entrance that sets the tone the moment guests arrive. Lighting plays a bigger role than most people expect too; warm, well-placed lighting can shift an ordinary hall into something that feels intimate and celebratory. Table styling, centerpieces, and stage décor should all speak the same visual language, so the event feels cohesive rather than pieced together. Coordination matters just as much as the décor itself. Someone needs to be thinking about timing, vendor handoffs, and how the space transitions between ceremony and reception, so the couple and their families can actually be present for their own event instead of managing it from behind the scenes.",
      "That balance of creative decision-making and steady on-ground execution is exactly what 11:11 Decor focuses on when working with couples on their wedding event. The idea is simple: understand what the couple actually envisions, then handle the styling, setup, and coordination in a way that lets that vision show up clearly on the day itself, without the family having to chase every detail. What makes the difference is having someone who's thought through the flow of the event in advance, so the décor, lighting, and timing all support each other instead of competing for attention. If you're in the early stages of planning your wedding event and starting to think about how you want it to look and feel, it's worth having a conversation with 11:11 Decor about your ideas. From there, it becomes a lot easier to shape a celebration that feels considered, personal, and genuinely yours."
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
      "Corporate events come with a slightly different set of expectations than personal celebrations, but they matter just as much. Whether it's a product launch, an annual day, a client dinner, or a team offsite, the way a corporate event looks and flows says something about the company hosting it. Guests notice the details, whether the branding feels consistent, whether the seating and stage setup make sense for the format of the day, whether the venue feels put together or thrown together at the last minute. For many organizers, the challenge isn't a lack of ideas, it's coordinating everything within a fixed timeline and budget while still making sure the event reflects the company's tone and professionalism. Add multiple stakeholders, approvals, and a packed agenda, and it's easy to see why corporate event planning often feels more stressful than it should.",
      "A well-executed corporate event usually comes down to how well the décor and logistics support the actual purpose of the day. Stage design needs to work for presentations and speeches, not just look good in photos. Branding elements, from backdrops to table displays, should feel integrated rather than added on as an afterthought. Lighting and seating arrangements can shift how formal or relaxed the room feels, depending on whether it's a boardroom-style meeting, an awards evening, or a larger celebratory gathering. Guest experience matters here too; smooth registration, clear signage, and a comfortable flow between sessions or networking areas all contribute to how the event is remembered. Instead of treating décor and coordination as separate tasks, the two need to work together so the event runs on time and looks the way the company intended, without visible scrambling behind the scenes.",
      "That's the kind of support 11:11 Decor brings to corporate events, thinking through the branding, décor, and on-ground coordination together, so the event reflects well on the company hosting it. For many clients, the real value isn't just how the venue looks, it's knowing that someone is managing the setup, timing, and small logistical details while the internal team focuses on the actual event and their guests. Corporate events often have less room for error than personal ones, given the audience and the impression at stake, so having an experienced team handle the execution can make a noticeable difference. If your company has a corporate event coming up and you're still figuring out how it should come together, it's worth talking to 11:11 Decor about your plans and seeing how the décor and coordination can be shaped around what the event actually needs to achieve."
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
    heroImage: '/images/events/birthday-events.jpg',
    intro:
      'From a first birthday to a milestone celebration, 11:11 Decor plans and decorates birthday events sized and styled to the occasion.',
    editorialStory: [
      "Birthday events have a way of feeling personal in a way few other celebrations do. There's no fixed script to follow, which is exactly what makes them fun to plan and, at times, a little tricky. Is it a milestone birthday that calls for something more elevated, or a lively gathering for close friends and family that should feel relaxed and colorful? Are the guests mostly kids, or is this an adult celebration with a completely different tone? The age, the personality of the person being celebrated, and the kind of atmosphere the host wants all shape the décor and setup in different directions. What most people want, whether they say it outright or not, is for the day to actually feel like a celebration built around that person, not a generic party template repeated from someone else's event. Getting that right takes a bit more thought than just picking balloons and a cake table.",
      "This is where décor and setup start to matter more than people expect. A birthday event usually has a clear personality behind it, and the styling should reflect that, whether it's a theme-based setup for a child's birthday, an elegant dinner arrangement for a milestone celebration, or a bright, casual backdrop for a friends' get-together. Balloon décor, backdrops, table styling, and lighting all play a role in setting the mood the moment guests walk in. For milestone birthdays especially, small personalized touches, like a name or age worked into the décor, or a color palette that matches the celebrant's taste, tend to make the space feel intentional rather than rented. Coordination matters here too, particularly with cake reveals, entry moments, or surprise elements that need good timing to actually land well. The idea is simple: the décor should feel like it was created around this one person's celebration, not adapted from a catalog.",
      "That personal approach is really what 11:11 Decor focuses on when working on birthday events, understanding who the celebration is for before deciding how the space should look and feel. For many clients, the value isn't just the balloons or the backdrop, it's having someone manage the setup and small details so the host can actually enjoy the day instead of double-checking arrangements right up until guests arrive. Birthday events are meant to be lighthearted, and that's easier to achieve when the planning and execution are handled by people who've done it before. If you're starting to think about a birthday event and want the décor to genuinely reflect the person you're celebrating, it's worth having a conversation with 11:11 Decor about your ideas and how they could come together."
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
      "Engagement events sit in an interesting spot between formal tradition and personal celebration. For many couples and families, it's the first event where both sides come together publicly to mark the relationship, which means there's often a mix of expectations to balance, families wanting a certain level of tradition, couples wanting the day to feel personal and reflective of them as a pair. Should the décor lean traditional with classic mandap-style elements, or feel more contemporary with a ring platform, a styled photo backdrop, and modern lighting? Is it an intimate gathering at home or a larger event at a banquet hall? These choices shape everything from the seating layout to how the entry moment is designed. What most families really want is for the event to feel warm and celebratory without turning into a logistical headache in the days leading up to it.",
      "Once the tone of the event is clear, the décor and setup can start reflecting that vision properly. Engagement events often center around a few key visual moments, the ring exchange platform, the couple's seating or stage area, and the entrance guests walk through first, so getting those right tends to matter more than filling every corner of the venue. Floral arrangements, drapery, and lighting can be used to create a soft, romantic feel, while color palettes and personalized elements like initials or a couple's photo backdrop help the space feel specific to them rather than borrowed from someone else's event. Coordination also plays a quieter but important role here, timing the couple's entry, managing the ring ceremony moment, and making sure family members aren't juggling logistics instead of actually being present for the occasion. The goal is for the décor to support the moment, not distract from it.",
      "That balance of visual styling and steady coordination is where 11:11 Decor tends to add the most value for engagement events, shaping the space around the couple and the families involved rather than applying a one-size-fits-all setup. For many clients, having someone manage the décor, seating, and key moments means the day can actually be enjoyed rather than spent checking on vendors or timing. Engagement events tend to move quickly once they start, so having the details sorted in advance makes a real difference. If you're beginning to plan an engagement event and thinking through how you'd like it to look and feel, it's worth talking to 11:11 Decor about your ideas and seeing how they can be brought together for the day."
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
      "Private events tend to have a very different energy than large celebrations, and that's usually the whole point. Whether it's a small dinner at home, an intimate gathering for close friends, or a personal milestone celebrated away from a big guest list, the appeal often comes from the setting feeling relaxed rather than event-like in the traditional sense. The challenge, though, is that smaller doesn't always mean simpler. With fewer guests and a more personal setting, every detail tends to stand out more, the lighting in the room, how the seating is arranged, whether the space feels styled or just functional. Hosts usually want the evening to feel effortless for their guests, even if quite a bit of thought went into making it that way. That's often the real ask behind a private event, comfort and atmosphere without it feeling overdone.",
      "Getting that right comes down to reading the scale of the event correctly. A private event doesn't need a large stage setup or elaborate backdrops, but it does benefit from décor that's proportionate and intentional, soft lighting that changes the mood of a living space, a styled dining table if the evening centers around a meal, or simple floral touches that make a familiar space feel a little more special for the occasion. Personalization tends to matter more here than in bigger events, since guests are often close friends or family who will notice thoughtful touches, a personal color palette, small details tied to the reason for celebrating, or a setup that reflects the host's actual taste rather than a generic party look. Coordination is lighter too, but timing still matters, especially if there's a surprise element or a specific moment the host wants to build the evening around.",
      "This kind of scaled-down, detail-focused approach is really where 11:11 Decor fits into private events, working within a smaller footprint but still bringing the same attention to how the space looks and feels. For many hosts, the value isn't a big transformation, it's having someone handle the styling and setup so they can actually be present with their guests instead of managing arrangements right before people arrive. Private events work best when they feel unforced, and that's easier to achieve with a bit of experienced planning behind the scenes. If you have a private event coming up and want the space to feel thoughtfully put together without being over the top, it's worth talking to 11:11 Decor about how that could come together."
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
      "Destination events bring a different kind of excitement, and a different kind of complexity. The moment a celebration moves away from a familiar city or venue, whether it's a hill station wedding, a beachside engagement, or a resort-based birthday getaway, the planning naturally becomes more layered. Guests are traveling, often over a few days, which means the event isn't just one evening anymore, it's an experience that unfolds across arrivals, multiple functions, and a location that guests may be seeing for the first time. Hosts usually want that unfamiliar location to feel like part of the celebration rather than just a backdrop, the mountains, the coastline, or the resort grounds should add something to the event, not compete with it. At the same time, there's real pressure to make sure logistics don't fall apart simply because everything is happening away from home ground.",
      "This is where décor and planning need to work closely with the location itself rather than against it. A destination event benefits from styling that responds to its surroundings, lighter, airier décor for a beach setting, warmer tones and textures for a hill destination, open-air seating and lighting that plays well after sunset. Because there are often multiple functions spread across a few days, the décor usually needs to feel connected without being repetitive, each event distinct but part of the same overall celebration. Coordination becomes especially important here too, working with the venue's existing setup, managing vendors who may be local to the destination, and making sure décor elements arrive and come together on schedule despite the distance. The aim is for guests to simply enjoy being somewhere new, without seeing any of the coordination that made that possible.",
      "That's the part of destination events where 11:11 Decor's experience makes the most difference, handling the décor and on-ground coordination so the location becomes an asset rather than an added variable to worry about. For many hosts, the real relief isn't just the styling, it's knowing someone is managing setup and logistics in an unfamiliar place while they focus on their guests and the experience itself. Destination events carry a lot of moving parts, and having a team that's planned around distance and venue constraints before makes the whole thing far smoother. If you're considering a destination event and thinking about how the location and décor could come together, it's worth having a conversation with 11:11 Decor about your plans."
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
