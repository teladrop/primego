// Shared types used across storage, API routes, and UI components

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  read_time: string;
  image: string;
  body: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
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
  received_at: string;
  read: boolean;
};

export type SectionImages = {
  about: string;
  projects: string;
  home_about: string;
};

export type AdminProject = {
  id: string;
  slug: string;
  title: string;
  sector: string;
  location: string;
  summary: string;
  outcome: string;
  description: string;
  images: string[];
  cover_image: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};
