import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-grid py-32 text-center">
      <p className="text-xs font-semibold tracking-[0.32em] text-orange uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-extrabold text-navy-deep">
        This page could not be found.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        The route you opened does not exist. Head back to the home page or
        contact the team.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-orange px-6 py-3 font-semibold text-white"
        >
          Home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-line px-6 py-3 font-semibold"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
