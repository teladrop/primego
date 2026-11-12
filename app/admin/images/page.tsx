import { AdminShell } from "@/components/admin/AdminShell";
import { getSectionImages } from "@/lib/storage";
import { SectionImagesEditor } from "@/components/admin/SectionImagesEditor";

export default function AdminImagesPage() {
  const images = getSectionImages();
  return (
    <AdminShell>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-extrabold text-navy-deep">Section Images</h1>
        <p className="mt-1 text-sm text-muted">
          Update images shown across different sections of the site.
        </p>
        <SectionImagesEditor initial={images} />
      </div>
    </AdminShell>
  );
}
