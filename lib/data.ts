export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  points: string[];
};

export type Audience = {
  title: string;
  summary: string;
};

export type Project = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  summary: string;
  outcome: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  body: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type Job = {
  slug: string;
  title: string;
  type: string;
  location: string;
  summary: string;
  duties: string[];
};

export const values = [
  {
    title: "Safety First",
    description: "Clean, organised workplaces that reduce slip, trip and hygiene risks.",
  },
  {
    title: "Operational Excellence",
    description: "Schedules, standards and reporting that keep facilities running every day.",
  },
  {
    title: "Trusted Partner",
    description: "One team for industrial, commercial, handover and janitorial work.",
  },
  {
    title: "Sustainable Growth",
    description: "Efficient methods that protect buildings, equipment and the people who use them.",
  },
];

export const audiences: Audience[] = [
  {
    title: "Industrial facilities",
    summary:
      "Factories, manufacturing plants, warehouses and processing facilities that need production areas, machinery zones and yards kept clean and workable.",
  },
  {
    title: "Commercial properties",
    summary:
      "Office buildings, shopping complexes, hotels and business premises that need a professional standard across offices, lobbies and common areas.",
  },
  {
    title: "Construction and real estate",
    summary:
      "Developers, contractors and property managers who need post-construction cleaning and a site that is ready for inspection and handover.",
  },
  {
    title: "Institutions",
    summary:
      "Hospitals, schools and other large facilities that require reliable hygiene, routine cleaning and coordinated day-to-day facility support.",
  },
];

export const services: Service[] = [
  {
    slug: "industrial-cleaning",
    title: "Industrial Cleaning",
    summary: "Factory, warehouse and machinery-area cleaning.",
    description:
      "WestMark cleans industrial environments where dust, grease, production waste and heavy traffic are part of the job. We work around operating hours so factories, warehouses and processing facilities stay safe, presentable and ready for the next shift.",
    points: [
      "Factory floors, production lines and walkways",
      "Warehouse aisles, loading bays and storage areas",
      "Machinery-area degreasing and housekeeping",
      "Scheduled deep cleans and call-out support",
    ],
  },
  {
    slug: "post-construction-cleaning",
    title: "Post-Construction Cleaning",
    summary: "Deep cleaning and property handover preparation.",
    description:
      "When building work ends, WestMark prepares the property for inspection, snagging and handover. We remove construction dust, residue and debris so developers, contractors and property managers can present a finished space with confidence.",
    points: [
      "First and final clean after construction or fit-out",
      "Dust, debris and residue removal from interiors",
      "Glass, floors, fittings and service areas",
      "Handover-ready presentation for clients and tenants",
    ],
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    summary: "Offices, business premises and common areas.",
    description:
      "We keep commercial properties looking professional for staff, visitors and customers. From office floors to shopping complexes, hotels and business premises, WestMark delivers a consistent standard across occupied spaces and shared areas.",
    points: [
      "Office floors, meeting rooms and receptions",
      "Shopping complexes and customer-facing areas",
      "Hotels, lobbies and back-of-house support",
      "Common areas, washrooms and high-traffic zones",
    ],
  },
  {
    slug: "facility-management",
    title: "Facility Management",
    summary: "Day-to-day facility operations and maintenance coordination.",
    description:
      "WestMark helps organisations run buildings, not only clean them. Our facility management support covers daily operations, vendor coordination and maintenance follow-up so property owners and managers have one accountable partner on site.",
    points: [
      "Day-to-day facility operations support",
      "Maintenance request and vendor coordination",
      "Cleaning programmes aligned to building use",
      "Regular reporting for property and operations teams",
    ],
  },
  {
    slug: "janitorial-services",
    title: "Janitorial Services",
    summary: "Routine cleaning and workplace hygiene.",
    description:
      "Routine cleaning is what staff and visitors notice every day. WestMark provides janitorial services that keep workplaces hygienic, stocked and dependable — from daily office rounds to washrooms, kitchens and shared facilities in larger institutions.",
    points: [
      "Daily and weekly cleaning schedules",
      "Washrooms, pantries and workplace hygiene",
      "Consumable replenishment and waste collection",
      "Hospitals, schools and other large facilities",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "manufacturing-warehouse",
    title: "Factory and warehouse cleaning programme",
    sector: "Industrial facilities",
    location: "Ogun",
    summary:
      "Ongoing factory, warehouse and machinery-area cleaning for a manufacturing campus, including shift-aligned housekeeping.",
    outcome: "Production floors and loading bays stayed inspection-ready through peak output.",
  },
  {
    slug: "office-complex",
    title: "Multi-tenant office cleaning",
    sector: "Commercial properties",
    location: "Lagos",
    summary:
      "Commercial cleaning of offices, receptions and common areas across a business complex used by several occupiers.",
    outcome: "One standard of presentation from the lobby to the top floor.",
  },
  {
    slug: "residential-handover",
    title: "Post-construction handover clean",
    sector: "Construction and real estate",
    location: "Abuja",
    summary:
      "Deep cleaning of a new development ahead of client inspection, snagging and key handover.",
    outcome: "Units were presented dust-free and ready for occupation on the agreed date.",
  },
  {
    slug: "hotel-common-areas",
    title: "Hotel and common-area programme",
    sector: "Commercial properties",
    location: "Lagos",
    summary:
      "Commercial and janitorial cleaning covering guest-facing areas, back-of-house corridors and washrooms.",
    outcome: "Hygiene and presentation held through high occupancy weekends.",
  },
  {
    slug: "school-campus",
    title: "School campus hygiene support",
    sector: "Institutions",
    location: "Ibadan",
    summary:
      "Routine janitorial services and scheduled deep cleans for classrooms, halls and shared facilities.",
    outcome: "A reliable daily standard that school managers could check against a simple rota.",
  },
  {
    slug: "campus-fm",
    title: "Integrated facility management",
    sector: "Institutions",
    location: "Lagos",
    summary:
      "Day-to-day facility operations and maintenance coordination for a mixed office and services campus.",
    outcome: "Cleaning, vendors and work orders sat with one WestMark account lead.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "WestMark cleaned our factory and warehouse as one programme. Machinery areas, aisles and loading bays finally look like they belong to the same site.",
    name: "Adewale Okon",
    role: "Operations Manager",
    company: "Atlantic Manufacturing",
  },
  {
    quote:
      "We needed offices, common areas and the reception to feel consistent. The commercial cleaning team is organised and easy to manage.",
    name: "Chioma Eze",
    role: "Facilities Manager",
    company: "Northgate Business Park",
  },
  {
    quote:
      "Their post-construction clean made handover straightforward. Dust, debris and glass were dealt with before the client walkthrough.",
    name: "Marcus Adeyemi",
    role: "Project Manager",
    company: "Savanna Developments",
  },
  {
    quote:
      "Janitorial cover in our school is reliable. Washrooms, classrooms and halls are ready before the day starts.",
    name: "Halima Bello",
    role: "Estate Manager",
    company: "Greenfield Schools",
  },
  {
    quote:
      "Facility management used to mean chasing three contractors. WestMark coordinates cleaning and day-to-day operations under one lead.",
    name: "Ibrahim Lawal",
    role: "Property Manager",
    company: "Horizon Estates",
  },
  {
    quote:
      "From the hotel lobby to the back-of-house, the standard is visible. Guests notice, and so do our own staff.",
    name: "Sarah Nwosu",
    role: "General Manager",
    company: "Kite Hotels",
  },
];

export const posts: Post[] = [
  {
    slug: "industrial-cleaning-factories",
    title: "What industrial cleaning should cover in a factory or warehouse",
    excerpt:
      "Floors, machinery areas and loading bays need a different plan from an office. Here is how WestMark scopes industrial cleaning.",
    date: "12 October 2026",
    category: "Industrial cleaning",
    readTime: "6 min",
    image: "/blog/shutdown.jpg",
    body: [
      "A factory or warehouse is not a large office. Production dust, packaging waste, oil and forklift traffic build up in places that a generic cleaner will miss. Industrial cleaning has to name those areas and match the method to each one.",
      "Start with the production floor, walkways and machinery zones. Then add warehouses, loading bays and any processing rooms that affect safety or product quality. The plan should say when the work happens so operations are not surprised by a wet floor at peak hour.",
      "The aim is a site that is safe to walk, easy to inspect and ready for the next shift. That is the standard WestMark holds on industrial facilities.",
    ],
  },
  {
    slug: "facility-management-kpis",
    title: "Facility management that actually supports the building",
    excerpt:
      "Cleaning alone does not run a facility. These are the day-to-day operations WestMark coordinates for property owners and managers.",
    date: "28 September 2026",
    category: "Facility management",
    readTime: "5 min",
    image: "/blog/fm-kpis.jpg",
    body: [
      "Facility management is the work that sits around cleaning: who opens the building, who logs a leaking tap, who follows a vendor, and who reports back to the property owner.",
      "WestMark treats that as a single service. We align cleaning rotas with how the building is used, coordinate maintenance requests and keep a simple record that managers can review.",
      "If the reception looks good but the washrooms, plant rooms and helpdesk are neglected, the facility is not being managed. The scorecard should cover the whole building, not only the visible floors.",
    ],
  },
  {
    slug: "post-construction-handover",
    title: "Preparing a property for handover after construction",
    excerpt:
      "Developers and contractors need more than a sweep. Post-construction cleaning is the last step before inspection and keys.",
    date: "4 September 2026",
    category: "Post-construction",
    readTime: "6 min",
    image: "/blog/confined-space.jpg",
    body: [
      "Construction dust settles on floors, frames, fittings and glass long after the trades leave. A handover clean has to remove that residue so the client sees the finished property, not the build.",
      "WestMark typically works in stages: a first clean once major works are complete, then a final clean before inspection. That sequence gives contractors time to snag without presenting a dusty unit twice.",
      "Property managers should ask for a clear scope — interiors, service areas, glass and floors — and a date that matches the walkthrough. That is how handover stays on the programme.",
    ],
  },
  {
    slug: "commercial-cleaning-standards",
    title: "Keeping offices and common areas at a professional standard",
    excerpt:
      "Commercial cleaning is what staff, guests and customers judge in the first minute. Consistency matters more than a one-off deep clean.",
    date: "18 August 2026",
    category: "Commercial cleaning",
    readTime: "5 min",
    image: "/blog/sustainable.jpg",
    body: [
      "Office buildings, shopping complexes, hotels and business premises share a simple requirement: they must look looked-after every day, not only when a director is visiting.",
      "WestMark builds commercial cleaning around occupancy. Receptions, lifts, washrooms and common areas get more frequent attention. Quiet floors follow a lighter, still reliable, schedule.",
      "The result should be the same standard from the street door to the last meeting room. That is what tenants and guests remember.",
    ],
  },
  {
    slug: "choosing-a-cleaning-fm-partner",
    title: "How to choose an integrated cleaning and facility partner",
    excerpt:
      "If you still buy industrial, commercial, handover and janitorial work from separate vendors, you are managing the gaps yourself.",
    date: "2 August 2026",
    category: "Leadership",
    readTime: "6 min",
    image: "/blog/partner.jpg",
    body: [
      "Businesses, property owners and organisations often split cleaning and facility work because the sites look different: a factory, an office, a school, a new build. The result is four contractors and no single standard.",
      "Ask a partner to show how they would cover industrial cleaning, post-construction cleaning, commercial cleaning, facility management and janitorial services without handing you back a list of subcontractors.",
      "Walk the site with them. A serious team will notice production areas, common spaces, handover risks and daily hygiene in the same visit. That is the test WestMark expects to pass.",
    ],
  },
];

export const jobs: Job[] = [
  {
    slug: "site-supervisor",
    title: "Cleaning and Site Supervisor",
    type: "Full-time",
    location: "Lagos / rotating sites",
    summary:
      "Lead cleaning crews across industrial, commercial and institutional sites and keep the agreed standard visible.",
    duties: [
      "Plan daily and weekly cleaning schedules",
      "Brief teams and check quality on site",
      "Coordinate with client facilities or property managers",
      "Report issues that need maintenance follow-up",
    ],
  },
  {
    slug: "post-construction-lead",
    title: "Post-Construction Cleaning Lead",
    type: "Full-time",
    location: "Project sites nationwide",
    summary:
      "Run deep cleans and handover preparation for developers, contractors and property managers.",
    duties: [
      "Scope first and final cleans after construction or fit-out",
      "Lead teams through interiors, glass and service areas",
      "Leave properties ready for inspection and handover",
      "Work to project dates agreed with the client",
    ],
  },
  {
    slug: "fm-coordinator",
    title: "Facility Management Coordinator",
    type: "Full-time",
    location: "Lagos and Ogun",
    summary:
      "Coordinate day-to-day facility operations, vendors and cleaning programmes for client buildings.",
    duties: [
      "Log and follow maintenance and cleaning requests",
      "Align rotas with how each building is used",
      "Keep simple reports for property owners and managers",
      "Be the on-site point of contact for WestMark services",
    ],
  },
  {
    slug: "janitorial-supervisor",
    title: "Janitorial Supervisor",
    type: "Full-time",
    location: "Institutions and commercial sites",
    summary:
      "Supervise routine cleaning and workplace hygiene in offices, schools, hospitals and similar facilities.",
    duties: [
      "Run daily janitorial rounds to a published checklist",
      "Keep washrooms, pantries and common areas stocked",
      "Coach attendants on hygiene standards",
      "Escalate building issues that cleaning cannot solve",
    ],
  },
];

export function getService(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getPost(slug: string) {
  return posts.find((item) => item.slug === slug);
}
