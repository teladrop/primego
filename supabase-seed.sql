-- ============================================================
-- Seed built-in blog posts and projects into Supabase
-- Run after supabase-schema.sql in the SQL Editor
-- ============================================================

-- ── Seed Blog Posts ───────────────────────────────────────────

insert into posts (slug, title, excerpt, date, category, read_time, image, body, published, created_at, updated_at) values
  ('industrial-cleaning-factories',
   'What industrial cleaning should cover in a factory or warehouse',
   'Floors, machinery areas and loading bays need a different plan from an office. Here is how WestMark scopes industrial cleaning.',
   '12 October 2026', 'Industrial cleaning', '6 min', '/blog/shutdown.jpg',
   array[
     'A factory or warehouse is not a large office. Production dust, packaging waste, oil and forklift traffic build up in places that a generic cleaner will miss. Industrial cleaning has to name those areas and match the method to each one.',
     'Start with the production floor, walkways and machinery zones. Then add warehouses, loading bays and any processing rooms that affect safety or product quality. The plan should say when the work happens so operations are not surprised by a wet floor at peak hour.',
     'The aim is a site that is safe to walk, easy to inspect and ready for the next shift. That is the standard WestMark holds on industrial facilities.'
   ], true, now(), now()),

  ('facility-management-kpis',
   'Facility management that actually supports the building',
   'Cleaning alone does not run a facility. These are the day-to-day operations WestMark coordinates for property owners and managers.',
   '28 September 2026', 'Facility management', '5 min', '/blog/fm-kpis.jpg',
   array[
     'Facility management is the work that sits around cleaning: who opens the building, who logs a leaking tap, who follows a vendor, and who reports back to the property owner.',
     'WestMark treats that as a single service. We align cleaning rotas with how the building is used, coordinate maintenance requests and keep a simple record that managers can review.',
     'If the reception looks good but the washrooms, plant rooms and helpdesk are neglected, the facility is not being managed. The scorecard should cover the whole building, not only the visible floors.'
   ], true, now(), now()),

  ('post-construction-handover',
   'Preparing a property for handover after construction',
   'Developers and contractors need more than a sweep. Post-construction cleaning is the last step before inspection and keys.',
   '4 September 2026', 'Post-construction', '6 min', '/blog/confined-space.jpg',
   array[
     'Construction dust settles on floors, frames, fittings and glass long after the trades leave. A handover clean has to remove that residue so the client sees the finished property, not the build.',
     'WestMark typically works in stages: a first clean once major works are complete, then a final clean before inspection. That sequence gives contractors time to snag without presenting a dusty unit twice.',
     'Property managers should ask for a clear scope — interiors, service areas, glass and floors — and a date that matches the walkthrough. That is how handover stays on the programme.'
   ], true, now(), now()),

  ('commercial-cleaning-standards',
   'Keeping offices and common areas at a professional standard',
   'Commercial cleaning is what staff, guests and customers judge in the first minute. Consistency matters more than a one-off deep clean.',
   '18 August 2026', 'Commercial cleaning', '5 min', '/blog/sustainable.jpg',
   array[
     'Office buildings, shopping complexes, hotels and business premises share a simple requirement: they must look looked-after every day, not only when a director is visiting.',
     'WestMark builds commercial cleaning around occupancy. Receptions, lifts, washrooms and common areas get more frequent attention. Quiet floors follow a lighter, still reliable, schedule.',
     'The result should be the same standard from the street door to the last meeting room. That is what tenants and guests remember.'
   ], true, now(), now()),

  ('choosing-a-cleaning-fm-partner',
   'How to choose an integrated cleaning and facility partner',
   'If you still buy industrial, commercial, handover and janitorial work from separate vendors, you are managing the gaps yourself.',
   '2 August 2026', 'Leadership', '6 min', '/blog/partner.jpg',
   array[
     'Businesses, property owners and organisations often split cleaning and facility work because the sites look different: a factory, an office, a school, a new build. The result is four contractors and no single standard.',
     'Ask a partner to show how they would cover industrial cleaning, post-construction cleaning, commercial cleaning, facility management and janitorial services without handing you back a list of subcontractors.',
     'Walk the site with them. A serious team will notice production areas, common spaces, handover risks and daily hygiene in the same visit. That is the test WestMark expects to pass.'
   ], true, now(), now())

on conflict (slug) do nothing;

-- ── Seed Projects ──────────────────────────────────────────────

insert into projects (slug, title, sector, location, summary, outcome, description, images, cover_image, published, created_at, updated_at) values
  ('manufacturing-warehouse',
   'Factory and warehouse cleaning programme',
   'Industrial facilities', 'Ogun',
   'Ongoing factory, warehouse and machinery-area cleaning for a manufacturing campus, including shift-aligned housekeeping.',
   'Production floors and loading bays stayed inspection-ready through peak output.',
   'Ongoing factory, warehouse and machinery-area cleaning for a manufacturing campus, including shift-aligned housekeeping.',
   array['/hero.jpg'], '/hero.jpg', true, now(), now()),

  ('office-complex',
   'Multi-tenant office cleaning',
   'Commercial properties', 'Lagos',
   'Commercial cleaning of offices, receptions and common areas across a business complex used by several occupiers.',
   'One standard of presentation from the lobby to the top floor.',
   'Commercial cleaning of offices, receptions and common areas across a business complex used by several occupiers.',
   array['/hero.jpg'], '/hero.jpg', true, now(), now()),

  ('residential-handover',
   'Post-construction handover clean',
   'Construction and real estate', 'Abuja',
   'Deep cleaning of a new development ahead of client inspection, snagging and key handover.',
   'Units were presented dust-free and ready for occupation on the agreed date.',
   'Deep cleaning of a new development ahead of client inspection, snagging and key handover.',
   array['/hero.jpg'], '/hero.jpg', true, now(), now()),

  ('hotel-common-areas',
   'Hotel and common-area programme',
   'Commercial properties', 'Lagos',
   'Commercial and janitorial cleaning covering guest-facing areas, back-of-house corridors and washrooms.',
   'Hygiene and presentation held through high occupancy weekends.',
   'Commercial and janitorial cleaning covering guest-facing areas, back-of-house corridors and washrooms.',
   array['/hero.jpg'], '/hero.jpg', true, now(), now()),

  ('school-campus',
   'School campus hygiene support',
   'Institutions', 'Ibadan',
   'Routine janitorial services and scheduled deep cleans for classrooms, halls and shared facilities.',
   'A reliable daily standard that school managers could check against a simple rota.',
   'Routine janitorial services and scheduled deep cleans for classrooms, halls and shared facilities.',
   array['/hero.jpg'], '/hero.jpg', true, now(), now()),

  ('campus-fm',
   'Integrated facility management',
   'Institutions', 'Lagos',
   'Day-to-day facility operations and maintenance coordination for a mixed office and services campus.',
   'Cleaning, vendors and work orders sat with one WestMark account lead.',
   'Day-to-day facility operations and maintenance coordination for a mixed office and services campus.',
   array['/hero.jpg'], '/hero.jpg', true, now(), now())

on conflict (slug) do nothing;
