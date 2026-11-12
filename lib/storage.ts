import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function readJSON<T>(filename: string): T {
  const file = path.join(DATA_DIR, filename);
  if (!fs.existsSync(file)) return [] as unknown as T;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const file = path.join(DATA_DIR, filename);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  body: string[]; // array of paragraphs
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
  headline: string;
  subtext: string;
  cta: { label: string; href: string };
  order: number;
};

export type ContactSubmission = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  need: string;
  message: string;
  receivedAt: string;
  read: boolean;
};

export type SectionImages = {
  about: string;
  projects: string;
  "home-about": string;
};

export type AdminProject = {
  id: string;
  slug: string;
  title: string;
  sector: string;
  location: string;
  summary: string;
  outcome: string;
  description: string;       // rich paragraph body
  images: string[];           // base64 data URLs or /paths
  coverImage: string;         // first image used as card thumbnail
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

// ── Posts ─────────────────────────────────────────────────────────────────────

export function getPosts(): AdminPost[] {
  return readJSON<AdminPost[]>("posts.json");
}

export function getPost(id: string): AdminPost | undefined {
  return getPosts().find((p) => p.id === id);
}

export function getPostBySlug(slug: string): AdminPost | undefined {
  return getPosts().find((p) => p.slug === slug && p.published);
}

export function savePost(post: AdminPost): void {
  const posts = getPosts().filter((p) => p.id !== post.id);
  posts.unshift(post);
  writeJSON("posts.json", posts);
}

export function deletePost(id: string): void {
  writeJSON("posts.json", getPosts().filter((p) => p.id !== id));
}

// ── Hero Slides ───────────────────────────────────────────────────────────────

export function getHeroSlides(): HeroSlide[] {
  return readJSON<HeroSlide[]>("hero-slides.json").sort(
    (a, b) => a.order - b.order,
  );
}

export function saveHeroSlides(slides: HeroSlide[]): void {
  writeJSON("hero-slides.json", slides);
}

export function saveHeroSlide(slide: HeroSlide): void {
  const slides = getHeroSlides().filter((s) => s.id !== slide.id);
  slides.push(slide);
  slides.sort((a, b) => a.order - b.order);
  writeJSON("hero-slides.json", slides);
}

export function deleteHeroSlide(id: string): void {
  writeJSON("hero-slides.json", getHeroSlides().filter((s) => s.id !== id));
}

// ── Contact submissions ───────────────────────────────────────────────────────

export function getContacts(): ContactSubmission[] {
  return readJSON<ContactSubmission[]>("contacts.json");
}

export function saveContact(contact: ContactSubmission): void {
  const contacts = getContacts();
  contacts.unshift(contact);
  writeJSON("contacts.json", contacts);
}

export function markContactRead(id: string): void {
  const contacts = getContacts().map((c) =>
    c.id === id ? { ...c, read: true } : c,
  );
  writeJSON("contacts.json", contacts);
}

export function deleteContact(id: string): void {
  writeJSON("contacts.json", getContacts().filter((c) => c.id !== id));
}

// ── Section images ────────────────────────────────────────────────────────────

export function getSectionImages(): SectionImages {
  return readJSON<SectionImages>("section-images.json");
}

export function saveSectionImages(images: SectionImages): void {
  writeJSON("section-images.json", images);
}

// ── Admin Projects ────────────────────────────────────────────────────────────

export function getAdminProjects(): AdminProject[] {
  return readJSON<AdminProject[]>("projects.json");
}

export function getAdminProject(id: string): AdminProject | undefined {
  return getAdminProjects().find((p) => p.id === id);
}

export function getAdminProjectBySlug(slug: string): AdminProject | undefined {
  return getAdminProjects().find((p) => p.slug === slug && p.published);
}

export function saveAdminProject(project: AdminProject): void {
  const list = getAdminProjects().filter((p) => p.id !== project.id);
  list.unshift(project);
  writeJSON("projects.json", list);
}

export function deleteAdminProject(id: string): void {
  writeJSON("projects.json", getAdminProjects().filter((p) => p.id !== id));
}
