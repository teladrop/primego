import { getSupabaseServer } from "./supabase";
import type {
  AdminPost,
  HeroSlide,
  ContactSubmission,
  SectionImages,
  AdminProject,
} from "./types";

// Re-export types so existing imports don't break
export type { AdminPost, HeroSlide, ContactSubmission, SectionImages, AdminProject };

// ── Posts ─────────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<AdminPost[]> {
  const sb = getSupabaseServer();
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("getPosts:", error.message); return []; }
  return (data ?? []) as AdminPost[];
}

export async function getPost(id: string): Promise<AdminPost | undefined> {
  const sb = getSupabaseServer();
  const { data } = await sb.from("posts").select("*").eq("id", id).single();
  return data ?? undefined;
}

export async function getPostBySlug(slug: string): Promise<AdminPost | undefined> {
  const sb = getSupabaseServer();
  const { data } = await sb
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data ?? undefined;
}

export async function savePost(post: AdminPost): Promise<void> {
  const sb = getSupabaseServer();
  const { error } = await sb.from("posts").upsert(post, { onConflict: "id" });
  if (error) console.error("savePost:", error.message);
}

export async function deletePost(id: string): Promise<void> {
  const sb = getSupabaseServer();
  const { error } = await sb.from("posts").delete().eq("id", id);
  if (error) console.error("deletePost:", error.message);
}

// ── Hero Slides ───────────────────────────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const sb = getSupabaseServer();
  const { data, error } = await sb
    .from("hero_slides")
    .select("*")
    .order("order", { ascending: true });
  if (error) { console.error("getHeroSlides:", error.message); return []; }
  return (data ?? []) as HeroSlide[];
}

export async function saveHeroSlides(slides: HeroSlide[]): Promise<void> {
  const sb = getSupabaseServer();
  // Delete all and re-insert to handle full replacement
  await sb.from("hero_slides").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (slides.length > 0) {
    const { error } = await sb.from("hero_slides").insert(slides);
    if (error) console.error("saveHeroSlides:", error.message);
  }
}

export async function saveHeroSlide(slide: HeroSlide): Promise<void> {
  const sb = getSupabaseServer();
  const { error } = await sb.from("hero_slides").upsert(slide, { onConflict: "id" });
  if (error) console.error("saveHeroSlide:", error.message);
}

export async function deleteHeroSlide(id: string): Promise<void> {
  const sb = getSupabaseServer();
  const { error } = await sb.from("hero_slides").delete().eq("id", id);
  if (error) console.error("deleteHeroSlide:", error.message);
}

// ── Contact submissions ───────────────────────────────────────────────────────

export async function getContacts(): Promise<ContactSubmission[]> {
  const sb = getSupabaseServer();
  const { data, error } = await sb
    .from("contacts")
    .select("*")
    .order("received_at", { ascending: false });
  if (error) { console.error("getContacts:", error.message); return []; }
  return (data ?? []) as ContactSubmission[];
}

export async function saveContact(contact: ContactSubmission): Promise<void> {
  const sb = getSupabaseServer();
  const { error } = await sb.from("contacts").insert(contact);
  if (error) console.error("saveContact:", error.message);
}

export async function markContactRead(id: string): Promise<void> {
  const sb = getSupabaseServer();
  const { error } = await sb.from("contacts").update({ read: true }).eq("id", id);
  if (error) console.error("markContactRead:", error.message);
}

export async function deleteContact(id: string): Promise<void> {
  const sb = getSupabaseServer();
  const { error } = await sb.from("contacts").delete().eq("id", id);
  if (error) console.error("deleteContact:", error.message);
}

// ── Section Images ────────────────────────────────────────────────────────────

const SECTION_ROW_ID = 1;

export async function getSectionImages(): Promise<SectionImages> {
  const sb = getSupabaseServer();
  const { data } = await sb
    .from("section_images")
    .select("*")
    .eq("id", SECTION_ROW_ID)
    .single();
  if (!data) return { about: "/hero.jpg", projects: "/hero.jpg", home_about: "/hero.jpg" };
  // Strip the id field — only return the image fields
  const { id: _id, ...images } = data;
  return images as SectionImages;
}

export async function saveSectionImages(images: SectionImages): Promise<void> {
  const sb = getSupabaseServer();
  // Strip any id that may have been carried over from the client
  const { id: _id, ...clean } = images as Record<string, unknown>;
  const { error } = await sb
    .from("section_images")
    .upsert({ id: SECTION_ROW_ID, ...clean }, { onConflict: "id" });
  if (error) console.error("saveSectionImages:", error.message);
}

// ── Admin Projects ────────────────────────────────────────────────────────────

export async function getAdminProjects(): Promise<AdminProject[]> {
  const sb = getSupabaseServer();
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("getAdminProjects:", error.message); return []; }
  return (data ?? []) as AdminProject[];
}

export async function getAdminProject(id: string): Promise<AdminProject | undefined> {
  const sb = getSupabaseServer();
  const { data } = await sb.from("projects").select("*").eq("id", id).single();
  return data ?? undefined;
}

export async function getAdminProjectBySlug(slug: string): Promise<AdminProject | undefined> {
  const sb = getSupabaseServer();
  const { data } = await sb
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data ?? undefined;
}

export async function saveAdminProject(project: AdminProject): Promise<void> {
  const sb = getSupabaseServer();
  const { error } = await sb.from("projects").upsert(project, { onConflict: "id" });
  if (error) console.error("saveAdminProject:", error.message);
}

export async function deleteAdminProject(id: string): Promise<void> {
  const sb = getSupabaseServer();
  const { error } = await sb.from("projects").delete().eq("id", id);
  if (error) console.error("deleteAdminProject:", error.message);
}
