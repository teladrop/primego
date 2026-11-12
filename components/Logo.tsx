import Link from "next/link";

export function Logo({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const west = variant === "light" ? "text-white" : "text-[#1E4B86]";

  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative leading-none">
        <span
          className={`text-[28px] font-extrabold tracking-tight sm:text-[32px] ${west}`}
        >
          West
        </span>
        <span className="relative text-[28px] font-extrabold tracking-tight text-orange sm:text-[32px]">
          Mark
          <svg
            className="absolute -top-1.5 left-[0.72em] h-3 w-3 text-orange"
            viewBox="0 0 12 12"
            aria-hidden
          >
            <path fill="currentColor" d="M6 0 12 10H0Z" />
          </svg>
        </span>
        <span className="mt-0.5 block text-[9px] font-semibold tracking-[0.28em] text-muted uppercase">
          Industrial Services Ltd
        </span>
      </span>
    </Link>
  );
}
