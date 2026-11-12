import { AdminShell } from "@/components/admin/AdminShell";
import { getHeroSlides } from "@/lib/storage";
import { HeroSlidesManager } from "@/components/admin/HeroSlidesManager";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const slides = await getHeroSlides();
  return (
    <AdminShell>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-extrabold text-navy-deep">Hero Slides</h1>
        <p className="mt-1 text-sm text-muted">Manage the homepage carousel. Changes go live immediately.</p>
        <HeroSlidesManager initial={slides} />
      </div>
    </AdminShell>
  );
}
