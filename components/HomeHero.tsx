import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    title: "Safety First",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M12 3 5 6v6c0 5 3.2 8.4 7 9.5 3.8-1.1 7-4.5 7-9.5V6l-7-3Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="m8.8 12 2.1 2.1 4.3-4.4"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Operational Excellence",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Trusted Partner",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M7 13.5 4.8 11a2.2 2.2 0 0 1 3.1-3.1L10 10m7-.5 2.2 2.2a2.2 2.2 0 1 1-3.1 3.1L14 13"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M9 12.5h6" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Sustainable Growth",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path d="M4 18V6m0 12h16" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="m4 14 5-5 3.5 3.5L20 5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

export function HomeHero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="relative lg:min-h-[600px]">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(52%,720px)] lg:block">
          <Image
            src="/hero.jpg"
            alt="Industrial process plant with yellow safety walkways"
            fill
            preload
            sizes="(max-width: 1024px) 0vw, 52vw"
            className="object-cover object-[18%_center]"
          />
          <svg
            className="absolute inset-y-0 left-0 h-full w-[38%]"
            viewBox="0 0 220 800"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path fill="#ffffff" d="M0 0h150C48 210 190 430 36 800H0V0Z" />
            <path
              fill="#e7eef6"
              d="M118 0C42 230 205 470 70 800H36C190 430 48 210 150 0Z"
            />
          </svg>
        </div>

        <div className="page-grid relative z-10 flex min-h-[520px] items-center py-12 lg:min-h-[600px] lg:py-8">
          <div className="max-w-[560px]">
            <p className="mb-5 text-[12px] font-semibold tracking-[0.34em] text-slate-400 uppercase">
              Cleaning <span className="mx-1 text-orange">•</span> Facilities{" "}
              <span className="mx-1 text-orange">•</span> Management
            </p>
            <h1 className="text-5xl leading-[0.95] font-extrabold tracking-tight text-[#163a62] sm:text-6xl lg:text-[64px]">
              Prime
              <span className="relative text-orange">
                Go
                <svg
                  className="absolute top-1.5 left-[0.78em] hidden h-3.5 w-3.5 text-orange sm:block"
                  viewBox="0 0 12 12"
                  aria-hidden
                >
                  <path fill="currentColor" d="M6 0 12 10H0Z" />
                </svg>
              </span>
              <span className="mt-1 block text-[2rem] sm:text-[2.6rem] lg:text-[48px]">
                Industrial Services Ltd
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-500">
              Integrated industrial cleaning and facility management
              for clean, safe, functional and well-managed facilities.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(244,122,31,0.28)] transition hover:bg-orange-hot"
            >
              Explore Our Services
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="page-grid pb-4 lg:hidden">
          <div className="relative h-64 overflow-hidden rounded-[28px]">
            <Image
              src="/hero.jpg"
              alt="Industrial process plant with yellow safety walkways"
              fill
              sizes="100vw"
              className="object-cover object-[30%_center]"
            />
          </div>
        </div>
      </div>

      <div className="page-grid">
        <div className="grid grid-cols-2 gap-4 border-t border-line py-6 lg:grid-cols-4 lg:gap-0">
          {pillars.map((item, index) => (
            <div
              key={item.title}
              className={`flex items-center gap-3 text-slate-500 ${
                index > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""
              }`}
            >
              <span className="text-[#7b8da3]">{item.icon}</span>
              <span className="text-sm font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
