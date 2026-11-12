import { AdminShell } from "@/components/admin/AdminShell";
import { getContacts } from "@/lib/storage";
import { ContactInbox } from "@/components/admin/ContactInbox";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const contacts = await getContacts();
  return (
    <AdminShell>
      <div className="max-w-4xl">
        <h1 className="text-2xl font-extrabold text-navy-deep">Inbox</h1>
        <p className="mt-1 text-sm text-muted">Messages sent through the contact form.</p>
        <ContactInbox initial={contacts} />
      </div>
    </AdminShell>
  );
}
