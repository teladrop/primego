export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f6f8fb]">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgba(244,122,31,0.12),transparent_55%)]" />
      <div className="page-grid relative py-12 sm:py-16">
        <p className="mb-4 text-xs font-semibold tracking-[0.32em] text-orange uppercase">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-navy-deep sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500">
          {description}
        </p>
        <span className="mt-8 block h-1 w-16 rounded-full bg-orange" />
      </div>
    </section>
  );
}
