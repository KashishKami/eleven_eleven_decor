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
      "At 11:11 Decor, our Event Management service brings every moving part of your celebration together with clarity, creativity, and complete professional coordination. Whether you are hosting a wedding, milestone birthday, corporate gathering, private celebration, or destination event, our team works behind the scenes to turn your vision into a seamless experience. From the earliest discussions, we take time to understand your occasion, priorities, guests, venue, and the atmosphere you want to create. We then coordinate the people, timelines, logistics, décor, production, and on-site operations required to bring everything together. Our role is to keep every detail connected while giving you one reliable point of coordination throughout the process. We work closely with venues, suppliers, creative partners, and your own team to ensure everyone understands the plan and their responsibilities. Every schedule is considered carefully, every transition is planned, and every important moment is given the attention it deserves. Rather than leaving you to manage multiple conversations and last-minute decisions, our event management team creates structure around the experience, allowing you to focus on your guests and the moments that matter most.",
      "Successful event management depends on thoughtful preparation long before the event day arrives. At 11:11 Decor, we develop clear timelines, coordinate vendors, organize logistical requirements, and establish a detailed flow for the entire occasion. We help manage arrivals, setup schedules, ceremony timing, entertainment transitions, dining experiences, speeches, guest movement, and the many small details that create a polished event. Our team remains flexible because we understand that even the best-planned events can require quick decisions. On the day, our coordinators stay attentive, communicate clearly, and work discreetly to resolve challenges before they interrupt the experience. We oversee the setup, check that key elements are in place, coordinate participating vendors, and monitor the schedule from beginning to end. Whether the event involves an intimate gathering or a large-scale celebration across multiple spaces, we adapt our management approach to the scope and complexity of your requirements. Every event is different, which is why we do not believe in forcing your celebration into a rigid formula. Instead, we create a management plan built around your event, your venue, your guest experience, and your vision.",
      "Our goal is simple: to make your event feel effortless, even when a great deal of planning and coordination is happening behind the scenes. 11:11 Decor combines event management with a strong understanding of design, décor, guest experience, and production, allowing every element to work together as one complete story. We can manage a single event function, support your existing arrangements, or take responsibility for comprehensive end-to-end coordination. Throughout the process, we remain focused on what matters to you, from the first welcome to the final farewell. Our team helps create an environment where the hosts can be present, the guests feel cared for, and the event unfolds with confidence. With careful planning, professional coordination, and attentive on-site execution, we help transform complex occasions into memorable experiences. At 11:11 Decor, event management is not simply about following a checklist. It is about understanding the rhythm of your celebration, anticipating what needs to happen next, and ensuring every detail supports the bigger picture. Your wish inspires the vision; our team manages the journey that brings it to life beautifully, thoughtfully, and seamlessly."
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
      "Good events are designed before they're decorated. Event planning covers everything that happens before the first flower is placed — concept, budget guidance, vendor sourcing, and a realistic timeline built around your date.",
      "Planning for the event is not just about picking the right date and venue but it’s about weaving together every detail so the day unfolds what you exactly want. At 11:11 Décor we truly believe that “Your Wish Our creation is more than just a tagline. Our event planning services are designed to take the stress off your shoulders and replacing it with excitement. Our team make sure the planning should feel more like a fun part rather than a frustration job. Whether you are organizing an intimate family gathering, a milestone celebration, a product launch or a grand social affair we make sure every event describes a unique story waiting to be told. We handle venue scouting and booking, vendor coordination, budget management, timeline creation, guest logistics, catering coordination, entertainment booking, and on-the-day execution — so you can actually enjoy the event you're hosting instead of running around solving last-minute problems.",
      "What sets 11:11 Decor apart is our meticulous attention to detail combined with creative flair. We don't believe in cookie-cutter templates. Every event we plan is custom-built from the ground up, incorporating themes, color palettes, and design elements that reflect the personality of the host and the purpose of the occasion. Our planners are skilled at balancing aesthetics with logistics, ensuring that the event not only looks stunning but also runs like clockwork. We work closely with a trusted network of vendors — florists, caterers, photographers, lighting experts, and entertainers — to guarantee quality at every touchpoint. We also understand that budgets matter. That's why our event planning process is transparent from day one. We provide detailed cost breakdowns, help you prioritize where to splurge and where to save, and negotiate with vendors on your behalf to get you the best value without compromising on quality. No hidden costs, no last-minute surprises — just honest planning backed by years of industry experience.",
      "Timing is everything in event planning, and our team excels at creating and following detailed timelines that keep everything on track — from the initial booking stages months in advance to the final walkthrough hours before guests arrive. We anticipate challenges before they happen and have contingency plans ready, so even if something unexpected comes up, your event stays flawless. Whether you're planning a destination event, a corporate gathering, a religious ceremony, a milestone birthday, or an intimate get-together, 11:11 Decor brings the expertise, creativity, and calm confidence needed to pull it off beautifully. We pride ourselves on being more than just planners — we're your partners in creating memories that last a lifetime. Our reputation is built on client satisfaction, referrals, and repeat business, which speaks to the trust our clients place in us time and again."
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
    image: '/images/services/event-planning.png'
  },
  {
    slug: 'event-decoration',
    title: 'Event Decoration',
    shortDescription: 'Full décor design and setup — florals, staging, lighting, and styling.',
    heroH1: 'Event Decoration Services',
    intro: 'Décor is where the concept becomes visible — colour, texture, florals, and staging brought together across a venue. 11:11 Decor designs and installs décor for events of every size, either as a standalone service or as part of full event management.',
    editorialStory: [
      "At 11:11 Decor, our Event Decoration service transforms ordinary spaces into memorable settings that reflect your celebration. We believe décor is more than decoration; it shapes the atmosphere from the moment guests arrive. Whether you are planning a wedding, birthday, engagement, anniversary, private party, corporate gathering, or special celebration, our team develops a visual experience around your occasion. We begin by understanding your ideas, preferred style, colors, venue, theme, and the mood you want to create. From elegant and romantic to modern, vibrant, traditional, or completely customized, every concept is shaped to suit your vision. Our designers consider the entire event environment, including entrances, backdrops, seating areas, dining areas, stages, and photo opportunities. We combine creative styling and thoughtful placement to ensure every element feels connected. Through fabrics, florals, furniture, props, lighting, textures, and personalized details, we create settings that feel cohesive rather than crowded. Our goal is to make every corner of your venue contribute to the story of the event.",
      "Every successful decoration requires careful planning and precise execution. At 11:11 Decor, we develop a clear design direction before transforming the venue. Our team studies available space and considers how guests will move, gather, celebrate, and experience each area. This allows us to create décor that is visually striking while remaining practical and comfortable. We coordinate decorative elements, installations, floral arrangements, draping, centerpieces, signage, tablescapes, and other details to suit your event. We also work with the venue and other event partners to make sure setup plans, access times, technical needs, and timelines are properly organized. Each element is selected for a purpose, whether it creates a dramatic focal point, adds warmth, enhances photographs, or supports the overall theme. On the event day, our team manages the setup with close attention to quality and finishing touches. We check that the complete environment looks polished and is ready before your guests arrive. If plans evolve during the preparation process, we remain flexible and help refine the design while preserving the celebration's identity.",
      "Our approach to Event Decoration is personal, creative, and centered on the experience you want to share with your guests. We do not rely on a single style or repeat the same design for every occasion. Instead, we use your inspiration as the starting point and build a visual concept that feels distinctive to your event. Whether you need decoration for one important area or complete styling across an entire venue, 11:11 Decor can tailor the scope of our service to your requirements. We can create a refined atmosphere or develop an immersive setting filled with texture and detail. Throughout the process, our team balances creativity with coordination so the final result works beautifully alongside the event schedule, hospitality, entertainment, and guest experience. From the first design conversation to the final placement of each decorative element, we remain focused on delivering a setting that feels complete. At 11:11 Decor, we transform spaces into experiences that inspire and celebrate. Your occasion provides the reason to gather; our decoration brings the vision to life with beauty, personality, and unforgettable visual impact."
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
      "At 11:11 Decor, our Wedding Decoration service is designed to transform your celebration into a beautifully styled experience that reflects your story, personality, and vision. A wedding is more than a collection of functions; it is a series of meaningful moments that deserve an environment equally special. Our team works closely with couples to understand their preferred colours, themes, traditions, venue, guest experience, and overall aesthetic before creating a cohesive décor concept. From elegant mandaps and beautifully designed stages to welcoming entrances, dining areas, photo corners, tablescapes, and ceremony spaces, every element is thoughtfully planned. We believe luxury is found in the details, which is why our designs balance visual beauty with practical functionality. Whether you imagine a classic traditional wedding, contemporary celebration, romantic floral setting, royal-inspired décor, or an intimate destination wedding, we develop a design that feels personal rather than repetitive. Our team coordinates décor materials, florals, furniture, structures, fabrics, lighting, installations, and styling so every part of your wedding environment feels connected. From the first concept discussion to the final setup, we remain focused on creating a wedding atmosphere where every corner feels intentional and every moment looks beautiful.",
      "Our approach to wedding decoration combines creativity with careful planning and professional execution. We begin by studying the venue and understanding how its architecture, natural surroundings, available spaces, and guest movement can influence the décor. From there, our designers develop a visual direction covering colour palettes, floral arrangements, stage styling, entrance concepts, seating layouts, ceremony backdrops, and decorative details. For multi-function weddings, we can create individual themes for ceremonies while maintaining an overall visual connection throughout the celebration. Mehendi, Haldi, Sangeet, engagement, wedding ceremony, reception, and after-party spaces can each receive their own personality while remaining part of one thoughtfully designed wedding story. We also coordinate with production teams, venues, caterers, photographers, and other suppliers to ensure décor installation fits smoothly into the event schedule. Our on-site team manages setup and styling with attention to proportion, placement, finishing, and presentation. This detailed process helps ensure that your décor looks as beautiful in person as it does in photographs and videos. Every arrangement is checked before guests arrive, allowing you to enter your celebration with confidence and enjoy the occasion without worrying about the details.",
      "At 11:11 Decor, we understand that no two couples should have exactly the same wedding environment. Our Wedding Decoration service is therefore completely adaptable to your preferences, venue, guest count, cultural requirements, and budget considerations. We can create intimate celebrations with understated elegance or large-scale weddings featuring dramatic stages, floral installations, statement entrances, sophisticated lighting, and immersive décor. Our team pays attention to the details guests notice and the subtle elements they may not consciously see but still experience. From the first visual impression at the entrance to the final ceremony setting, we aim to create an atmosphere that feels welcoming, memorable, and unmistakably yours. We combine bespoke design, quality execution, thoughtful styling, and reliable coordination to make your wedding environment feel effortless and extraordinary. Your ideas become the starting point, our creativity shapes the concept, and our execution brings the finished celebration to life. With 11:11 Decor, your wedding décor is not simply decoration; it becomes part of the story you and your guests will remember for years."
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
      "At 11:11 Decor, our Corporate Event Management service is built for organisations that want professional events delivered with precision, creativity, and a strong focus on guest experience. Corporate occasions require a different level of planning because every element represents the organisation behind the event. Whether you are hosting a corporate gala, annual celebration, conference, executive gathering, product launch, award ceremony, networking event, employee celebration, or business summit, our team works to create an experience that reflects your brand and objectives. We begin by understanding the purpose of the event, audience profile, venue, schedule, brand guidelines, production requirements, and desired atmosphere. From concept development and venue coordination to stage design, guest movement, entertainment, hospitality, lighting, sound, and on-site management, we connect the individual components into one organised event plan. Our team works closely with venues, suppliers, production partners, speakers, performers, and internal corporate teams to establish clear responsibilities and timelines. This integrated approach helps minimise confusion and allows your organisation to focus on its guests, clients, employees, partners, and business objectives while our team manages the operational details behind the scenes.",
      "Professional corporate events depend heavily on timing, communication, and technical execution. At 11:11 Decor, we create detailed schedules covering venue access, production setup, stage preparation, registration, guest arrival, presentations, speeches, entertainment, meals, awards, networking sessions, and event closing. We coordinate with technical teams to ensure sound, lighting, screens, microphones, presentation equipment, and stage elements are prepared and tested before the event begins. Our on-site coordinators monitor the schedule throughout the occasion and communicate with the relevant teams when changes are required. For conferences and corporate presentations, we can help coordinate stage layouts and presentation transitions so speakers and participants can move smoothly through the programme. For annual galas and award ceremonies, we can create more immersive environments using sophisticated décor, lighting, entertainment, and hospitality arrangements. Product launches and brand events can incorporate visual concepts that support the company identity while creating an engaging atmosphere for guests. We understand that corporate events often involve senior executives, important clients, partners, and large groups, making professional coordination essential. Our team therefore focuses on punctuality, presentation, communication, discretion, and quick problem-solving throughout the event.",
      "Our Corporate Event Management service combines strategic organisation with the creative capabilities of 11:11 Decor. This means clients can coordinate event management, décor, stage production, lighting, entertainment, hospitality, and venue styling through one integrated team. We can support a single corporate function or manage the complete event journey from initial planning through final execution. Every event is developed around its specific purpose rather than being forced into a standard format. We pay attention to brand presentation, guest comfort, visual consistency, programme flow, and operational efficiency so the final experience feels professional from beginning to end. Our team also understands that successful corporate events should create more than an impressive appearance; they should encourage meaningful interaction, communicate the intended message, and leave guests with a positive impression of the organisation. From intimate leadership gatherings to large-scale corporate celebrations, we adapt our approach according to the scope, venue, audience, and production requirements. With detailed planning, experienced coordination, creative event design, and attentive on-site management, 11:11 Decor helps organisations deliver corporate experiences that are polished, engaging, memorable, and confidently executed."
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
      "At 11:11 Decor, our Stage Decoration service creates striking focal points that give your event a strong visual identity while providing a beautifully designed setting for important moments. The stage is often the centre of attention during weddings, receptions, birthdays, corporate events, award ceremonies, engagements, performances, and celebrations, making its design an important part of the overall event experience. Our team develops stage concepts according to your event theme, venue architecture, colour palette, programme requirements, and preferred aesthetic. From elegant wedding backdrops and floral mandaps to contemporary corporate stages, glamorous birthday settings, traditional designs, and dramatic production environments, we create concepts that complement the occasion. We consider proportions, sightlines, guest seating, photography angles, lighting positions, branding requirements, and stage functionality before finalising the design. Backdrops, panels, fabrics, flowers, structures, props, furniture, signage, screens, and decorative elements can be combined to create a cohesive stage environment. Our objective is not simply to make a stage attractive but to make it meaningful to the event. Every design decision is made with the understanding that the stage will become the background for speeches, ceremonies, photographs, performances, presentations, and memories.",
      "Our stage decoration process begins with understanding the venue and the purpose of the stage. We assess the available dimensions, ceiling height, audience viewing angles, stage access, existing architecture, technical requirements, and available installation time. This allows us to create designs that look impressive while remaining practical and safe for the event environment. For weddings, we can develop romantic floral backgrounds, traditional mandap structures, contemporary geometric installations, elegant fabric designs, or customised concepts based on the couple’s preferences. For birthdays, the stage can feature personalised names, numbers, themed props, balloons, florals, photographs, or creative backdrops. Corporate stages require a different approach, often combining brand identity with presentation screens, logos, professional lighting, speaker areas, and clean visual lines. We can coordinate decorative structures with audio-visual and production teams so the final stage does not appear visually crowded or technically compromised. During installation, our team focuses on symmetry, finishing, positioning, and presentation. We ensure the stage is ready before guests arrive and coordinate last-minute adjustments when required. By combining design thinking with practical execution, we create stage environments that work beautifully both in person and through photography and video.",
      "A well-designed stage can influence the entire atmosphere of an event, which is why our Stage Decoration service is tailored to create a memorable visual centrepiece. We can work with existing stage structures or develop customised installations depending on the event requirements. Our team can also integrate floral styling, lighting, signage, furniture, fabrics, decorative panels, screens, and other production elements to create a unified presentation. We pay particular attention to the relationship between the stage and the surrounding venue so the focal point feels connected rather than isolated. For large celebrations, we can create layered designs with multiple visual elements that provide depth and dimension. For intimate events, we can use refined styling and carefully selected details to create elegance without overwhelming the space. Our approach remains flexible because every venue and event has different requirements. Whether your goal is a luxurious wedding stage, a vibrant birthday backdrop, a professional corporate presentation stage, or a sophisticated celebration setting, 11:11 Decor combines creativity, planning, and precise installation to deliver the desired result. From the first concept to the final finishing touch, we create stages that capture attention, support the event programme, and provide the perfect backdrop for moments worth remembering."
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
    image: '/images/services/stage-decoration.png'
  },
  {
    slug: 'venue-decoration',
    title: 'Venue Decoration',
    shortDescription: "Full-venue styling that transforms a space to match your event's concept.",
    heroH1: 'Venue Decoration',
    intro: 'Every venue has a starting layout; venue decoration is how it becomes your event. 11:11 Decor styles full spaces — entrances, seating, lighting, and flow — to match your concept.',
    editorialStory: [
      "At 11:11 Decor, our Venue Decoration service transforms an ordinary event space into a complete visual experience designed around your celebration, guests, and personal style. A venue provides the structure for an event, but thoughtful decoration gives that structure personality, atmosphere, and emotion. Our team looks at the venue as a complete environment rather than focusing on one decorative area. We consider entrances, pathways, stages, seating arrangements, dining areas, ceremony spaces, lounges, photo zones, ceilings, walls, tables, and other guest-facing areas before developing the decoration concept. Whether you are planning a wedding, birthday, corporate event, engagement, private celebration, or destination occasion, we create a cohesive design that works with the architecture and natural character of the location. Our concepts can range from elegant and minimal to luxurious, colourful, traditional, contemporary, romantic, or highly immersive. We coordinate flowers, furniture, fabrics, lighting, structures, signage, table styling, stage décor, and decorative installations to create visual continuity throughout the venue. The goal is to make guests feel the atmosphere from the moment they arrive until the final farewell. Every area is planned with purpose so the venue feels complete without appearing overcrowded or disconnected.",
      "Effective venue decoration requires careful planning because different spaces serve different functions during an event. At 11:11 Decor, we begin by understanding the venue layout, guest capacity, event schedule, available facilities, architectural features, and decoration restrictions. We then develop a styling plan that identifies the key visual areas and determines how guests will experience the space. Entrances can receive welcoming floral or structural installations, while pathways can be enhanced with lighting, décor elements, or subtle styling. Dining areas can feature coordinated centrepieces, linens, table details, and ambient lighting, while lounges can provide comfortable spaces for guests to relax and interact. Ceremony and stage areas can become strong focal points while remaining visually connected to the rest of the venue. For destination events, we also consider the natural landscape and surroundings, using them as part of the design wherever appropriate. Our installation team coordinates setup according to the venue schedule and works carefully around other suppliers and event activities. We inspect each area before guests arrive, ensuring the final presentation feels balanced, polished, and ready for the celebration.",
      "Our Venue Decoration service is ideal for clients who want their entire event environment to feel thoughtfully designed rather than decorated in separate pieces. We can manage decoration for a single function or develop a complete visual concept covering multiple event spaces and ceremonies. Our team can also coordinate venue styling with floral decoration, stage design, lighting, production, furniture, and hospitality arrangements, creating one connected experience. We understand that the same venue can feel completely different depending on how it is styled, which is why our designs are built around your event rather than based on generic decoration packages. We pay attention to colour balance, scale, guest movement, photography opportunities, comfort, and the relationship between different areas. Whether you want a refined wedding venue, a vibrant birthday celebration, a sophisticated corporate environment, or an intimate private gathering, we create decoration that supports the purpose and mood of the occasion. From the first walkthrough to the final installation, our team combines creative planning with professional execution. With 11:11 Decor, your venue becomes more than a location; it becomes a carefully designed setting where guests can connect, celebrate, and create lasting memories."
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
    image: '/images/services/venue-decoration.jpg'
  },
  {
    slug: 'floral-decoration',
    title: 'Floral Decoration',
    shortDescription: 'Fresh and artificial floral design, from mandaps to table centerpieces.',
    heroH1: 'Floral Decoration',
    intro: 'Florals set the tone of a space more than almost any other element. 11:11 Decor designs fresh and artificial floral installations, from mandaps and backdrops to table centerpieces.',
    editorialStory: [
      "At 11:11 Decor, our Floral Decoration service brings colour, texture, fragrance, and natural beauty into your event through thoughtfully designed floral arrangements and installations. Flowers have the ability to change the character of a space instantly, but creating an elegant floral environment requires more than simply selecting beautiful blooms. Our team considers the event theme, colour palette, venue, season, lighting, architecture, guest experience, and overall design direction before developing the floral concept. From wedding mandaps and stage arrangements to entrance installations, table centrepieces, aisle décor, hanging flowers, floral walls, bouquets, welcome displays, and statement installations, we create floral styling that feels connected to the entire celebration. We can work with classic flowers, seasonal blooms, foliage, contemporary arrangements, traditional combinations, or sophisticated monochromatic concepts depending on your preferences. Floral decoration can be subtle and refined or dramatic and immersive, allowing us to adapt the design to intimate gatherings as well as large celebrations. Every arrangement is planned according to its location, scale, viewing angle, and purpose. Our goal is to make flowers feel like an integral part of the event design rather than an added decorative element.",
      "Our floral design process begins with understanding the mood and story you want your event to communicate. For weddings, we can create floral environments ranging from romantic and delicate to luxurious and grand, with flowers incorporated into mandaps, stages, entrances, tables, pathways, and ceremony spaces. For birthdays and private celebrations, flowers can be used to create personalised backdrops, cake tables, welcome areas, and photography zones. Corporate events can benefit from sophisticated floral arrangements that complement brand colours, stage designs, registration areas, dining tables, and executive spaces without distracting from the professional atmosphere. We also consider the practical requirements of floral décor, including installation timing, venue conditions, placement, maintenance, and coordination with lighting and production teams. Our designers work with appropriate combinations of blooms, foliage, structures, containers, fabrics, and supporting décor to create depth and visual balance. During setup, every arrangement is carefully positioned and finished so the flowers look fresh, intentional, and proportionate to their surroundings. For larger events, our team can coordinate floral styling across multiple areas to ensure that the entire venue maintains one consistent visual language.",
      "At 11:11 Decor, our Floral Decoration service is centred on creating floral experiences that feel personal, elegant, and memorable. We understand that flowers can carry emotional meaning, reflect cultural traditions, highlight special moments, and become an important part of photographs that are treasured for years. That is why we approach every floral project as part of the larger event story. We can create statement installations for guests to admire, delicate arrangements for intimate spaces, dramatic floral stages for ceremonies, or carefully styled table arrangements that enhance dining experiences. Our team can also combine flowers with lighting, fabrics, furniture, structures, and other décor elements to create layered environments with depth and character. Whether your preference is for a timeless floral setting, contemporary botanical styling, traditional Indian wedding flowers, or a modern luxury arrangement, we tailor the concept to your celebration. We pay close attention to colour, proportion, placement, texture, and overall harmony so the final result feels sophisticated rather than excessive. From the first floral concept to the final bloom placed on event day, 11:11 Decor brings creativity, planning, and careful execution together to turn flowers into an unforgettable part of your celebration."
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
    image: '/images/services/floral-decoration.jpg'
  },
  {
    slug: 'lighting-production',
    title: 'Lighting & Production',
    shortDescription: 'Ambient and event lighting, sound, and production support for every space.',
    heroH1: 'Lighting & Production',
    intro: 'Lighting changes how every other décor element is seen after dark. 11:11 Decor coordinates ambient and event lighting, along with sound and production support, as part of a complete décor plan.',
    editorialStory: [
      "At 11:11 Decor, our Lighting & Production service combines technical expertise with creative event design to make your celebration look, sound, and feel extraordinary. Lighting and production are often the elements that quietly control the atmosphere of an event, influencing how a stage appears, how guests experience a venue, and how important moments are presented. Our team develops production solutions according to the event type, venue, programme, audience, and desired visual atmosphere. From sophisticated wedding lighting and energetic Sangeet production to corporate stage systems, presentations, award ceremonies, live performances, and large celebrations, we coordinate the technical elements required for a smooth experience. Our production planning can include stage lighting, ambient lighting, architectural illumination, sound systems, microphones, screens, presentation equipment, special effects, and other event technologies where appropriate. We work closely with décor and design teams so technical equipment supports rather than interferes with the visual concept. Every production requirement is considered alongside stage layout, guest seating, venue dimensions, event schedule, and performance needs. Our goal is to create an environment where technology feels integrated into the experience while ensuring important moments are delivered clearly and professionally.",
      "Successful production depends on preparation, testing, timing, and communication. At 11:11 Decor, we begin by reviewing the event programme and identifying the technical requirements for every stage of the occasion. For weddings, this may include ceremony lighting, stage illumination, dance performances, speeches, music, and special entrances. For corporate events, production planning may involve microphones, presentation screens, speaker systems, stage lighting, branding displays, video playback, award presentations, and carefully timed transitions. We coordinate equipment placement and technical setup with venue teams and other suppliers to create an organised production environment. Before guests arrive, our technical team checks equipment, sound levels, lighting positions, screen content, microphones, and programme cues wherever required. During the event, production personnel remain attentive to the schedule and communicate with event managers and performers to ensure transitions happen smoothly. We understand that technical problems can interrupt even the most beautifully designed event, which is why preparation and backup planning are important parts of our approach. Every cable, light, speaker, screen, cue, and technical position is considered as part of the larger event plan.",
      "Our Lighting & Production service is designed to create an atmosphere that changes naturally with the rhythm of your event. Soft ambient lighting can create intimacy during dinner, dramatic stage lighting can highlight performances, and carefully coordinated production can bring energy to celebrations and presentations. We also consider how lighting affects photography and videography, ensuring important areas receive suitable illumination without compromising the overall design. For corporate occasions, we can maintain a professional visual environment that supports branding and communication, while weddings and private celebrations can benefit from more expressive and atmospheric production concepts. Our team works with your décor, stage, entertainment, and event management requirements so every technical element contributes to one cohesive experience. Whether you need production support for a single stage or a complete lighting and technical setup across a large event, we adapt our approach to your requirements. At 11:11 Decor, technology is not treated as an afterthought; it is part of the creative experience. Through thoughtful planning, professional coordination, reliable execution, and carefully designed lighting, we help turn event spaces into engaging environments where every entrance, performance, presentation, and celebration moment receives the attention it deserves."
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
    image: '/images/services/lighting-production.jpg',
    imagePosition: 'center center',
  },
  {
    slug: 'entertainment-hospitality',
    title: 'Entertainment & Hospitality',
    shortDescription: 'Guest experience planning, from entertainment bookings to hospitality coordination.',
    heroH1: 'Entertainment & Hospitality',
    intro: 'What guests experience beyond the décor — entertainment, service, and hospitality — shapes how an event is remembered. 11:11 Decor coordinates these guest-facing elements as part of the wider event plan.',
    editorialStory: [
      "At 11:11 Decor, our Entertainment & Hospitality service focuses on creating events where guests feel welcomed, engaged, comfortable, and genuinely cared for from arrival to departure. Beautiful décor may create the first impression, but entertainment and hospitality shape how people experience the celebration throughout the day. Our team helps coordinate guest-facing elements that add energy, warmth, personality, and smooth interaction to weddings, birthdays, corporate events, destination celebrations, private gatherings, and special occasions. Entertainment can be tailored to the atmosphere you want to create, whether that means live performances, DJs, musical acts, dance presentations, cultural performances, interactive experiences, hosts, or other event programming. Hospitality focuses on the guest journey, including welcoming, registration, guidance, seating, special assistance, guest communication, and coordination of important moments. We understand that different audiences require different experiences, so our recommendations are developed around the event type, guest profile, venue, schedule, and overall theme. From a warm welcome at the entrance to an energetic performance later in the evening, we coordinate these experiences so they feel natural rather than disconnected. Our objective is to make guests feel considered while helping the event maintain its intended rhythm and atmosphere.",
      "Planning entertainment and hospitality requires careful coordination because performers, guests, hosts, venue teams, production suppliers, and event managers must work together at the right time. At 11:11 Decor, we develop entertainment schedules that fit naturally into the overall event programme. For weddings, entertainment can include musical performances, DJs, dance acts, traditional artists, interactive moments, or specially planned performances for Sangeet and reception celebrations. Birthday events can incorporate age-appropriate entertainment, hosts, interactive activities, music, themed experiences, and performance elements. Corporate occasions may require professional hosts, live music, stage performances, award-show support, networking entertainment, or carefully selected experiences that suit the company audience. Our hospitality coordination can include guest welcome desks, registration assistance, VIP handling, venue guidance, rooming or arrival coordination for destination events, and support for special guests. We work closely with production and event management teams to ensure performers receive the required setup and that programme transitions happen smoothly. Our on-site coordinators monitor the guest experience and respond quickly when assistance is needed. This attention to timing and communication helps entertainment remain engaging while hospitality remains discreet, organised, and professional.",
      "The true success of an event is often measured by how guests remember the experience, and our Entertainment & Hospitality service is designed with that principle in mind. We aim to create moments that encourage guests to participate, connect, celebrate, and feel comfortable throughout the occasion. Entertainment is selected and coordinated according to the personality of the event rather than added simply to fill time. Hospitality is equally personalised, ensuring that important guests, families, executives, performers, and other attendees receive the appropriate level of attention. For destination celebrations, we can help create a welcoming experience from arrival through the main event, coordinating with the wider event management plan to keep guests informed and comfortable. For corporate gatherings, our hospitality approach supports a polished and professional environment where guests can network and engage with the programme easily. For weddings and private celebrations, entertainment can become an emotional and energetic part of the story, creating moments guests remember long after the event ends. At 11:11 Decor, we bring entertainment, hospitality, production, décor, and event coordination together to create a seamless guest experience. Every performance, welcome, transition, and interaction is planned with purpose, helping transform a well-organised event into a celebration that feels warm, engaging, effortless, and unforgettable."
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
      "At 11:11 Decor, our Birthday Decoration service turns birthdays into thoughtfully designed celebrations filled with personality, colour, creativity, and memorable details. Whether you are planning a first birthday, a child’s themed party, a milestone celebration, a sophisticated adult birthday, or an intimate gathering with family and friends, our team creates décor around the person being celebrated. We believe every birthday has its own character, which is why we avoid one-size-fits-all decoration concepts. Instead, we begin by understanding the age, personality, interests, preferred colours, theme, venue, guest list, and overall mood you want to create. From elegant balloon installations and floral arrangements to custom backdrops, welcome areas, cake tables, photo zones, tablescapes, signage, and statement décor pieces, we coordinate every element to create a visually connected celebration. For children, we can develop playful and imaginative environments inspired by favourite characters, colours, stories, or activities. For milestone birthdays, our designs can be sophisticated, glamorous, modern, or personalised around important memories and achievements. Every detail is selected to make the celebration feel special while also creating attractive spaces for photographs, conversations, entertainment, and memorable moments.",
      "Planning a successful birthday celebration involves more than placing decorations around a venue. At 11:11 Decor, we consider how guests will enter, move through, interact with, and remember the space. Our team studies the venue layout before developing the decoration plan so that every important area receives the right visual treatment. The main stage or backdrop can become the central focal point, while the cake table, guest seating, entrance, dining area, and photography corner are designed to support the overall theme. We coordinate colours, textures, props, balloons, florals, furniture, signage, lighting, and decorative installations to create balance throughout the venue. If the celebration includes entertainment, games, performances, or special presentations, we can plan décor around those activities so the environment remains functional as well as beautiful. Our installation team handles setup and finishing details before guests arrive, checking that every element is correctly positioned and ready for photographs. We also understand that birthdays can range from intimate home celebrations to large venue parties, so our service can be adapted to different scales and requirements. Whether you need focused decoration for one area or complete styling for the entire celebration, our team brings the same level of care and attention.",
      "Our goal with every Birthday Decoration project is to create an atmosphere that feels joyful, personal, and unforgettable. We can incorporate photographs, names, initials, age numbers, favourite colours, meaningful messages, themed props, floral arrangements, personalised signage, and custom installations to make the décor uniquely connected to the celebration. For elegant milestone birthdays, we can create refined environments using sophisticated styling, layered lighting, premium fabrics, floral details, and carefully selected furniture. For children’s parties, we can create colourful spaces that encourage excitement and imagination while maintaining a polished appearance for parents and guests. We also understand the importance of photography, ensuring that key decorative areas provide attractive backgrounds for family portraits, cake-cutting moments, and candid photographs. From the initial concept to the final setup, 11:11 Decor combines creative design with organised execution so you can focus on celebrating rather than managing decoration details. Your birthday should feel like your moment, and our team works to make every visual element support that experience. With personalised concepts, thoughtful styling, and professional execution, we transform ordinary birthday spaces into celebrations worth remembering."
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
    image: '/images/services/birthday-decoration.jpg'
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
